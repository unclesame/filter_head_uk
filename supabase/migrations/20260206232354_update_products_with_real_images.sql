/*
  # Update Products with Real PureShowers Images and Catalog

  This migration replaces all placeholder stock photos with real product images
  from pureshowers.co.uk and corrects product names, pricing, and descriptions
  to match the actual PureShowers catalog of 14 products.

  1. Modified Tables
    - `products` - Updated all 14 products with:
      - Real product images from pureshowers.co.uk
      - Corrected product names matching the real catalog
      - Updated prices from the live website
      - Corrected slugs, descriptions, categories, and features

  2. Products Updated
    - Slim Line Shower Filter
    - PureShowers 7 Spray - 8 Stage Hand Held Shower Filter
    - PureShowers Ionic Hand Held 3 Spray Shower Head Shower Filter
    - Paragon Luxury Hand-Held Shower Filter Head
    - PureShowers Fixed Shower Head 5 Spray Multistage Filter
    - 4-Stage Tap Faucet Water Filter
    - Compact Shower Filter (was Classic Chrome)
    - 8 Stage Luxury Shower Filter (was Dual Head System)
    - Sprite Designer Edition 5 Spray Shower Filter (was Handheld Eco Black)
    - Clear Tinted Dechlorinating 4 Stage Shower Filter (was Handheld Eco White)
    - AquaFilter 3 Stage Hand Held Shower Filter (was High Pressure)
    - Vitamin C Ionic Hand Held Shower Filter (was Vitamin C)
    - Sprite Shower Pure 7 Spray Shower Filter (was Gold Edition)
    - Bath Ball - Bath Filter (was Wall Mounted)

  3. Important Notes
    - No data is deleted; existing rows are updated in place
    - All images now point to real pureshowers.co.uk product photos
    - Prices updated to current website pricing in GBP
*/

-- 1. Slim Line Shower Filter (already correct name)
UPDATE products SET
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/25ddb4ab13ec096396ffd3d45036f37e/s/l/slim-line-shower-filter-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/25ddb4ab13ec096396ffd3d45036f37e/s/l/slim-line-shower-filter-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 30.95,
  original_price = 39.95,
  short_description = 'Sleek chrome inline shower filter with multi-stage cartridges lasting 8-12 months.',
  description = 'You will not be disappointed with this Slim Line Shower Filter. With its sleek slim line contours and beautiful chrome design. The superior quality multi-stage filter cartridges produced exclusively for PureShowers removes chlorine, heavy metals, chloramine, reduces scale amongst a plethora of other contaminants. Cartridges last 8-12 months depending on usage.',
  features = '["Remove up to 99% Chlorine, heavy metals, bacteria, chloramine", "Multi-stage superior quality exclusive cartridges", "Replaceable cartridges last 8-12 months", "Beautiful chrome finish suits all bathrooms", "NSF Patented and Certified KDF-55 Filter Medium", "Helps improve eczema and sensitive skin conditions", "Works with high and low pressure showers"]'::jsonb,
  specifications = '{"Capacity": "37,000 litres", "Duration": "8-12 months", "Temperature": "4-65°C", "Pressure": "20-80 PSI", "Cartridge": "Replaceable"}'::jsonb,
  is_best_seller = true,
  rating = 4.6,
  review_count = 408
WHERE id = '70e0689c-3c8f-4db8-bf5f-36d5265896a6';

-- 2. PureShowers 7 Spray - 8 Stage Hand Held Shower Filter (already correct name)
UPDATE products SET
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-hbb_v2-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-hbb_v2-min.png"]'::jsonb,
  price = 35.95,
  original_price = 45.95,
  short_description = 'The all-rounder shower filter with 7 spray settings and 8-stage filtration.',
  description = 'The PureShowers 7 Spray - 8 Stage Hand Held Shower Filter is the all rounder of shower filters. We took our decades of experience and engineered a shower head that incorporated the highest quality filter mediums, which tackle the largest range of impurities and put them all into a sleek and modern looking hand held shower filter that is easy to fit onto any existing shower hose. Features 7 spray options, replacement indicator, anti-scaling spray nozzles and an extra large shower face for a rainfall-like experience.',
  features = '["Remove up to 99% Chlorine, heavy metals, bacteria, chloramine, fluoride", "7 Spray Options with extra large shower face", "8 Stage filtration including Vitamin C and KDF-55", "Replacement indicator built in", "Anti-scaling spray nozzles", "Helps improve eczema and sensitive skin", "Replaceable cartridges last 3 months", "Beautiful chrome finish"]'::jsonb,
  specifications = '{"Capacity": "11,000 litres", "Duration": "3 months", "Temperature": "Max 49°C", "Pressure": "20-80 PSI", "Cartridge": "Replaceable"}'::jsonb,
  rating = 4.7,
  review_count = 9
