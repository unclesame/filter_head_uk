/*
  # Add Square Payment ID to Orders

  1. Modified Tables
    - `orders`
      - Add `square_payment_id` (text) - Square payment/order ID for tracking payments
      - Add `square_checkout_url` (text) - Square checkout link URL
  
  2. New Index
    - `idx_orders_square_payment` on `orders(square_payment_id)` for faster lookups

  3. Notes
    - The existing `stripe_session_id` column is left in place to preserve historical data
    - New orders will use `square_payment_id` instead
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'square_payment_id'
  ) THEN
    ALTER TABLE orders ADD COLUMN square_payment_id text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'square_checkout_url'
  ) THEN
    ALTER TABLE orders ADD COLUMN square_checkout_url text DEFAULT '';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_orders_square_payment ON orders(square_payment_id);
