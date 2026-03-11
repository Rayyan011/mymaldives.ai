-- Seed data scraped from hummingbird.travel (March 2026)
INSERT INTO resorts (name, atoll, island, star_rating, price_range, description, highlights, transfer_type, transfer_time_minutes, has_all_inclusive, has_spa, has_diving, has_surfing, has_kids_club, has_overwater_villa, honeymoon_friendly, family_friendly, website_url, image_url) VALUES

-- 1. Soneva Fushi
('Soneva Fushi', 'Baa Atoll', 'Kunfunadhoo', 5, 'ultra-luxury',
 'A natural treasure in the UNESCO Biosphere Reserve featuring 72 jungle villas and eight overwater reserves. Known for its "no shoes, no news" barefoot luxury philosophy with 14 dining destinations, an observatory, and advanced sustainability efforts.',
 '["no shoes no news barefoot luxury","14 dining destinations including Flying Sauces zipline dining","The Den - largest kids club in South Asia with zipline","observatory and outdoor cinema","So Cool with 60+ ice cream flavors"]',
 'seaplane', 40, 0, 1, 1, 0, 1, 1, 1, 1,
 'https://soneva.com/resorts/soneva-fushi',
 'https://image.hummingbird.travel/disk1/public/hotels/363/038dda21-e547-40a1-84c4-2bb06c0d2d25.jpg'),

-- 2. Gili Lankanfushi
('Gili Lankanfushi', 'North Male Atoll', 'Lankanfushi', 5, 'ultra-luxury',
 'An intimate coral island resort with 45 rustic overwater villas crafted from natural wood and glass. Each guest receives a dedicated Mr. or Ms. Friday personal assistant. Features the Private Reserve — a 1,700 sqm suite sleeping up to 10 guests.',
 '["Mr. or Ms. Friday 24-hour personal butler","The Private Reserve 1700 sqm overwater suite","excellent house reef for snorkeling","Kashiveli beach dining with local ingredients","By The Sea Japanese-fusion restaurant"]',
 'speedboat', 20, 0, 1, 1, 0, 0, 1, 1, 0,
 'https://www.gili-lankanfushi.com',
 'https://image.hummingbird.travel/disk1/public/hotels/27/793627e4-7113-46cb-b6ac-a8318409e470.jpg'),

-- 3. Waldorf Astoria Maldives Ithaafushi
('Waldorf Astoria Maldives Ithaafushi', 'South Male Atoll', 'Ithaafushi', 5, 'ultra-luxury',
 'A sophisticated all-villa resort spanning three interconnected islands with 119 villas and 11 specialty dining venues — a first in the Maldives. Features the Maldives'' first Aqua Wellness centre with hydrotherapy pool and butler service included.',
 '["three interconnected islands bikeable by bridge","11 specialty dining venues including Zuma","Maldives first Aqua Wellness centre","Amber adults-only champagne bar","butler service for all guests"]',
 'speedboat', 45, 0, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/waldorf-astoria-maldives-ithaafushi',
 'https://image.hummingbird.travel/disk1/public/hotels/96/b418d9de-920d-4445-9bf7-170f2af814c1.jpg'),
-- Note: Waldorf is hotel ID 96 on hummingbird.travel

-- 4. One & Only Reethi Rah
('One & Only Reethi Rah', 'North Male Atoll', 'Reethi Rah', 5, 'ultra-luxury',
 'The epitome of luxury on a private island featuring 12 white sand beaches and six kilometres of shoreline. This 122-villa resort offers Asian-inspired design, an award-winning spa, and 6 restaurants including Hoshi Japanese and Botanica plant-based.',
 '["12 pristine white sand beaches on a private island","award-winning spa with visiting wellness practitioners","6 restaurants including Hoshi Japanese and Botanica","all-villa resort with private pool options","extensive water sports and scuba diving"]',
 'speedboat', 45, 0, 1, 1, 0, 1, 0, 1, 1,
 'https://hummingbird.travel/property/one-only-reethi-rah',
 'https://image.hummingbird.travel/disk1/public/hotels/56/4d610e21-94b9-4464-9f97-ffcc4cec5172.jpg'),