WHERE id = 'fa5ea521-b105-4960-87f6-d443a45d390a';

-- 3. PureShowers Ionic Hand Held 3 Spray (already correct name)
UPDATE products SET
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/p/u/pureshowers-ionic-hand-held-3-spray-shower-head-shower-filter-v_2-2025-1080x1080.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/p/u/pureshowers-ionic-hand-held-3-spray-shower-head-shower-filter-v_2-2025-1080x1080.png"]'::jsonb,
  price = 13.85,
  original_price = 19.95,
  short_description = 'Budget-friendly ionic shower filter that boosts pressure by 200% and saves 30% water.',
  description = 'The PureShowers Ionic Hand Held 3 Spray Shower Head Shower Filter easily attaches to your existing shower hose and has been upgraded to now incorporate three powerful types of ceramic stone water filters inside the shower handle. It is designed specifically for low water pressure showers and can increase water pressure up to 200% and lower water usage by up to 30%. Features 3 different massage spray settings.',
  features = '["3 Stage filtration with 3 spray settings", "Remove chlorine, heavy metals, bacteria", "Increase water pressure by up to 200%", "Lower water usage by up to 30%", "Replaceable cartridges last 3 months", "Great for low pressure showers", "Makes hair and skin healthier"]'::jsonb,
  specifications = '{"Capacity": "2,500 litres", "Duration": "3 months", "Temperature": "4-65°C", "Pressure": "20-80 PSI", "Cartridge": "Replaceable"}'::jsonb,
  is_best_seller = true,
  rating = 4.8,
  review_count = 315
WHERE id = '4696391f-8a46-40e8-845d-da3ba6be958b';

-- 4. Paragon Luxury Hand-Held Shower Filter Head (already similar name)
UPDATE products SET
  name = 'Paragon Luxury Hand-Held Shower Filter Head',
  slug = 'paragon-luxury-hand-held-shower-filter-head',
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/h/s/hsf-1c_700x700-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/h/s/hsf-1c_700x700-min.png"]'::jsonb,
  price = 49.95,
  original_price = 65.00,
  short_description = 'NSF Standard 53 certified hand-held shower filter with premium build quality.',
  description = 'The Paragon Hand Held Shower Filter simply attaches to your existing shower hose. It works like your drinking water filter does, filtering out 99% chlorine, reduces scale, harmful chemicals, leaving you showering in pure filtered water. This product is Certified and listed under the NSF Standard 53 for Health Effects - the gold standard in water filtration certification. A true fan favourite with over 500 reviews.',
  features = '["NSF Standard 53 Certified for Health Effects", "Removes 99% chlorine and harmful chemicals", "Reduces scale and heavy metals", "Premium build quality", "Attaches to any existing shower hose", "Replaceable cartridges", "Over 500 five-star reviews"]'::jsonb,
  specifications = '{"Certification": "NSF Standard 53", "Duration": "6 months", "Pressure": "20-80 PSI", "Cartridge": "Replaceable"}'::jsonb,
  is_best_seller = true,
  rating = 4.8,
  review_count = 500,
  stock_quantity = 0
WHERE id = '43b3569b-81e9-402b-ad51-a9b705ad48b1';

-- 5. PureShowers Fixed Shower Head 5 Spray (already correct name)
UPDATE products SET
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/e66880ecbd0a719bd6643b946d8254e4/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-ps-fixed-sh-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/e66880ecbd0a719bd6643b946d8254e4/g/o/google-merchant-style-2-plain-professional-photo-shoot-square-ps-fixed-sh-min.png"]'::jsonb,
  price = 38.95,
  original_price = 49.00,
  short_description = 'Wall-mounted fixed shower head with 5 spray modes and multistage filtration.',
  description = 'The PureShowers Fixed Shower Head with 5 Spray Multistage Shower Filter is designed for those who prefer a fixed shower head. With 5 different spray settings and proven multistage filtration, it was designed by shower filter specialists with decades of experience. Simply screws onto your existing shower arm for easy installation.',
  features = '["5 spray settings for versatile showering", "Multistage filtration system", "Fixed wall-mounted design", "Easy installation onto existing shower arm", "Premium chrome finish", "Designed by shower filter specialists"]'::jsonb,
  specifications = '{"Duration": "3 months", "Pressure": "20-80 PSI", "Cartridge": "Replaceable", "Mount": "Fixed wall mount"}'::jsonb,
  rating = 4.5,
  review_count = 0
