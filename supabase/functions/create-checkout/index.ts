import Stripe from "npm:stripe@14.14.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(
        JSON.stringify({
          error:
            "Stripe is not configured. Please add your Stripe secret key to continue.",
        }),
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

    const { items, customer, shipping_address, subtotal, shipping, vat, total } =
      await req.json();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_email: customer.email,
        customer_name: customer.name,
        shipping_address,
        items,
        subtotal,
        shipping,
        vat,
        total,
        status: "pending",
      })
      .select("id")
      .maybeSingle();

    if (orderError || !order) {
      throw new Error("Failed to create order");
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: { name: string; price: number; quantity: number; image_url?: string }) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            ...(item.image_url ? { images: [item.image_url] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })
    );

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "gbp",
          product_data: { name: "UK Standard Delivery" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    lineItems.push({
      price_data: {
        currency: "gbp",
        product_data: { name: "VAT (20%)" },
        unit_amount: Math.round(vat * 100),
      },
      quantity: 1,
    });

    const origin = req.headers.get("origin") || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancelled`,
      customer_email: customer.email,
      metadata: {
        order_id: order.id,
      },
    });

    await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({ url: session.url, session_id: session.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
