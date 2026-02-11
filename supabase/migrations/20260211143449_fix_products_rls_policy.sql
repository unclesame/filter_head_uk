/*
  # Fix products RLS policy
  
  1. Changes
    - Drop existing restrictive SELECT policy
    - Create new policy that allows public read access to all products
  
  2. Security
    - Products are public catalog items that everyone should see
*/

DROP POLICY IF EXISTS "Anyone can view products" ON products;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);