WHERE id = 'e5ff5f96-92c1-442b-8700-7361af11d994';

-- 6. 4-Stage Tap Faucet Water Filter (already correct name)
UPDATE products SET
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/4/-/4-stage-tap-faucet-water-filter-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/4/-/4-stage-tap-faucet-water-filter-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 35.95,
  original_price = 55.00,
  short_description = 'Fluoride-removing 4-stage tap filter for pure drinking and washing water.',
  description = 'This fluoride removing tap filter will ensure that you are always washing and drinking the purest filtered and healthy crystal clear pure water. The 4-Stage Tap Faucet Water Filter is specially designed to fit almost any type of tap. It can fit on your tap in the kitchen so that you can have clean filtered water for drinking, cooking and washing.',
  features = '["4-stage fluoride removing filtration", "Fits almost any tap type", "Crystal clear pure filtered water", "For drinking, cooking and washing", "Easy to install and replace", "Replaceable cartridges"]'::jsonb,
  specifications = '{"Stages": "4", "Cartridge": "Replaceable", "Fit": "Universal tap fitting"}'::jsonb,
  rating = 4.5,
  review_count = 6
WHERE id = '8baaaa93-4bd7-48ef-9064-fceafb373f65';

-- 7. Classic Chrome -> Compact Shower Filter
UPDATE products SET
  name = 'Compact Shower Filter',
  slug = 'compact-shower-filter',
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/25ddb4ab13ec096396ffd3d45036f37e/c/o/compact-shower-filter-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/25ddb4ab13ec096396ffd3d45036f37e/c/o/compact-shower-filter-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 28.95,
  original_price = 39.95,
  short_description = 'Space-saving chrome inline filter with multi-stage cartridges lasting 8-12 months.',
  description = 'This Compact and stylish Shower Filter will easily fit into any tight space. Boasting a beautiful chrome design and superior quality multi-stage filter cartridges produced exclusively for PureShowers, it removes chlorine, heavy metals, chloramine, reduces scale amongst a plethora of other contaminants. Cartridges last 8-12 months.',
  category = 'inline-filter',
  features = '["Remove up to 99% Chlorine, heavy metals, bacteria, chloramine", "Compact design fits tight spaces", "Multi-stage exclusive cartridges for PureShowers", "Replaceable cartridges last 8-12 months", "Beautiful chrome finish", "NSF Patented and Certified KDF-55", "Helps improve eczema and sensitive skin"]'::jsonb,
  specifications = '{"Capacity": "37,000 litres", "Duration": "8-12 months", "Temperature": "4-65°C", "Pressure": "20-80 PSI", "Cartridge": "Replaceable"}'::jsonb,
  is_best_seller = true,
  rating = 4.6,
  review_count = 334
WHERE id = '56e69d9c-b681-4af4-8af9-2da55864f1ae';

-- 8. Dual Head System -> 8 Stage Luxury Shower Filter
UPDATE products SET
  name = '8 Stage Luxury Shower Filter',
  slug = '8-stage-luxury-shower-filter',
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/8/-/8-stage-shower-filter-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/8/-/8-stage-shower-filter-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 38.95,
  original_price = 45.00,
  short_description = 'Powerful 8-stage dual-filter inline shower filter for maximum contaminant removal.',
  description = 'The powerful 8 Stage Luxury Shower Filter is the perfect in-line shower filter for those of us who want to keep our existing shower heads but still want the benefits of filtered water. Features a patented 8-stage dual-filter system for maximum contaminant removal including chlorine, heavy metals, bacteria and chloramines.',
  category = 'inline-filter',
  features = '["Remove up to 99% Chlorine, heavy metals, bacteria, chloramines", "Patented 8 stage dual-filter system", "Helps improve eczema and sensitive skin", "Keep your existing shower head", "Replaceable cartridges", "Beautiful chrome finish", "NSF Certified KDF-55 Filter Medium"]'::jsonb,
  specifications = '{"Stages": "8", "Duration": "6-8 months", "Pressure": "20-80 PSI", "Cartridge": "Dual replaceable"}'::jsonb,
  is_best_seller = true,
  is_featured = true,
  rating = 4.8,
  review_count = 383
WHERE id = '55241cd1-e23b-46ed-9d45-459d9993de36';

