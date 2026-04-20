import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const STORE_NAME = "Totalfilter.co.uk";
const STORE_URL = "https://totalfilter.co.uk";
const STORE_DESCRIPTION =
  "Premium shower filters and water filtration products for healthier skin and hair.";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  original_price: number | null;
  image_url: string;
  images: string[];
  category: string;
  stock_quantity: number;
  is_best_seller: boolean;
  created_at: string;
  updated_at: string;
}

function toAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${STORE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function buildProductEntry(product: Product): string {
  const availability =
    product.stock_quantity > 0 ? "in_stock" : "out_of_stock";
  const productUrl = `${STORE_URL}/products/${product.slug}`;
  const priceGbp = `${product.price.toFixed(2)} GBP`;
  const condition = "new";
  const imageUrl = toAbsoluteUrl(product.image_url);

  let entry = `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <title>${escapeXml(product.name)}</title>
      <description>${escapeXml(product.short_description || product.description)}</description>
      <link>${escapeXml(productUrl)}</link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>`;

  if (product.images && product.images.length > 1) {
    for (let i = 1; i < Math.min(product.images.length, 11); i++) {
      entry += `\n      <g:additional_image_link>${escapeXml(toAbsoluteUrl(product.images[i]))}</g:additional_image_link>`;
    }
  }

  entry += `
      <g:availability>${availability}</g:availability>
      <g:price>${priceGbp}</g:price>`;

  if (product.original_price && product.original_price > product.price) {
    entry += `\n      <g:sale_price>${priceGbp}</g:sale_price>`;
    entry += `\n      <g:sale_price_effective_date>${product.updated_at}/${new Date(new Date(product.updated_at).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString()}</g:sale_price_effective_date>`;
  }

  entry += `
      <g:brand>${escapeXml(STORE_NAME)}</g:brand>
      <g:condition>${condition}</g:condition>
      <g:product_type>${escapeXml(product.category || "Home & Garden > Bathroom > Shower Accessories")}</g:product_type>
      <g:google_product_category>2206</g:google_product_category>
      <g:identifier_exists>false</g:identifier_exists>
      <g:shipping>
        <g:country>GB</g:country>
        <g:service>Standard</g:service>
        <g:price>${product.price >= 29 ? "0.00 GBP" : "4.99 GBP"}</g:price>
      </g:shipping>
      <g:tax>
        <g:country>GB</g:country>
        <g:rate>20</g:rate>
        <g:tax_ship>yes</g:tax_ship>
      </g:tax>`;

  if (product.is_best_seller) {
    entry += `\n      <g:custom_label_0>best_seller</g:custom_label_0>`;
  }

  entry += `\n    </item>`;

  return entry;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const url = new URL(req.url);
    const format = url.searchParams.get("format");

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Failed to fetch products");
    }

    if (!products || products.length === 0) {
      if (format === "json") {
        return new Response(JSON.stringify({ products: [], count: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${escapeXml(STORE_NAME)}</title>
    <link>${STORE_URL}</link>
    <description>${escapeXml(STORE_DESCRIPTION)}</description>
  </channel>
</rss>`,
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/xml; charset=utf-8",
          },
        }
      );
    }

    if (format === "json") {
      const jsonProducts = products.map((p: Product) => ({
        id: p.id,
        title: p.name,
        description: p.short_description || p.description,
        link: `${STORE_URL}/products/${p.slug}`,
        image_link: toAbsoluteUrl(p.image_url),
        additional_image_links:
          p.images && p.images.length > 1 ? p.images.slice(1, 11).map(toAbsoluteUrl) : [],
        availability: p.stock_quantity > 0 ? "in_stock" : "out_of_stock",
        price: `${p.price.toFixed(2)} GBP`,
        sale_price:
          p.original_price && p.original_price > p.price
            ? `${p.price.toFixed(2)} GBP`
            : undefined,
        brand: STORE_NAME,
        condition: "new",
        product_type: p.category || "Home & Garden > Bathroom > Shower Accessories",
        google_product_category: "2206",
        shipping_price: p.price >= 29 ? "0.00 GBP" : "4.99 GBP",
        is_best_seller: p.is_best_seller,
      }));

      return new Response(
        JSON.stringify({ products: jsonProducts, count: jsonProducts.length }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const itemsXml = products
      .map((p: Product) => buildProductEntry(p))
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${escapeXml(STORE_NAME)}</title>
    <link>${STORE_URL}</link>
    <description>${escapeXml(STORE_DESCRIPTION)}</description>
${itemsXml}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
