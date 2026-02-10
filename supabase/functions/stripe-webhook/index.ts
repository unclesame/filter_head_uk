import Stripe from "npm:stripe@14.14.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_EMAIL = "orders@pureshowers.co.uk";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!stripeKey || !webhookSecret) {
      return new Response(
        JSON.stringify({ error: "Stripe is not configured" }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;

      if (orderId) {
        await supabase
          .from("orders")
          .update({ status: "paid" })
          .eq("id", orderId);

        const { data: order } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .maybeSingle();

        if (order) {
          const ref = orderId.slice(0, 8).toUpperCase();

          const customerSubject = `Order Confirmation - PureShowers #${ref}`;
          const customerBody = buildCustomerEmail(order, ref);

          const adminSubject = `New Order #${ref} - ${order.customer_name}`;
          const adminBody = buildAdminEmail(order, ref);

          await supabase.from("order_notifications").insert([
            {
              order_id: orderId,
              recipient_type: "customer",
              recipient_email: order.customer_email,
              subject: customerSubject,
              body: customerBody,
            },
            {
              order_id: orderId,
              recipient_type: "admin",
              recipient_email: ADMIN_EMAIL,
              subject: adminSubject,
              body: adminBody,
            },
          ]);

          const resendKey = Deno.env.get("RESEND_API_KEY");
          if (resendKey) {
            const sent = await Promise.allSettled([
              sendEmail(resendKey, order.customer_email, customerSubject, customerBody),
              sendEmail(resendKey, ADMIN_EMAIL, adminSubject, adminBody),
            ]);

            const allSent = sent.every((r) => r.status === "fulfilled");
            if (allSent) {
              await supabase
                .from("order_notifications")
                .update({ sent: true })
                .eq("order_id", orderId);
            }
          }
        }
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;
      if (orderId) {
        await supabase
          .from("orders")
          .update({ status: "expired" })
          .eq("id", orderId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

interface OrderRecord {
  id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    county: string;
    postcode: string;
    country: string;
  };
  items: { name: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
}

function formatAddress(addr: OrderRecord["shipping_address"]): string {
  const lines = [addr.line1];
  if (addr.line2) lines.push(addr.line2);
  lines.push(addr.city);
  if (addr.county) lines.push(addr.county);
  lines.push(addr.postcode);
  return lines.join("\n");
}

function buildCustomerEmail(order: OrderRecord, ref: string): string {
  const itemLines = order.items
    .map(
      (i) =>
        `  ${i.name} x${i.quantity} - \u00A3${(i.price * i.quantity).toFixed(2)}`
    )
    .join("\n");

  return `Dear ${order.customer_name},

Thank you for your order with PureShowers!

Order Reference: #${ref}

Items:
${itemLines}

Subtotal: \u00A3${order.subtotal.toFixed(2)}
Delivery: ${order.shipping === 0 ? "Free" : `\u00A3${order.shipping.toFixed(2)}`}
VAT (20%): \u00A3${order.vat.toFixed(2)}
Total: \u00A3${order.total.toFixed(2)}

Delivering to:
${formatAddress(order.shipping_address)}

Your order will be dispatched within 1-2 business days. You will receive a tracking number once shipped.

If you have any questions, please contact us at support@pureshowers.co.uk or call 0800 612 7174.

Thank you for choosing PureShowers!

The PureShowers Team
www.pureshowers.co.uk`;
}

function buildAdminEmail(order: OrderRecord, ref: string): string {
  const itemLines = order.items
    .map(
      (i) =>
        `  ${i.name} x${i.quantity} - \u00A3${(i.price * i.quantity).toFixed(2)}`
    )
    .join("\n");

  return `New Order Received

Order ID: ${order.id}
Reference: #${ref}
Customer: ${order.customer_name}
Email: ${order.customer_email}

Items:
${itemLines}

Subtotal: \u00A3${order.subtotal.toFixed(2)}
Delivery: ${order.shipping === 0 ? "Free" : `\u00A3${order.shipping.toFixed(2)}`}
VAT (20%): \u00A3${order.vat.toFixed(2)}
Total: \u00A3${order.total.toFixed(2)}

Shipping Address:
${formatAddress(order.shipping_address)}`;
}

async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  text: string
): Promise<void> {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PureShowers <orders@pureshowers.co.uk>",
      to,
      subject,
      text,
    }),
  });
}