-- 9. Handheld Eco Black -> Sprite Designer Edition 5 Spray Shower Filter
UPDATE products SET
  name = 'Sprite Designer Edition 5 Spray Shower Filter',
  slug = 'sprite-designer-edition-5-spray-shower-filter',
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/s/p/sprite-designer-edition-5-spray-shower-filter-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/s/p/sprite-designer-edition-5-spray-shower-filter-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 46.95,
  original_price = 55.50,
  short_description = 'Contemporary NSF certified hand-held filter with 5 spray massage settings.',
  description = 'Contemporary design combined with 5 spray settings makes this Sprite shower filter look and feel great in any shower. This NSF certified shower filter fits easily onto any hose and provides the highest levels of shower water filtering to protect you and your family.',
  category = 'handheld',
  features = '["5 spray massage settings", "NSF Certified filtration", "Contemporary modern design", "Fits easily onto any shower hose", "Highest levels of water filtering", "Replaceable cartridges last 3 months", "Removes chlorine and contaminants"]'::jsonb,
  specifications = '{"Duration": "3 months", "Pressure": "20-80 PSI", "Certification": "NSF", "Cartridge": "Replaceable"}'::jsonb,
  is_best_seller = false,
  rating = 5.0,
  review_count = 8
WHERE id = 'dbbabee7-f5ea-4903-9ca0-7a89c5856b44';

-- 10. Handheld Eco White -> Clear Tinted Dechlorinating 4 Stage Shower Filter
UPDATE products SET
  name = 'Clear Tinted Dechlorinating 4 Stage Shower Filter',
  slug = 'clear-tinted-dechlorinating-4-stage-shower-filter',
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/c/l/clear-tinted-dechlorinating-4-stage-shower-filter-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/c/l/clear-tinted-dechlorinating-4-stage-shower-filter-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 29.65,
  original_price = 45.00,
  short_description = 'Cartridge-free 4-stage inline filter with clear tinted housing so you can see it working.',
  description = 'The clear tinted dechlorinating four stage shower filter combines four of the best shower filter mediums into a single filter without the need of a cartridge. The transparent tinted housing lets you see the filter working, and when it is time to replace. A unique and effective inline shower filter.',
  category = 'inline-filter',
  features = '["4 stage dechlorinating filtration", "No cartridge needed", "Clear tinted housing - see it working", "Combines 4 best filter mediums", "Removes chlorine and contaminants", "Easy to install inline", "Visual replacement indicator"]'::jsonb,
  specifications = '{"Stages": "4", "Duration": "6 months", "Pressure": "20-80 PSI", "Cartridge": "No cartridge - replace unit"}'::jsonb,
  is_best_seller = false,
  rating = 4.7,
  review_count = 30
WHERE id = 'e9b44412-2976-4fd2-871b-42a8f13cd49c';

-- 11. High Pressure -> AquaFilter 3 Stage Hand Held Shower Filter
UPDATE products SET
  name = 'AquaFilter 3 Stage Hand Held Shower Filter',
  slug = 'aquafilter-3-stage-hand-held-shower-filter',
  image_url = 'https://static.pureshowers.co.uk/images/aquafilter-3-stage-hand-held-shower-filter-blog.jpg',
  images = '["https://static.pureshowers.co.uk/images/aquafilter-3-stage-hand-held-shower-filter-blog.jpg"]'::jsonb,
  price = 35.95,
  original_price = 45.95,
  short_description = '3-stage hand-held shower filter with advanced ceramic and carbon filtration.',
  description = 'The AquaFilter 3 Stage Hand Held Shower Filter is an advanced hand held shower filter featuring 3 stages of powerful filtration. Easy to install by simply attaching to your existing shower hose, it removes chlorine, heavy metals and other contaminants for a healthier showering experience.',
  category = 'handheld',
  features = '["3 stage advanced filtration", "Removes chlorine and heavy metals", "Easy installation onto any hose", "Replaceable cartridges", "Modern hand-held design", "Helps improve skin and hair health"]'::jsonb,
  specifications = '{"Stages": "3", "Duration": "3 months", "Pressure": "20-80 PSI", "Cartridge": "Replaceable"}'::jsonb,
  is_best_seller = false,
  rating = 4.6,
  review_count = 64
WHERE id = '470bf204-77fa-4da7-ad33-ba63b6238c43';

