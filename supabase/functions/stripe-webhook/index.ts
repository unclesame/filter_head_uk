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
    const squareToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const webhookSignatureKey = Deno.env.get("SQUARE_WEBHOOK_SIGNATURE_KEY");

    if (!squareToken) {
      return new Response(
        JSON.stringify({ error: "Square is not configured" }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.text();

    if (webhookSignatureKey) {
      const signature = req.headers.get("x-square-hmacsha256-signature");
      if (!signature) {
        return new Response(
          JSON.stringify({ error: "Missing Square signature header" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const url = req.url;
      const payload = url + body;
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(webhookSignatureKey),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const signatureBytes = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(payload)
      );
      const computedSignature = btoa(
        String.fromCharCode(...new Uint8Array(signatureBytes))
      );

      if (computedSignature !== signature) {
        return new Response(
          JSON.stringify({ error: "Invalid signature" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    const event = JSON.parse(body);
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const eventType = event.type;

    if (eventType === "payment.completed" || eventType === "payment.updated") {
      const payment = event.data?.object?.payment || event.data?.object;
      if (!payment) {
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const squareOrderId = payment.order_id;
      if (!squareOrderId) {
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const squareBaseUrl =
        Deno.env.get("SQUARE_ENVIRONMENT") === "sandbox"
          ? "https://connect.squareupsandbox.com"
          : "https://connect.squareup.com";

      const orderResp = await fetch(
        `${squareBaseUrl}/v2/orders/${squareOrderId}`,
        {
          headers: {
            "Square-Version": "2024-01-18",
            Authorization: `Bearer ${squareToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = await orderResp.json();
      const referenceId = orderData.order?.reference_id;

      if (!referenceId) {
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const status = payment.status;

      if (status === "COMPLETED") {
        await supabase
          .from("orders")
          .update({ status: "paid", square_payment_id: payment.id })
          .eq("id", referenceId);

        const { data: order } = await supabase
          .from("orders")
          .select("*")
          .eq("id", referenceId)
          .maybeSingle();

        if (order) {
          const ref = referenceId.slice(0, 8).toUpperCase();

          const customerSubject = `Order Confirmation - PureShowers #${ref}`;
          const customerBody = buildCustomerEmail(order, ref);

          const adminSubject = `New Order #${ref} - ${order.customer_name}`;
          const adminBody = buildAdminEmail(order, ref);

          await supabase.from("order_notifications").insert([
            {
              order_id: referenceId,
              recipient_type: "customer",
              recipient_email: order.customer_email,
              subject: customerSubject,
              body: customerBody,
            },
            {
              order_id: referenceId,
              recipient_type: "admin",
              recipient_email: ADMIN_EMAIL,
              subject: adminSubject,
              body: adminBody,
            },
          ]);

          const resendKey = Deno.env.get("RESEND_API_KEY");
          if (resendKey) {
            const sent = await Promise.allSettled([
              sendEmail(
                resendKey,
                order.customer_email,
                customerSubject,
                customerBody
              ),
              sendEmail(resendKey, ADMIN_EMAIL, adminSubject, adminBody),
            ]);

            const allSent = sent.every((r) => r.status === "fulfilled");
            if (allSent) {
              await supabase
                .from("order_notifications")
                .update({ sent: true })
                .eq("order_id", referenceId);
            }
          }
        }
      } else if (status === "FAILED" || status === "CANCELED") {
        await supabase
          .from("orders")
          .update({ status: status === "FAILED" ? "failed" : "cancelled" })
          .eq("id", referenceId);
      }
    }

    if (
      eventType === "order.updated" &&
      event.data?.object?.order_updated?.state === "CANCELED"
    ) {
      const squareOrderId =
        event.data?.object?.order_updated?.order_id;
      if (squareOrderId) {
        const squareBaseUrl =
          Deno.env.get("SQUARE_ENVIRONMENT") === "sandbox"
            ? "https://connect.squareupsandbox.com"
            : "https://connect.squareup.com";

        const orderResp = await fetch(
          `${squareBaseUrl}/v2/orders/${squareOrderId}`,
          {
            headers: {
              "Square-Version": "2024-01-18",
              Authorization: `Bearer ${squareToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const orderData = await orderResp.json();
        const referenceId = orderData.order?.reference_id;

        if (referenceId) {
          await supabase
            .from("orders")
            .update({ status: "cancelled" })
            .eq("id", referenceId);
        }
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

If you have any questions, please contact us at support@pureshowers.co.uk or call +44 1304 700370.

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
