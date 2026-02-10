/*
  # Create Products and Orders Schema for Shower Head E-Commerce

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Product name
      - `slug` (text, unique, not null) - URL-friendly identifier
      - `description` (text) - Full product description
      - `short_description` (text) - Brief product summary
      - `price` (numeric, not null) - Current selling price
      - `original_price` (numeric) - Original price before discount
      - `image_url` (text) - Primary product image
      - `images` (jsonb) - Array of additional image URLs
      - `rating` (numeric, default 0) - Average customer rating
      - `review_count` (integer, default 0) - Number of reviews
      - `category` (text) - Product category
      - `features` (jsonb) - Array of product features
      - `specifications` (jsonb) - Product specifications object
      - `is_best_seller` (boolean, default false) - Best seller flag
      - `is_featured` (boolean, default false) - Featured product flag
      - `stock_quantity` (integer, default 0) - Available stock
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

    - `reviews`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key) - Associated product
      - `author_name` (text, not null) - Reviewer name
      - `rating` (integer, not null) - Rating 1-5
      - `title` (text) - Review title
      - `content` (text) - Review body text
      - `verified_purchase` (boolean, default false)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Products and reviews are publicly readable (anonymous users can browse)
    - No write access for anonymous users
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  short_description text DEFAULT '',
  price numeric NOT NULL CHECK (price >= 0),
  original_price numeric CHECK (original_price >= 0),
  image_url text DEFAULT '',
  images jsonb DEFAULT '[]'::jsonb,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  category text DEFAULT '',
  features jsonb DEFAULT '[]'::jsonb,
  specifications jsonb DEFAULT '{}'::jsonb,
  is_best_seller boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  stock_quantity integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text DEFAULT '',
  content text DEFAULT '',
  verified_purchase boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (stock_quantity > 0);

CREATE POLICY "Anyone can view reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = reviews.product_id
    )
  );

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON products(is_best_seller);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
