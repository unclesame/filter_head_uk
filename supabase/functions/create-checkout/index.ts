import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

function generateIdempotencyKey(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const squareToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const squareLocationId = Deno.env.get("SQUARE_LOCATION_ID");

    if (!squareToken || !squareLocationId) {
      return new Response(
        JSON.stringify({
          error:
            "Square is not configured. Please add your Square access token and location ID.",
        }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const squareBaseUrl =
      Deno.env.get("SQUARE_ENVIRONMENT") === "sandbox"
        ? "https://connect.squareupsandbox.com"
        : "https://connect.squareup.com";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const {
      items,
      customer,
      shipping_address,
      subtotal,
      shipping,
      vat,
      total,
    } = await req.json();

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

    const lineItems = items.map(
      (item: { name: string; price: number; quantity: number }) => ({
        name: item.name,
        quantity: String(item.quantity),
        base_price_money: {
          amount: Math.round(item.price * 100),
          currency: "GBP",
        },
      })
    );

    if (shipping > 0) {
      lineItems.push({
        name: "UK Standard Delivery",
        quantity: "1",
        base_price_money: {
          amount: Math.round(shipping * 100),
          currency: "GBP",
        },
      });
    }

    lineItems.push({
      name: "VAT (20%)",
      quantity: "1",
      base_price_money: {
        amount: Math.round(vat * 100),
        currency: "GBP",
      },
    });

    const origin = req.headers.get("origin") || "http://localhost:5173";

    const paymentLinkBody: Record<string, unknown> = {
      idempotency_key: generateIdempotencyKey(),
      order: {
        location_id: squareLocationId,
        reference_id: order.id,
        line_items: lineItems,
      },
      checkout_options: {
        redirect_url: `${origin}/checkout/success`,
        ask_for_shipping_address: false,
      },
    };

    if (customer.email) {
      paymentLinkBody.pre_populated_data = {
        buyer_email: customer.email,
      };
    }

    const linkResponse = await fetch(
      `${squareBaseUrl}/v2/online-checkout/payment-links`,
      {
        method: "POST",
        headers: {
          "Square-Version": "2025-01-23",
          Authorization: `Bearer ${squareToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentLinkBody),
      }
    );

    const linkData = await linkResponse.json();

    if (!linkResponse.ok) {
      console.error("Square payment link error:", JSON.stringify(linkData));
      const detail =
        linkData.errors?.[0]?.detail || "Failed to create payment link";
      throw new Error(detail);
    }

    const checkoutUrl = linkData.payment_link.url;
    const paymentLinkId = linkData.payment_link.id;
    const squareOrderId =
      linkData.related_resources?.orders?.[0]?.id || paymentLinkId;

    await supabase
      .from("orders")
      .update({
        square_payment_id: paymentLinkId,
        square_checkout_url: checkoutUrl,
      })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({ url: checkoutUrl, order_id: order.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
