/*
  # Add admin product management RLS policies

  1. Security Changes
    - Add INSERT policy for authenticated users on `products` table
    - Add UPDATE policy for authenticated users on `products` table
    - Add DELETE policy for authenticated users on `products` table
    - These allow logged-in admin users to manage the product catalogue

  2. Important Notes
    - Only authenticated users (logged in via Supabase Auth) can create, update, or delete products
    - The existing public SELECT policy remains unchanged so storefront visitors can browse products
*/

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);