-- 5. Anantara Veli Maldives Resort
('Anantara Veli Maldives Resort', 'South Male Atoll', 'Veligandu', 5, 'luxury',
 'A stylish adults-only island hideaway ideal for romantic retreats with 67 overwater and beach villas. Features a unique cookery school with Island Chefs, six diverse restaurants, and surf breaks nearby. All-inclusive dining options available.',
 '["adults-only island for ultimate romance","unique cookery school with Island Chefs","all-inclusive dining with 6 restaurants","surf breaks nearby","overwater villas in multiple luxury categories"]',
 'speedboat', 30, 1, 1, 1, 1, 0, 1, 1, 0,
 'https://hummingbird.travel/property/anantara-veli-maldives-resort',
 'https://image.hummingbird.travel/disk1/public/hotels/19/701080d9-fa25-4991-8940-33c4e39b0a3c.jpg'),

-- 6. Constance Moofushi
('Constance Moofushi', 'South Ari Atoll', 'Moofushi', 5, 'luxury',
 'An exclusive barefoot luxury resort combining luxury and simplicity with an all-inclusive package. Surrounded by three large lagoons and a coral garden, positioned as one of the best diving and snorkelling spots in the Maldives. Wine cellar with over 12,000 bottles.',
 '["one of the best diving spots in the Maldives","all-inclusive barefoot luxury atmosphere","three large lagoons and exceptional coral garden","wine cellar with over 12000 bottles","small island walkable in 10 minutes"]',
 'seaplane', 25, 1, 1, 1, 0, 0, 1, 1, 0,
 'https://hummingbird.travel/property/constance-moofushi',
 'https://image.hummingbird.travel/disk1/public/hotels/8/140b86c4-2096-4dbd-bb54-5faef5611180.jpg'),

-- 7. Baros Maldives
('Baros Maldives', 'North Male Atoll', 'Baros', 5, 'ultra-luxury',
 'Award-winning luxury resort celebrating 50+ years, ranked #1 luxury Maldivian property on TripAdvisor. Features 75 intimate over-water and beach villas, one of the destination''s best house reefs, and The Lighthouse — the first fine dining establishment in the Maldives.',
 '["ranked #1 luxury Maldivian property on TripAdvisor","The Lighthouse first fine dining in the Maldives","one of the best house reefs in the Maldives","75 intimate villas with 50 years of heritage","discreet personalized service"]',
 'speedboat', 25, 0, 1, 1, 0, 0, 1, 1, 0,
 'https://hummingbird.travel/property/baros-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/16/d55e4b2b-8ef2-4514-935a-7de8aa5107a0.jpg'),

-- 8. COMO Cocoa Island
('COMO Cocoa Island', 'South Male Atoll', 'Cocoa Island', 5, 'ultra-luxury',
 'A romantic resort with unique dhoni boat-inspired overwater villas on an intimate island with crystal clear lagoons. The world-famous COMO Shambhala spa anchors the wellness experience, with an excellent house reef accessible directly from the villas and nearby surf breaks.',
 '["world-famous COMO Shambhala spa and wellness","unique dhoni boat-inspired overwater villas","house reef accessible directly from villas","1-kilometre sand bank at low tide","nearby surf breaks and diving channels"]',
 'speedboat', 45, 0, 1, 1, 1, 0, 1, 1, 0,
 'https://hummingbird.travel/property/como-cocoa-island',
 'https://image.hummingbird.travel/disk1/public/hotels/325/34233e7e-aefa-4384-946a-43c6f049f462.jpg'),

