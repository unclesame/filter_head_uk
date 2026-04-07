/*
  # Update product images to local paths

  1. Modified Tables
    - `products`
      - Updated `image_url` for all 14 products to use local image paths instead of external URLs
      - Updated `images` jsonb array for all 14 products to use local image paths

  2. Changes
    - All product images now served from /images/products/ directory
    - Removes dependency on external pureshowers.co.uk image hosting
    - Improves page load reliability and performance

  3. Important Notes
    - Only updates image_url and images columns, no other data is changed
    - Local images were downloaded from the original external URLs
*/

UPDATE products
SET image_url = '/images/products/four-stage-tap-faucet-water-filter.png',
    images = '["/images/products/four-stage-tap-faucet-water-filter-alt.png"]'::jsonb
WHERE slug = 'four-stage-tap-faucet-water-filter';

UPDATE products
SET image_url = '/images/products/8-stage-luxury-shower-filter.png',
    images = '["/images/products/8-stage-luxury-shower-filter-alt.png"]'::jsonb
WHERE slug = '8-stage-luxury-shower-filter';

UPDATE products
SET image_url = '/images/products/aquafilter-3-stage-hand-held-shower-filter.png',
    images = '["/images/products/aquafilter-3-stage-hand-held-shower-filter-alt.jpg"]'::jsonb
WHERE slug = 'aquafilter-3-stage-hand-held-shower-filter';

UPDATE products
SET image_url = '/images/products/bath-ball-bath-filter.png',
    images = '["/images/products/bath-ball-bath-filter-alt.png"]'::jsonb
WHERE slug = 'bath-ball-bath-filter';

UPDATE products
SET image_url = '/images/products/clear-tinted-dechlorinating-4-stage-shower-filter.png',
    images = '["/images/products/clear-tinted-dechlorinating-4-stage-shower-filter.png"]'::jsonb
WHERE slug = 'clear-tinted-dechlorinating-4-stage-shower-filter';

UPDATE products
SET image_url = '/images/products/compact-shower-filter.png',
    images = '["/images/products/compact-shower-filter-alt.png"]'::jsonb
WHERE slug = 'compact-shower-filter';

UPDATE products
SET image_url = '/images/products/paragon-luxury-hand-held-shower-filter-head.png',
    images = '["/images/products/paragon-luxury-hand-held-shower-filter-head.png"]'::jsonb
WHERE slug = 'paragon-luxury-hand-held-shower-filter-head';

UPDATE products
SET image_url = '/images/products/pureshowers-7-spray-8-stage-hand-held.png',
    images = '["/images/products/8-stage-luxury-shower-filter.png"]'::jsonb
WHERE slug = 'pureshowers-7-spray-8-stage-hand-held';

UPDATE products
SET image_url = '/images/products/pureshowers-fixed-shower-head-5-spray.png',
    images = '["/images/products/pureshowers-fixed-shower-head-5-spray.png"]'::jsonb
WHERE slug = 'pureshowers-fixed-shower-head-5-spray';

UPDATE products
SET image_url = '/images/products/pureshowers-ionic-hand-held-3-spray.png',
    images = '["/images/products/pureshowers-ionic-hand-held-3-spray-alt.png"]'::jsonb
WHERE slug = 'pureshowers-ionic-hand-held-3-spray';

UPDATE products
SET image_url = '/images/products/slim-line-shower-filter.png',
    images = '["/images/products/slim-line-shower-filter-alt.png"]'::jsonb
WHERE slug = 'slim-line-shower-filter';

UPDATE products
SET image_url = '/images/products/sprite-designer-edition-5-spray-shower-filter.png',
    images = '["/images/products/sprite-designer-edition-5-spray-shower-filter.png"]'::jsonb
WHERE slug = 'sprite-designer-edition-5-spray-shower-filter';

UPDATE products
SET image_url = '/images/products/sprite-shower-pure-7-spray-shower-filter.png',
    images = '["/images/products/sprite-shower-pure-7-spray-shower-filter.png"]'::jsonb
WHERE slug = 'sprite-shower-pure-7-spray-shower-filter';

UPDATE products
SET image_url = '/images/products/vitamin-c-ionic-hand-held-shower-filter.png',
    images = '["/images/products/vitamin-c-ionic-hand-held-shower-filter.png"]'::jsonb
WHERE slug = 'vitamin-c-ionic-hand-held-shower-filter';