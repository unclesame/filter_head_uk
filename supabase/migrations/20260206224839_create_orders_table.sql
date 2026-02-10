/*
  # Create Orders and Notifications Tables

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `customer_email` (text, not null) - Customer email address
      - `customer_name` (text, not null) - Customer full name
      - `shipping_address` (jsonb) - Full shipping address
      - `items` (jsonb) - Array of ordered items with quantities and prices
      - `subtotal` (numeric) - Order subtotal before shipping/VAT
      - `shipping` (numeric) - Shipping cost
      - `vat` (numeric) - VAT amount
      - `total` (numeric) - Final order total
      - `status` (text) - Order status (pending, paid, failed, shipped, delivered)
      - `stripe_session_id` (text) - Stripe checkout session ID
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `order_notifications`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key) - Associated order
      - `recipient_type` (text) - 'customer' or 'admin'
      - `recipient_email` (text) - Email address
      - `subject` (text) - Email subject
      - `body` (text) - Email body (HTML)
      - `sent` (boolean) - Whether the notification was sent
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Orders are only accessible by the system (service role)
    - Notifications are only accessible by the system (service role)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  shipping_address jsonb DEFAULT '{}'::jsonb,
  items jsonb DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  shipping numeric NOT NULL DEFAULT 0,
  vat numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  stripe_session_id text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  recipient_type text NOT NULL DEFAULT 'customer',
  recipient_email text NOT NULL,
  subject text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage orders"
  ON orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage notifications"
  ON order_notifications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_notifications_order_id ON order_notifications(order_id);