-- 9. Niyama Private Islands Maldives
('Niyama Private Islands Maldives', 'Dhaalu Atoll', 'Enboodhoo', 5, 'ultra-luxury',
 'A dual-island luxury retreat spanning Play and Chill islands with 134 rooms. Features the world-famous Subsix underwater restaurant six metres below the surface, a surf school with nearby breaks, and family pavilions alongside adults-only zones.',
 '["twin island concept - Play for activities Chill for relaxation","Subsix underwater restaurant 6m below surface","surf school with nearby breaks including Vodi","The Drift Spa with outdoor cinema","5 restaurants and 4 bars"]',
 'seaplane', 45, 1, 1, 1, 1, 1, 1, 1, 1,
 'https://hummingbird.travel/property/niyama-private-island',
 'https://image.hummingbird.travel/disk1/public/hotels/39/5398a864-d810-4aaf-aa10-d5d8279ee94d.jpg'),

-- 10. Four Seasons Resort Maldives at Landaa Giraavaru
('Four Seasons Resort Maldives at Landaa Giraavaru', 'Baa Atoll', 'Landaa Giraavaru', 5, 'ultra-luxury',
 'A 44-acre wilderness resort in the Baa Atoll UNESCO Biosphere Reserve with a mesmerising 2.5 km lagoon and 103 spacious villas. Integrates Ayurvedic wellness through the AyurMa center with a resident Ayurvedic doctor. Manta ray encounters during season.',
 '["Baa Atoll UNESCO Biosphere Reserve location","AyurMa wellness center with resident Ayurvedic doctor","2.5 km lagoon with manta ray encounters","103 spacious villas with private pool options","Kids Club and Teens Club for families"]',
 'seaplane', 35, 0, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/four-seasons-resort-maldives-at-landaa-giraavaru',
 'https://image.hummingbird.travel/disk1/public/hotels/34/2fe543e9-4006-4d45-be2a-4853cfabb35f.jpg'),

