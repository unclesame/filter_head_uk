/*
  # Update product images to real product photos

  1. Modified Tables
    - `products`
      - Updated `image_url` for all 14 products to use actual product photos from pureshowers.co.uk
      - Replaced generic Pexels stock photos with real product images

  2. Changes
    - 4-Stage Tap Faucet Water Filter: real product photo
    - 8 Stage Luxury Shower Filter: real product photo
    - AquaFilter 3 Stage Hand Held Shower Filter: real product photo
    - Bath Ball - Bath Filter: real product photo
    - Compact Shower Filter: real product photo
    - Paragon Luxury Hand-Held Shower Filter Head: real product photo
    - PureShowers 7 Spray - 8 Stage Hand Held Shower Filter: real product photo
    - PureShowers Fixed Shower Head 5 Spray Multistage Filter: real product photo
    - PureShowers Ionic Hand Held 3 Spray Shower Head Shower Filter: real product photo
    - Slim Line Shower Filter: real product photo

  3. Important Notes
    - Only updates image_url column, no other data is changed
    - Uses the 1080x1080 product cache images from pureshowers.co.uk for consistent sizing
*/

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-kk-tf-12.png'
WHERE name = '4-Stage Tap Faucet Water Filter';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-hbb_v2-min.png'
WHERE name = '8 Stage Luxury Shower Filter';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-fhsh-8-b_v2.png'
WHERE name = 'AquaFilter 3 Stage Hand Held Shower Filter';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-bb-wh_1.png'
WHERE name = 'Bath Ball - Bath Filter';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-kk-tt-11.png'
WHERE name = 'Compact Shower Filter';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/h/s/hsf-1c_700x700-min.png'
WHERE name = 'Paragon Luxury Hand-Held Shower Filter Head';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-ps-hs7783-c_v3.png'
WHERE name = 'PureShowers 7 Spray - 8 Stage Hand Held Shower Filter';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-ps-fixed-sh-min.png'
WHERE name = 'PureShowers Fixed Shower Head 5 Spray Multistage Filter';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-kk-tt-16b_min.png'
WHERE name = 'PureShowers Ionic Hand Held 3 Spray Shower Head Shower Filter';

UPDATE products
SET image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-kk-tt-10-min.png'
WHERE name = 'Slim Line Shower Filter';