-- 12. Vitamin C Shower Filter -> Vitamin C Ionic Hand Held Shower Filter
UPDATE products SET
  name = 'Vitamin C Ionic Hand Held Shower Filter',
  slug = 'vitamin-c-ionic-hand-held-shower-filter',
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/25ddb4ab13ec096396ffd3d45036f37e/v/i/vitamin-c-ionic-hand-held-shower-filter-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/25ddb4ab13ec096396ffd3d45036f37e/v/i/vitamin-c-ionic-hand-held-shower-filter-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 25.95,
  original_price = 35.95,
  short_description = 'Vitamin C powered ionic hand-held shower filter with 3 spray settings.',
  description = 'The Vitamin C Ionic Hand Held Shower Filter easily attaches to your existing shower hose and utilises the power of Vitamin C and three stages of water filter mediums to remove chlorine, heavy metals and bacteria from your shower water. The Vitamin C is known for its anti-ageing and skin-nourishing properties.',
  category = 'handheld',
  features = '["Vitamin C powered filtration", "3 stages of water filtering", "Removes chlorine, heavy metals, bacteria", "Anti-ageing Vitamin C benefits", "3 spray settings", "Replaceable cartridges last 3 months", "Great for sensitive skin"]'::jsonb,
  specifications = '{"Duration": "3 months", "Pressure": "20-80 PSI", "Cartridge": "Replaceable", "Key Medium": "Vitamin C"}'::jsonb,
  is_best_seller = false,
  rating = 4.8,
  review_count = 142
WHERE id = 'a0408516-be17-48d4-8dca-8047a3415155';

-- 13. Gold Edition -> Sprite Shower Pure 7 Spray Shower Filter
UPDATE products SET
  name = 'Sprite Shower Pure 7 Spray Shower Filter',
  slug = 'sprite-shower-pure-7-spray-shower-filter',
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/s/p/sprite-shower-pure-7-spray-shower-filter-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/s/p/sprite-shower-pure-7-spray-shower-filter-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 65.95,
  original_price = 85.00,
  short_description = 'Premium Sprite hand-held filter with 7 massage sprays and rainfall shower face.',
  description = 'The Shower Pure 7 Spray Hand Held Shower Filter combines both form and function, filtering your water and providing you with crystal clear, clean water for a luxurious home spa experience. Offering 7 different spray massage options and a larger than usual shower face, you can choose the spray setting which reflects your mood. From a Full Body Massage to a gentle Power Mist.',
  category = 'handheld',
  features = '["7 spray massage settings", "Larger rainfall-like shower face", "NSF Certified Chlorgon filtration", "Removes free and combined chlorine", "Reduces dirt, scale and odours", "Replaceable cartridges last 3 months", "Premium home spa experience"]'::jsonb,
  specifications = '{"Duration": "3 months", "Pressure": "20-80 PSI", "Certification": "NSF", "Cartridge": "Replaceable"}'::jsonb,
  is_best_seller = false,
  is_featured = true,
  rating = 4.8,
  review_count = 11
WHERE id = 'fc40646b-2cc8-4193-b457-fc1e25f156c1';

-- 14. Wall Mounted -> Bath Ball - Bath Filter
UPDATE products SET
  name = 'Bath Ball - Bath Filter',
  slug = 'bath-ball-bath-filter',
  image_url = 'https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/s/p/sprite-bath-ball-1080x1080-pureshowers-min.png',
  images = '["https://www.pureshowers.co.uk/media/catalog/product/cache/9ddae6ec08d4445e6e188cb35d86b424/s/p/sprite-bath-ball-1080x1080-pureshowers-min.png"]'::jsonb,
  price = 46.95,
  original_price = 55.50,
  short_description = 'Floating bath filter ball that removes chlorine and chemicals from bath water.',
  description = 'The Bath Ball bath filter is designed to remove chlorine and other chemicals from your bath water. Simply fill your bath and place the Bath Ball in the water to start filtering. Perfect for those who want the benefits of filtered water during bath time, especially beneficial for children and those with sensitive skin.',
  category = 'tap-filter',
  features = '["Removes chlorine from bath water", "Simple to use - just place in bath", "Great for children and sensitive skin", "Reduces chemicals and contaminants", "NSF Certified filtration", "Replaceable filter cartridge"]'::jsonb,
  specifications = '{"Duration": "6 months", "Certification": "NSF", "Cartridge": "Replaceable", "Type": "Bath filter"}'::jsonb,
  is_best_seller = false,
  rating = 4.5,
  review_count = 66
WHERE id = 'b44fe0c6-c45e-4086-a5c2-f0b8984fcf09';