-- 11. W Maldives
('W Maldives', 'North Ari Atoll', 'Fesdhoo', 5, 'luxury',
 'An immersive escape on a heart-shaped island with 81 rooms, one of the Maldives'' finest house reefs with reef shark swimming. Playful overwater rooms with private pools, the AWAY Spa, and a vibrant W brand atmosphere with innovative cocktails.',
 '["heart-shaped island with one of the finest house reefs","playful overwater villas with private pools","AWAY Spa for holistic wellness","reef shark swimming and marine adventures","all-inclusive dining across 3 restaurants"]',
 'seaplane', 25, 1, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/w-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/374/b5c55f36-e473-45fe-9a8f-00fdd05f2b0f.png'),

-- 12. Kandima Maldives
('Kandima Maldives', 'Dhaalu Atoll', 'Kandima', 4, 'mid',
 'A game-changing lifestyle destination with 266 rooms and 10 dining venues including Sea Dragon Chinese restaurant. Seriously stylish island with a beach club atmosphere, Forbidden adults-only bar with live DJs, and all-inclusive packages available.',
 '["10 dining venues including Sea Dragon restaurant","266 rooms across multiple villa categories","Forbidden adults-only bar with live DJs","Cultural Kids Club for children","Platinum and Premium All Inclusive plans"]',
 'seaplane', 20, 1, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/kandima-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/44/3100d08c-3156-421b-8fbf-1c0d6653aded.jpg'),

-- 13. Milaidhoo Maldives
('Milaidhoo Maldives', 'Baa Atoll', 'Milaidhoo', 5, 'ultra-luxury',
 'An intimate ultra-luxury resort celebrating Maldivian culture with just 50 pool villas in a UNESCO Biosphere Reserve. Features the world''s first Maldivian fine-dining restaurant, exceptional house reef, and Hanifaru Bay manta ray viewing just 15 minutes away.',
 '["only 50 pool villas for ultimate privacy","UNESCO Biosphere Reserve location","world first Maldivian fine-dining restaurant","exceptional house reef and manta ray viewing","overwater spa and wine cellar"]',
 'seaplane', 35, 0, 1, 1, 0, 0, 1, 1, 0,
 'https://hummingbird.travel/property/milaidhoo-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/91/milaidhoo.jpg'),

-- 14. Velassaru Maldives
('Velassaru Maldives', 'South Male Atoll', 'Velassaru', 5, 'luxury',
 'A chic 5-star resort with 129 rooms set on soft white sand with crystal-clear seas. Just 25 minutes by speedboat from Male, offering an overwater spa, good house reef, live music events, and stylish water villas with pool options.',
 '["only 25-minute speedboat from Male airport","overwater spa and wine cellar","good house reef for snorkeling","chic water villas with pool options","live music and cocktail party events"]',
 'speedboat', 25, 0, 1, 1, 0, 0, 1, 1, 0,
 'https://hummingbird.travel/property/velassaru-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/42/8e50334f-c55a-48cf-962f-d75de91a1cf6.jpg'),

-- 15. JOALI Maldives
('JOALI Maldives', 'Raa Atoll', 'Muravandhoo', 5, 'ultra-luxury',
 'An art-immersive ultra-luxury resort where incredible artworks unfold across the landscape with 73 rooms. Private Jadugar butler service, submarine and yacht experiences, and sister wellness property JOALI BEING just 15 minutes away.',
 '["art-immersive resort with sculptures throughout","private Jadugar butler service included","submarine and yacht experiences","kids club and teens club","up to 4-bedroom luxury residences"]',
 'seaplane', 45, 0, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/joali-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/94/4b43ff37-58b4-4b8f-8678-9f5a1d0fbf0b.png'),

-- 16. Lily Beach Resort & Spa
('Lily Beach Resort & Spa', 'South Ari Atoll', 'Huvahendhoo', 5, 'luxury',
 'The first All-Inclusive Platinum Plan resort in the Maldives with 119 rooms, pristine beaches, and prolific reef life. Excellent house reef with whale shark sightings, Tamara Spa, and 6 restaurants including underwater AQVA.',
 '["first All-Inclusive Platinum Plan in the Maldives","excellent house reef with whale shark sightings","Tamara Spa for wellness","6 restaurants including underwater AQVA","family villas and honeymoon packages"]',
 'seaplane', 25, 1, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/lily-beach-resort-spa',
 'https://image.hummingbird.travel/disk1/public/hotels/47/42a86277-50e4-4da7-b57d-453888e7e679.jpg'),

-- 17. Hurawalhi Island Resort
('Hurawalhi Island Resort', 'Lhaviyani Atoll', 'Hurawalhi', 5, 'luxury',
 'An adults-only luxury resort featuring the world''s largest all-glass undersea restaurant and 90 pool villas. Home to a Marine Biology Centre with a resident marine biologist and an outstanding naturally-protected house reef.',
 '["world largest all-glass undersea restaurant","adults-only for tranquil experience","Marine Biology Centre with conservation programs","outstanding house reef snorkeling","All Inclusive Plus plan available"]',
 'seaplane', 40, 1, 1, 1, 0, 0, 1, 1, 0,
 'https://hummingbird.travel/property/hurawalhi-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/43/hurawalhi.jpg'),

-- 18. Kuramathi Maldives
('Kuramathi Maldives', 'Rasdhoo Atoll', 'Kuramathi', 4, 'mid',
 'One of the largest resort islands at 1.8 km long, stretching to a pristine sandbank at its tail end. With 395 rooms across 12 villa categories, 10 restaurants, 8+ bars including Sky Bar, and a Dine Around All Inclusive experience.',
 '["largest resort island at 1.8 km with pristine sandbank","395 rooms across 12 villa categories","10 restaurants and 8+ bars including Sky Bar","Bageecha Kids Club for families","water villas with pool and honeymoon options"]',
 'seaplane', 20, 1, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/kuramathi-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/343/kuramathi.jpg'),

-- 19. Cocoon Maldives
('Cocoon Maldives', 'Lhaviyani Atoll', 'Ookolhufinolhu', 5, 'luxury',
 'A stylish 5-star resort with 150 rooms across beach and lagoon villa categories. Known for its diving centre, Cultural Kids Club, extreme all-inclusive packages, and lagoon overwater villas with optional slide.',
 '["3 restaurants and 2 bars","Cultural Kids Club for children","fully equipped diving centre","lagoon overwater villas with slide option","Platinum and Premium All Inclusive plans"]',
 'seaplane', 30, 1, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/cocoon-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/37/00794c9f-e78f-4949-91e7-b19179d4b34f.jpg'),

-- 20. Bandos Maldives
('Bandos Maldives', 'North Male Atoll', 'Bandos', 4, 'mid',
 'Known as the "Island of Hospitality" with 215 rooms and one of the most beautiful house reefs in North Male Atoll. Offers premium all-inclusive options, a sports complex with flood-lit courts, and Kokko''s kids club.',
 '["exceptional house reef for snorkeling and diving","Kokko kids club for children","Clubhouse sports complex with flood-lit courts","Sunset Water Villa with private infinity pool","4 restaurants and 2 bars"]',
 'speedboat', 25, 1, 0, 1, 0, 1, 1, 0, 1,
 'https://hummingbird.travel/property/bandos-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/84/dc1b0f57-a983-4e51-8473-dad6fe0b66e7.png'),

-- 21. Meeru Maldives Resort Island
('Meeru Maldives Resort Island', 'North Male Atoll', 'Meerufenfushi', 4, 'mid',
 'A multiple award-winning 4-star resort with 282 rooms, regarded as one of the Maldives'' top all-inclusive resorts. Features a snorkeling trail at the northern tip, two freshwater pools, golf course, and six restaurants with six bars.',
 '["snorkeling trail at the island northern tip","6 restaurants and 6 bars","two freshwater swimming pools on beach","golf course and tennis courts","overwater Ocean Villas above turquoise lagoon"]',
 'speedboat', 55, 1, 1, 1, 0, 0, 1, 1, 1,
 'https://hummingbird.travel/property/meeru-island-resort',
 'https://image.hummingbird.travel/disk1/public/hotels/6/1cabc052-0590-457e-aa85-153598a9bbf2.jpg'),

-- 22. Dhigali Maldives
('Dhigali Maldives', 'Raa Atoll', 'Dhigali', 5, 'luxury',
 'A luxury 5-star resort offering a premium all-inclusive experience with 180 villas across beach and overwater categories. Large island with outstanding house reef and six restaurants including the signature Battuta restaurant.',
 '["premium all-inclusive from arrival to departure","outstanding house reef for snorkeling","spacious villas ideal for families","Haali Bar sunset experience","6 restaurants including Battuta signature dining"]',
 'seaplane', 45, 1, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/dhigali-maldives',
 'https://image.hummingbird.travel/disk1/public/hotels/87/4f3f5958-d160-4b7b-87cb-48f1ddd718a3.jpg'),

-- 23. Adaaran Prestige Vadoo
('Adaaran Prestige Vadoo', 'South Male Atoll', 'Vadoo', 4, 'mid',
 'An intimate 50-villa all-overwater resort designed for couples and honeymooners with glass-floor panels and views over a vibrant house reef. Winner of World''s Leading Water Villa award with private butler service and premium all-inclusive.',
 '["all-overwater villa resort with glass-floor panels","vibrant house reef for snorkeling","private butler service included","World Leading Water Villa award winner","premium all-inclusive dining"]',
 'speedboat', 15, 1, 1, 0, 0, 0, 1, 1, 0,
 'https://hummingbird.travel/property/adaaran-prestige-vadoo',
 'https://image.hummingbird.travel/disk1/public/hotels/104/ca8e7875-c20e-49f7-8d2e-d081172a6947.jpg'),

-- 24. Emerald Maldives Resort & Spa
('Emerald Maldives Resort & Spa', 'Raa Atoll', 'Fasmendhoo', 5, 'luxury',
 'A deluxe all-inclusive 5-star resort spanning 20 hectares with 120 villas split evenly between beach and overwater. Features 1.5 km of beachfront, modern Maldivian design with traditional Asian thatch roofs, and diverse dining including South American cuisine.',
 '["deluxe all-inclusive with diverse dining venues","60 beach villas and 60 overwater villas","indoor and outdoor children playground","accessible house reef with crystal-clear lagoon","wine cellar and padel court"]',
 'seaplane', 40, 1, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/emerald-maldives-resort-spa',
 'https://image.hummingbird.travel/disk1/public/hotels/95/6a1bdec5-f715-4b6b-a903-649f825a806a.jpg'),

-- 25. The St. Regis Maldives Vommuli Resort
('The St. Regis Maldives Vommuli Resort', 'Dhaalu Atoll', 'Vommuli', 5, 'ultra-luxury',
 'An ultra-luxury resort spanning nine hectares of rainforest and white sand beaches with 77 villas. Eco-conscious setting with unique experiences like jet packing and glass-bottom kayaking. Personal butler service and observatory tower.',
 '["personal butler service for select villas","observatory tower and 24/7 fitness center","unique activities jet packing sea bobbing fly-fishing","6 restaurants with gourmet dining","kids club and multi-bedroom family estates"]',
 'seaplane', 45, 0, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/the-st-regis-maldives-vommuli-resort',
 'https://image.hummingbird.travel/disk1/public/hotels/50/062b7aab-9fa5-4a20-9d93-0b859ead115f.jpeg'),

-- 26. Cheval Blanc Randheli
('Cheval Blanc Randheli', 'Noonu Atoll', 'Randheli', 5, 'ultra-luxury',
 'The second Maison in the LVMH Hotel Management group with 45 villas featuring stylish and harmonious decor. A private spa island accessible by traditional boat, signature gourmet dining at Le 1947, and yacht access.',
 '["private spa island with traditional boat access","Le 1947 signature gourmet restaurant","kids club and teens club","yacht access and extensive water sports","golf tennis and padel courts"]',
 'seaplane', 45, 0, 1, 1, 0, 1, 1, 1, 1,
 'https://hummingbird.travel/property/cheval-blanc-randheli',
 'https://image.hummingbird.travel/disk1/public/hotels/52/119c521d-4ea0-4437-abd3-46e87f7fb51f.jpg'),

-- 27. Sun Island Resort & Spa (not on hummingbird.travel — manually curated)
('Sun Island Resort & Spa', 'South Ari Atoll', 'Nalaguraidhoo', 4, 'budget',
 'One of the largest resort islands in the Maldives. Great value option with whale shark excursions, diverse activities, and multiple restaurants. Accessible by domestic flight.',
 '["large island with diverse activities","whale shark excursion trips","budget-friendly pricing","multiple restaurants","domestic flight access"]',
 'domestic-flight', 20, 1, 1, 1, 0, 1, 0, 0, 1,
 'https://www.sunislandmaldives.com',
 ''),

-- 28. Oblu by Atmosphere at Helengeli (not on hummingbird.travel — manually curated)
('Oblu by Atmosphere at Helengeli', 'North Male Atoll', 'Helengeli', 4, 'mid',
 'All-inclusive resort on a renowned dive island with one of the best house reefs in the Maldives. Easy channel access for diving, The Spice restaurant, and great snorkeling.',
 '["legendary house reef for snorkeling","all-inclusive plans available","channel diving access","The Spice restaurant","great value mid-range option"]',
 'speedboat', 50, 1, 1, 1, 0, 0, 1, 0, 1,
 'https://www.obluhelengeli.com',
 '');
