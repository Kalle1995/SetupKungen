-- database: c:\Users\hetin\Desktop\SetupKungen\server\db\db-manager.db
-- 1. Huvudtabellen för produkter
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,       -- Den långa texten längst ner
    highlights TEXT         -- Punkterna bredvid bilden (t.ex. "4K Ultra HD;Smart TV;65 tum")
);

-- 2. Tabell för alla bilder (Eftersom du ville ha flera per produkt)
CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    image_url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 3. Kategorier (Som vi pratade om innan)
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- 4. Kopplingen
CREATE TABLE IF NOT EXISTS product_categories (
    product_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Ta bort gammal koppling och gamla kategorier så vi börjar rent
DELETE FROM product_categories;
DELETE FROM categories;

-- Lägg in de exakta kategorierna från din nya Nav Bar
INSERT INTO categories (id, name) VALUES (1, 'Datorer');        -- Datorer & Laptops
INSERT INTO categories (id, name) VALUES (2, 'Komponenter');    -- Datorkomponenter (Grafikkort, fläktar etc)
INSERT INTO categories (id, name) VALUES (3, 'Tillbehor');      -- Datortillbehör (Mus, tangentbord etc)
INSERT INTO categories (id, name) VALUES (4, 'Ljud-Bild');      -- Ljud & Bild
INSERT INTO categories (id, name) VALUES (5, 'Konsoler');       -- Spelkonsoler (PS5, Nintendo, Xbox)
INSERT INTO categories (id, name) VALUES (6, 'Spel');           -- Spel & Media

-- Koppla din ASUS ROG (Produkt 1) till 'Datorer' (Kategori 1)
INSERT INTO product_categories (product_id, category_id) VALUES (1, 1);

-- Koppla din PS5 (Produkt 2) till 'Konsoler' (Kategori 5)
INSERT INTO product_categories (product_id, category_id) VALUES (2, 5);


-- Koppla din ASUS ROG (Produkt 1) till 'Datorer' (Kategori 1)
INSERT INTO product_categories (product_id, category_id) VALUES (1, 1);

-- Koppla din PS5 (Produkt 2) till 'Konsoler' (Kategori 5)
INSERT INTO product_categories (product_id, category_id) VALUES (2, 5);

-- 1. Lägg till produkterna
INSERT INTO products (id, name, price, description, highlights) 
VALUES (3, 'NVIDIA GeForce RTX 4070', 7490, 'Ett fantastiskt grafikkort för 1440p gaming med den senaste DLSS-tekniken.', '12GB GDDR6X;Ray Tracing;DLSS 3.5;Låg strömförbrukning');

INSERT INTO products (id, name, price, description, highlights) 
VALUES (4, 'Noctua NF-A12x25 PWM', 349, 'Världsledande fläkt som kombinerar extrem tystnad med otroligt luftflöde.', '120mm;PWM-styrning;Ultra-tyst;Lång livslängd');

-- 2. Lägg till bilder för dem
INSERT INTO product_images (product_id, image_url) VALUES (3, 'https://placehold.co/600x400?text=RTX+4070');
INSERT INTO product_images (product_id, image_url) VALUES (4, 'https://placehold.co/600x400?text=Noctua+Fan');

-- 3. Koppla dem till 'Komponenter' (Kategori 2)
INSERT INTO product_categories (product_id, category_id) VALUES (3, 2);
INSERT INTO product_categories (product_id, category_id) VALUES (4, 2);


-- 1. Lägg till produkterna i 'products'
INSERT INTO products (id, name, price, description, highlights) VALUES 
(10, 'Gamer Entry - RTX 3050', 8490, 'Perfekt första gamingdator för Fortnite och Roblox.', 'RTX 3050 8GB;Intel i5-12400F;16GB RAM;500GB SSD'),
(11, 'Gamer Basic - GTX 1660S', 7290, 'Prisvärd maskin för dig som vill börja med gaming.', 'GTX 1660 Super;Ryzen 5 4500;16GB RAM;500GB SSD'),
(12, 'Gamer Pulse - RX 6600', 8990, 'Kompakt och tyst dator med bra prestanda för pengarna.', 'Radeon RX 6600;Ryzen 5 5500;16GB RAM;1TB SSD'),
(13, 'Business Power - i5', 6490, 'Snabb kontorsdator som även klarar lättare spel.', 'Intel Graphics;Intel i5-13400;16GB RAM;500GB SSD'),
(14, 'Student Pro - RTX 3050', 7990, 'Lagom kraft för både studier och kvällsunderhållning.', 'RTX 3050;Ryzen 5 5600;16GB RAM;1TB SSD'),
(15, 'Mini Apex - RTX 4060', 9200, 'Liten formfaktor men stor prestanda för kompakta ytor.', 'RTX 4060;Intel i5-12400F;16GB RAM;500GB SSD'),
(16, 'Mid-Tower Master - RTX 4060 Ti', 13490, 'Vår mest populära modell för 1080p och 1440p gaming.', 'RTX 4060 Ti 8GB;Ryzen 7 5700X;32GB RAM;1TB SSD'),
(17, 'AMD Strike - RX 7700 XT', 14990, 'Kraftfullt AMD-bygge för hög FPS i tävlingsspel.', 'RX 7700 XT 12GB;Ryzen 7 7700;32GB DDR5;1TB NVMe'),
(18, 'Streamer Elite - RTX 4070', 17490, 'Byggd för dig som vill spela och streama samtidigt.', 'RTX 4070 12GB;Intel i7-13700F;32GB RAM;2TB SSD'),
(19, 'White Frost Edition - RTX 4060 Ti', 15990, 'Snyggt helvitt bygge med massor av RGB-belysning.', 'RTX 4060 Ti;Ryzen 7 7700;32GB DDR5;Vitt chassi'),
(20, 'Creator Pro - RTX 4070S', 18990, 'Perfekt för både gaming och tung videoredigering.', 'RTX 4070 Super;Intel i7-14700K;32GB DDR5;2TB SSD'),
(21, 'Silent Night - RTX 4070', 16490, 'Ljudisolerat chassi för en nästan ljudlös upplevelse.', 'RTX 4070;Ryzen 7 7800X3D;32GB RAM;BeQuiet-kylning'),
(22, 'FPS King - RTX 4060 Ti', 13990, 'Optimerad för maximal FPS i CS2 och Valorant.', 'RTX 4060 Ti;Ryzen 7 7800X3D;16GB RAM;500GB SSD'),
(23, 'Glass Vision - RTX 4070 Ti', 19500, 'Chassi med glaspaneler runt om för att visa upp allt.', 'RTX 4070 Ti;Intel i7-13700K;32GB DDR5;RGB-fläktar'),
(24, 'Titan 4K - RTX 4080S', 26990, 'En best till dator. Spela i 4K med högsta inställningar.', 'RTX 4080 Super;Ryzen 7 7800X3D;32GB DDR5;2TB SSD'),
(25, 'Ultimate Beast - RTX 4090', 39990, 'Världens mest kraftfulla gamingdator. Inga kompromisser.', 'RTX 4090 24GB;Intel i9-14900K;64GB DDR5;4TB SSD'),
(26, 'Liquid Fury - RTX 4080S', 32490, 'Vattenkyld lyxdator med extrem kylning och prestanda.', 'RTX 4080 Super;i9-14900K;Custom Loop;Extreme RGB'),
(27, 'Workstation Ultra - RTX 4090', 35990, 'För proffs som jobbar med 3D och AI-rendering.', 'RTX 4090;64GB DDR5 RAM;i9-14900K;4TB NVMe'),
(28, 'Blackout Stealth - RTX 4080S', 23990, 'Ingen RGB, bara råstyrka i ett stilrent svart chassi.', 'RTX 4080 Super;Ryzen 9 7950X3D;32GB RAM;Noctua-kylning'),
(29, 'Overkill Z - RTX 4090', 44990, 'Det absolut bästa som pengar kan köpa just nu.', 'RTX 4090;128GB RAM;i9-14900K;8TB SSD');

-- 2. Lägg till 3 bilder per produkt (Front, Sida, Inuti)
-- Vi använder loopad INSERT för att spara plats i koden
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Front' FROM products WHERE id BETWEEN 10 AND 29;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Side' FROM products WHERE id BETWEEN 10 AND 29;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Internal' FROM products WHERE id BETWEEN 10 AND 29;

-- 3. Koppla alla till Kategori 1 (Datorer)
INSERT INTO product_categories (product_id, category_id) 
SELECT id, 1 FROM products WHERE id BETWEEN 10 AND 29;


-- ==========================================================
-- TILLÄGG: 20 LAPTOPS (ID 30-49)
-- ==========================================================

-- 1. Lägg till produkterna i 'products'
INSERT INTO products (id, name, price, description, highlights) VALUES 
(30, 'SlimBook Air 13', 11490, 'Extremt lätt och smidig laptop för studier och resor.', '13.3" Retina;M2 Chip;8GB RAM;256GB SSD'),
(31, 'Gamer Stealth 15', 13990, 'Tunn gaminglaptop som inte kompromissar med kraften.', 'RTX 4050;i7-13620H;144Hz skärm;16GB RAM'),
(32, 'ProArt Studio 16', 24990, 'Professionell laptop för kreatörer och fotografer.', '4K OLED;RTX 4070;32GB RAM;2TB SSD'),
(33, 'Nitro V 15', 9990, 'Prisvärd gaming för dig som vill spela de senaste titlarna.', 'RTX 4050;i5-13420H;144Hz;512GB SSD'),
(34, 'Office Elite 14', 8990, 'Perfekt för arbete med lång batteritid och bra tangentbord.', 'i5-1335U;16GB RAM;512GB SSD;Bakbelyst tangentbord'),
(35, 'Zenith Gaming 17', 18490, 'Stor skärm för en mer uppslukande spelupplevelse.', '17.3" QHD 240Hz;RTX 4070;i9-13900H;1TB SSD'),
(36, 'Titan Mobile 18', 42990, 'Världens mest kraftfulla laptop. Ersätter din stationära.', 'RTX 4090;i9-14900HX;64GB DDR5;4TB SSD'),
(37, 'Carbon X1 Ultrabook', 16500, 'Den ultimata affärslaptopen i kolfiber.', '14" IPS;i7-1355U;16GB RAM;Tunn & Lätt'),
(38, 'Tuf Gaming A15', 11990, 'Robust och hållbar dator byggd för tuffa tag.', 'Ryzen 7 7735HS;RTX 4060;144Hz;MIL-STD-810H'),
(39, 'Flow X13 Convertible', 15490, 'Hybrid-laptop som kan vikas 360 grader till en surfplatta.', 'Pekskärm;RTX 4050;Ryzen 9;360-gångjärn'),
(40, 'IdeaPad Slim 3', 5990, 'Enkel och bra vardagsdator för surf och film.', '15.6" Full HD;Ryzen 5;8GB RAM;512GB SSD'),
(41, 'Katana GF66', 12490, 'Klassisk design med rött bakbelyst tangentbord.', 'RTX 4060;i7-12650H;144Hz;1TB SSD'),
(42, 'Razer Blade 14 White', 27990, 'Exklusiv vit design i aluminium med enorm kraft.', 'RTX 4070;Ryzen 9 7940HS;QHD 240Hz;Vitt chassi'),
(43, 'Victus 16 Gaming', 10490, 'Modern design som passar både för skola och spel.', 'RTX 4050;Ryzen 5 7640HS;161Hz;512GB SSD'),
(44, 'Surface Laptop Pro', 14200, 'Elegant design med fantastisk pekskärm.', '13.5" PixelSense;i7-1255U;16GB RAM;Touch-support'),
(45, 'Predator Helios Neo', 16990, 'Avancerad kylning för långa gaming-sessioner.', 'RTX 4070;i7-13700HX;165Hz QHD;Flytande metall-kylning'),
(46, 'Latitude Business 5000', 11200, 'Säker och pålitlig dator för kontorsbruk.', 'i5-1345U;vPro-stöd;16GB RAM;Webbkamera-skydd'),
(47, 'Legion Slim 7i', 21500, 'Premium-känsla i metall med fantastisk prestanda.', 'RTX 4070;i9-13900H;3.2K Skärm;32GB RAM'),
(48, 'Chromebook Plus 14', 4490, 'Snabb och enkel för molnbaserat arbete.', 'Intel Core i3;8GB RAM;128GB eMMC;ChromeOS'),
(49, 'Zephyrus G14 OLED', 22990, 'Kompakt 14-tummare med den snyggaste skärmen på marknaden.', 'RTX 4060;Ryzen 9;OLED 120Hz;AniMe Matrix');

-- 2. Lägg till 3 bilder per laptop (Front, Öppen, Profil)
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Closed' FROM products WHERE id BETWEEN 30 AND 49;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Open' FROM products WHERE id BETWEEN 30 AND 49;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Side' FROM products WHERE id BETWEEN 30 AND 49;

-- 3. Koppla alla till Kategori 1 (Datorer & Laptops)
INSERT INTO product_categories (product_id, category_id) 
SELECT id, 1 FROM products WHERE id BETWEEN 30 AND 49;

-- ==========================================================
-- TILLÄGG: 70 DATORKOMPONENTER (ID 100-169)
-- ==========================================================

-- 1. GRAFIKKORT (GPU) - ID 100-109
INSERT INTO products (id, name, price, description, highlights) VALUES 
(100, 'ASUS RTX 4060 Dual', 3890, 'Kompakt kort med fantastisk 1080p-prestanda.', '8GB GDDR6;Dual Fan;DLSS 3;Ray Tracing'),
(101, 'MSI RTX 4070 Ventus', 6990, 'Effektiv kylning och grym kraft för 1440p.', '12GB GDDR6X;Trippel-fläkt;DLSS 3.5;Effektiv'),
(102, 'Gigabyte RTX 4080 Super', 12490, 'Extrem prestanda för 4K-gaming.', '16GB VRAM;Windforce Cooling;RGB Fusion;DLSS 3'),
(103, 'ASUS ROG RTX 4090 Strix', 23990, 'Världens mest kraftfulla grafikkort.', '24GB VRAM;Massiv kylare;RGB;Extreme Performance'),
(104, 'Sapphire RX 7800 XT', 6290, 'Prisvärd kraft från AMD med mycket minne.', '16GB GDDR6;RDNA 3;Dual BIOS;High FPS'),
(105, 'XFX RX 7900 XTX', 11490, 'AMD:s flaggskepp för den ultimata upplevelsen.', '24GB VRAM;Merc 310;Radiant RGB;FSR 3.0'),
(106, 'Zotac RTX 4070 Ti Super', 9890, 'Perfekt balans mellan pris och prestanda.', '16GB GDDR6X;IceStorm 2.0;Spectra RGB;1440p King'),
(107, 'PNY RTX 4060 Ti', 4990, 'Snabbt och strömsnålt kort för moderna spel.', '8GB VRAM;Kompakt;DLSS 3;Tyst drift'),
(108, 'ASUS TUF RX 7600', 3490, 'Hållbart kort för stabil 1080p gaming.', '8GB VRAM;TUF Components;Dual Ball Bearings;AMD'),
(109, 'Inno3D RTX 3060 Twin', 3190, 'Klassisk favorit som fortfarande levererar.', '12GB VRAM;Twin Fan;Ray Tracing;Prisvärd');

-- 2. PROCESSORER (CPU) - ID 110-119
INSERT INTO products (id, name, price, description, highlights) VALUES 
(110, 'Intel Core i5-13600K', 3690, 'Kungen av gaming-processorer i mellanklassen.', '14 kärnor;5.1GHz;LGA1700;DDR5 stöd'),
(111, 'Intel Core i7-14700K', 4990, 'Grym kraft för både gaming och streaming.', '20 kärnor;5.6GHz;LGA1700;Hyper-threading'),
(112, 'Intel Core i9-14900K', 6890, 'Den snabbaste processorn från Intel.', '24 kärnor;6.0GHz;LGA1700;Extreme'),
(113, 'AMD Ryzen 5 7600X', 2690, 'Prisvärd instegsmodell för AM5-plattformen.', '6 kärnor;5.3GHz;AM5;DDR5 enbart'),
(114, 'AMD Ryzen 7 7800X3D', 4690, 'Världens bästa gaming-CPU tack vare 3D V-Cache.', '8 kärnor;104MB Cache;AM5;Gamer-favorit'),
(115, 'AMD Ryzen 9 7950X3D', 7490, 'Ultimat processor för proffs och gamers.', '16 kärnor;144MB Cache;AM5;Extreme Multitasking'),
(116, 'Intel Core i5-12400F', 1690, 'Bästa budgetvalet för en stabil speldator.', '6 kärnor;4.4GHz;Prisvärd;Ingen grafik'),
(117, 'AMD Ryzen 5 5600', 1490, 'Fortfarande en av de mest populära för AM4.', '6 kärnor;4.4GHz;AM4;Kylare ingår'),
(118, 'Intel Core i3-13100F', 990, 'Perfekt för en enkel kontors- eller speldator.', '4 kärnor;4.5GHz;LGA1700;Billig'),
(119, 'AMD Ryzen 7 5700X', 1990, 'Mycket kraft för pengarna på AM4-plattformen.', '8 kärnor;4.6GHz;AM4;65W TDP');

-- 3. CHASSIFLÄKTAR - ID 120-129
INSERT INTO products (id, name, price, description, highlights) VALUES 
(120, 'Corsair LL120 RGB 3-pack', 990, 'Snyggaste RGB-fläktarna på marknaden.', '120mm;RGB;Inkl. Node Pro;PWM'),
(121, 'Lian Li Uni Fan SL120', 349, 'Slipp sladdar med modulära fläktar.', '120mm;Daisy-chain;RGB;Hög kvalitet'),
(122, 'Be Quiet! Silent Wings 4', 249, 'Helt ljudlösa fläktar för ett tyst bygge.', '120mm;6-polig motor;Gummi-fästen;Tyst'),
(123, 'Arctic P12 PWM PST', 99, 'Bästa prestanda per krona.', '120mm;PWM;Tryckoptimerad;Svart'),
(124, 'Noctua NF-S12A PWM', 269, 'Premiumfläkt för optimalt luftflöde.', '120mm;Anti-Stall Knobs;SSO2 Lager;Noctua-brun'),
(125, 'Cooler Master SickleFlow', 149, 'Stabil fläkt med snygg blå belysning.', '120mm;Blå LED;PWM;Hållbar'),
(126, 'NZXT F120 RGB', 299, 'Stilren design som passar perfekt i NZXT-chassin.', '120mm;RGB;PWM;Stilren'),
(127, 'Phanteks T30-120', 369, 'Den mest kraftfulla fläkten för kylning.', '120mm;30mm tjock;MagLev motor;Industri-kvalitet'),
(128, 'Fractal Aspect 14 RGB', 199, 'Snygga 140mm fläktar för ditt Fractal-chassi.', '140mm;RGB;Rifle bearing;Tyst'),
(129, 'Noctua Chromax Black', 299, 'Samma Noctua-kvalitet men i helsvart.', '120mm;Helsvart;PWM;Premium');

-- 4. RAM-MINNE - ID 130-139
INSERT INTO products (id, name, price, description, highlights) VALUES 
(130, 'Corsair Vengeance DDR5 32GB', 1490, 'Snabbt och stabilt för moderna system.', '6000MHz;CL30;Intel XMP;Svart'),
(131, 'G.Skill Trident Z5 RGB 32GB', 1890, 'Det snabbaste RAM-minnet för entusiaster.', '6400MHz;CL32;RGB;Premium look'),
(132, 'Kingston FURY Beast 16GB', 690, 'Prisvärt DDR4-minne för alla byggen.', '3200MHz;CL16;Låg profil;Plug-n-Play'),
(133, 'Corsair Dominator Titanium 64GB', 4290, 'Det absolut lyxigaste RAM-minnet.', '7200MHz;DDR5;RGB;Extremt'),
(134, 'Crucial Pro DDR5 32GB', 1290, 'Stilren design utan krångel.', '5600MHz;Standard design;Hög stabilitet;DDR5'),
(135, 'Team Group T-Force Delta 32GB', 1390, 'Snygg RGB som lyser upp hela chassit.', '6000MHz;DDR5;RGB;Vit design'),
(136, 'Lexar Thor DDR4 16GB', 490, 'Billigt men bra för äldre system.', '3200MHz;Svart kylfläns;Hög prestanda;DDR4'),
(137, 'Mushkin Redline 32GB', 1590, 'Aggressiv design för speldatorn.', '6000MHz;CL30;Röd design;DDR5'),
(138, 'ADATA XPG Lancer 32GB', 1350, 'Pålitligt och snabbt för alla moderkort.', '6000MHz;RGB;DDR5;Stabilt'),
(139, 'Patriot Viper Venom 32GB', 1420, 'Byggt för extrem överklockning.', '6200MHz;Svart/Grå;DDR5;XMP 3.0');

-- 5. MODERKORT (Motherboard) - ID 140-149
INSERT INTO products (id, name, price, description, highlights) VALUES 
(140, 'ASUS ROG Strix Z790-F', 4690, 'Premium-kort för Intel 13:e och 14:e gen.', 'LGA1700;DDR5;WiFi 6E;PCIe 5.0'),
(141, 'MSI B650 Tomahawk WiFi', 2490, 'Bästa valet för din AMD Ryzen 7000.', 'AM5;DDR5;WiFi;Stark VRM'),
(142, 'ASRock B760M Steel Legend', 1890, 'Snyggt och prisvärt i mATX-format.', 'LGA1700;WiFi;DDR5;Vit/Camo design'),
(143, 'Gigabyte Z790 Aorus Elite', 3290, 'Grymt kort för överklockning av Intel.', 'LGA1700;DDR5;4x M.2;WiFi'),
(144, 'ASUS TUF Gaming B550-Plus', 1490, 'Klassiker för AM4-plattformen.', 'AM4;DDR4;PCIe 4.0;Stabil'),
(145, 'MSI Z790 Godlike', 12990, 'Världens mest extrema moderkort.', 'LGA1700;Inbyggd skärm;Extreme VRM;Lyx'),
(146, 'Gigabyte X670E Aorus Master', 5490, 'Toppmodell för AMD Ryzen 7000.', 'AM5;DDR5;PCIe 5.0;WiFi 6E'),
(147, 'ASUS Prime B650-Plus', 1990, 'Enkelt och stilrent AM5-kort.', 'AM5;DDR5;M.2 stöd;Silver/Svart'),
(148, 'NZXT N7 B650 White', 3290, 'Det snyggaste kortet för vita byggen.', 'AM5;Helvit plåt;WiFi;Minimalistiskt'),
(149, 'ASRock X670E Taichi', 5990, 'Unik design med kugghjul och hög kvalitet.', 'AM5;DDR5;E-ATX;USB4 stöd');

-- 6. NÄTAGGREGAT (Power Supply) - ID 150-159
INSERT INTO products (id, name, price, description, highlights) VALUES 
(150, 'Corsair RM850e ATX 3.0', 1390, 'Modernt guld-certifierat nätaggregat.', '850W;80+ Gold;Helmodulärt;ATX 3.0'),
(151, 'Be Quiet! Dark Power 13', 2890, 'Titan-effektivitet och extremt tyst.', '1000W;80+ Titanium;ATX 3.0;Tyst fläkt'),
(152, 'Cooler Master MWE 650', 690, 'Bra instegsmodell för enklare datorer.', '650W;80+ Bronze;Stabil;Prisvärd'),
(153, 'ASUS ROG Thor 1200P2', 3990, 'Nätaggregat med inbyggd OLED-skärm.', '1200W;80+ Platinum;RGB;OLED Display'),
(154, 'EVGA SuperNova 750 GT', 1190, 'Kompakt och pålitlig kraft.', '750W;80+ Gold;Helmodulärt;Kompakt'),
(155, 'Seasonic Focus GX 850', 1590, 'Världsledande kvalitet och 10 års garanti.', '850W;80+ Gold;Modulärt;Kompakt'),
(156, 'Fractal Ion Gold 750', 1090, 'Flexibla kablar som är lätta att dra.', '750W;80+ Gold;UltraFlex-kablar;Tyst'),
(157, 'Corsair SF750 SFX', 1790, 'Det bästa valet för små Mini-ITX byggen.', '750W;80+ Platinum;SFX;Smalt'),
(158, 'Phanteks Revolt 1200W', 2490, 'Redo för dubbla RTX 4090.', '1200W;80+ Platinum;Modulärt;Pro-kablar'),
(159, 'MSI MAG A850GL', 1250, 'Prisvärt ATX 3.0 nätaggregat.', '850W;80+ Gold;PCIe 5.0 redo;Kompakt');

-- 7. CPU-KYLARE (Luft & Vatten) - ID 160-169
INSERT INTO products (id, name, price, description, highlights) VALUES 
(160, 'DeepCool AK620 Digital', 890, 'Luftkylare med inbyggd display för temperatur.', 'Dubbla torn;Digital Display;Sex värmerör;Svart'),
(161, 'NZXT Kraken Elite 360', 3290, 'Vattenkylning med stor LCD-skärm på pumpen.', '360mm;LCD Skärm;RGB fläktar;Hög prestanda'),
(162, 'Noctua NH-D15 chromax.black', 1290, 'Kungen av luftkylare i helsvart design.', 'Dubbla 140mm;Extremt tyst;Låg temp;Legend'),
(163, 'Arctic Liquid Freezer III 360', 1190, 'Mest prisvärda vattenkylningen just nu.', '360mm;VRM-fläkt;Tjock radiator;Svart'),
(164, 'Cooler Master Hyper 212 Halo', 449, 'Klassisk kylare med snygg RGB.', '120mm;RGB;Smal design;Lättmonterad'),
(165, 'Lian Li Galahad II LCD', 2890, 'Vattenkylning med snygg skärm och Uni-fans.', '360mm;LCD;Daisy-chain fläktar;Hög FPS'),
(166, 'Be Quiet! Pure Rock 2 Black', 399, 'Elegant och tyst för vardagsbruk.', '120mm;Svart eloxerad;Tyst fläkt;150W TDP'),
(167, 'Corsair iCUE Link H150i', 3490, 'Framtidens kylning med endast en sladd.', '360mm;iCUE Link;RGB;Smart system'),
(168, 'Thermalright Peerless Assassin', 450, 'Slår nästan allt i sin prisklass.', 'Dubbla torn;120mm fläktar;Sex rör;Bäst pris'),
(169, 'ASUS ROG Ryujin III 360', 3990, 'Extrem kylning med inbyggd Noctua-fläkt.', '360mm;LCD Skärm;Noctua fläktar;Premium');

-- 3. Koppla alla 70 komponenter till Kategori 2 (Komponenter)
INSERT INTO product_categories (product_id, category_id) 
SELECT id, 2 FROM products WHERE id BETWEEN 100 AND 169;

-- 4. Lägg till 3 bilder per produkt
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Box' FROM products WHERE id BETWEEN 100 AND 169;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Front' FROM products WHERE id BETWEEN 100 AND 169;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Back' FROM products WHERE id BETWEEN 100 AND 169;

-- ==========================================================
-- TILLÄGG: DATORTILLBEHÖR (ID 200-245)
-- ==========================================================

-- 1. GAMINGBORD - ID 200-204
INSERT INTO products (id, name, price, description, highlights) VALUES 
(200, 'Arena Gaming Desk Black', 2990, 'Stort och stabilt bord med heltäckande musmatta.', '160cm bredd;Kabelhantering;Vattenavvisande;Stabil stålram'),
(201, 'E-Sport Pro Desk RGB', 3490, 'Höj- och sänkbart bord med inbyggd RGB-belysning.', 'Elektrisk motor;RGB-kanter;Headset-krok;Muggfållare'),
(202, 'Kompakt Gamer bord', 1490, 'Perfekt för mindre rum men med plats för allt.', '110cm bredd;Kolfiber-look;Kabeldike;Stilren'),
(203, 'Studio Workstation L-Shape', 3990, 'Hörnbord för den ultimata setupen.', 'L-form;Plats för 3 skärmar;Träfinish;Massiv'),
(204, 'Streamer Desk 140', 2290, 'Designat för streamers med fästen för mikrofonarm.', '140cm bredd;Ergonomisk front;Matt finish;Enkel montering');

-- 2. GAMINGSTOLAR - ID 205-214
INSERT INTO products (id, name, price, description, highlights) VALUES 
(205, 'Omega Racing Chair', 2490, 'Klassisk racingstol med hög komfort.', 'PU-Läder;Ländryggsstöd;135 graders lutning;4D Armstöd'),
(206, 'Titan Evo 2024', 5290, 'Premiumstol för dig som sitter många timmar.', 'Magnetisk kudde;Hybridläder;Ländryggsstöd;Guld-standard'),
(207, 'Fabric Comfort Pro', 2890, 'Andningsbart tyg som håller dig sval.', 'Tygklädsel;Mjuka kuddar;Tystgående hjul;Grå design'),
(208, 'Pink Diamond Edition', 2690, 'Snygg rosa stol med diamantmönstrad sömnad.', 'Rosa/Vit;Extra vaddering;Stålbas;Gamer-stil'),
(209, 'Boss Executive Gamer', 3990, 'Bredare modell för maximal lyx och plats.', 'Extra bred sits;Äkta läder;Multifunktionell;Hög viktkapacitet'),
(210, 'Ergo-Mesh Gaming', 3190, 'Ergonomisk nätstol för maximal ventilation.', 'Mesh-rygg;Justerbar nackstöd;Synkro-gunga;Modern'),
(211, 'Kids Junior Gamer', 1290, 'Anpassad storlek för de yngre spelarna.', 'Kompakt;Lättmonterad;Färgglad;Säkerhetsfötter'),
(212, 'Throne King Gold', 4490, 'Guld-detaljer och mocka-finish för kungen.', 'Mocka-detaljer;Guld-sömmar;Minnesskum;Premium'),
(213, 'Stealth All-Black', 2200, 'Helsvart diskret stol för både jobb och spel.', 'Matt svart;PU-läder;Hög rygg;Stilren'),
(214, 'Legendary Rocker', 1890, 'Golvstol för konsolspelaren.', 'Gung-funktion;Inbyggda högtalare;Fällbar;Bekväm');

-- 3. MUSMATTOR - ID 215-217
INSERT INTO products (id, name, price, description, highlights) VALUES 
(215, 'XXL Mega Mat RGB', 449, 'Täcker hela skrivbordet med lysande kanter.', '900x400mm;RGB-list;Halkfri bas;Micro-textur'),
(216, 'Speed Edition Pro', 249, 'Slät yta för snabba rörelser i FPS-spel.', '450x400mm;Sydda kanter;Vattenavvisande;Snabb'),
(217, 'Control Grain Mat', 249, 'Grov yta för maximal precision.', '450x400mm;Hög kontroll;Tung bas;Slitstark');

-- 4. STATIV & FÄSTEN - ID 218-220
INSERT INTO products (id, name, price, description, highlights) VALUES 
(218, 'Dual Monitor Arm', 890, 'Frigör yta på bordet med gasfjädrade armar.', '2x 27 tum;Gasfjäder;360 graders rotation;Kabelgömma'),
(219, 'Laptop Stand Alu', 349, 'Höjer upp din laptop för bättre ergonomi.', 'Aluminium;Hopfällbar;Luftflöde;Silikonskydd'),
(220, 'Headset Stand RGB', 299, 'Håll ordning på ditt headset med stil.', 'Inbyggd USB-hub;RGB;Stabil bas;Snygg design');

-- 5. KABLAR & ADAPTRAR - ID 221-225
INSERT INTO products (id, name, price, description, highlights) VALUES 
(221, 'DisplayPort 1.4 Guld', 199, 'Kabel för hög uppdateringsfrekvens.', '2 meter;8K stöd;Guldpläterad;Flätad'),
(222, 'HDMI 2.1 Ultra High Speed', 249, 'Perfekt för PS5 och 4K-TV.', '2.1 Standard;4K@120Hz;3 meter;Skyddad'),
(223, 'USB-C Snabbladdningskabel', 149, 'Slitstark kabel för laddning och data.', 'USB-C till C;60W PD;Flätad nylon;2 meter'),
(224, 'Ethernet Cat6 Flat', 99, 'Platt nätverkskabel som är lätt att dölja.', '10 meter;Cat6;1000Mbps;Vit'),
(225, 'Internal Power Cable Set', 599, 'Snygga flätade kablar för insidan av datorn.', 'Förlängningskit;Vit/Svart;Kabelkammar;Universal');

-- 6. FLASH MEMORY / USB-MINNEN - ID 226-230
INSERT INTO products (id, name, price, description, highlights) VALUES 
(226, 'Ultra Fast USB 128GB', 249, 'Snabbt minne för att flytta filer snabbt.', 'USB 3.2;128GB;Metallchassi;Lösenordsskydd'),
(227, 'MicroSD Extreme 256GB', 499, 'Perfekt för Nintendo Switch och kameror.', 'Class 10;U3;V30;Inkl. SD-adapter'),
(228, 'Portable SSD 1TB', 990, 'Extern hårddisk i fickformat.', '1050MB/s;USB-C;Stötsäker;1TB'),
(229, 'Keyring USB 64GB', 129, 'Ha alltid dina viktigaste filer på nyckelknippan.', 'Kompakt;64GB;Vattentålig;Stilren'),
(230, 'SDXC Video Pro 128GB', 399, 'För dig som filmar i 4K.', 'V60 Pro;128GB;Snabba skrivhastigheter;Pålitlig');

-- 7. EXTRA TILLBEHÖR (Hittar på lite till) - ID 231-235
INSERT INTO products (id, name, price, description, highlights) VALUES 
(231, 'Air Duster Spray', 89, 'Håll din dator ren från damm.', 'Tryckluft;400ml;Förlängningsrör;Kraftfull'),
(232, 'Gamer Cleaning Kit', 199, 'Allt för att göra rent skärm, tangentbord och mus.', 'Spray;Microfiber;Borste;Alkoholfri'),
(233, 'Bungee för mus', 149, 'Slipp kabeltrassel när du spelar.', 'Fjäderarm;Tung bas;Universal fäste;Gummerad'),
(234, 'Webcam Cover 3-pack', 49, 'Skydda din integritet på ett enkelt sätt.', 'Skjutbar;Tunn;Självhäftande;Svart'),
(235, 'Controller Stand Dual', 249, 'Ställ för dina handkontroller.', 'Plats för 2;Stabil;Svart akryl;Stilren');

-- 8. Koppla alla 45 till Kategori 3 (Tillbehör)
INSERT INTO product_categories (product_id, category_id) 
SELECT id, 3 FROM products WHERE id BETWEEN 200 AND 235;

-- 9. Lägg till 3 bilder per produkt
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Main' FROM products WHERE id BETWEEN 200 AND 235;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Side' FROM products WHERE id BETWEEN 200 AND 235;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Box' FROM products WHERE id BETWEEN 200 AND 235;

-- ==========================================================
-- TILLÄGG: MÖSS OCH TANGENTBORD (ID 250-269) -> KATEGORI 3
-- ==========================================================

-- 1. GAMINGMÖSS - ID 250-259
INSERT INTO products (id, name, price, description, highlights) VALUES 
(250, 'Logitech G Pro X Superlight', 1590, 'Världens mest populära gamingmus bland e-sportproffs.', '63g vikt;LIGHTSPEED Wireless;HERO 25K Sensor;Vit'),
(251, 'Razer DeathAdder V3 Pro', 1490, 'Ergonomisk mus i toppklass med extrem precision.', '64g vikt;Focus Pro 30K Sensor;90h batteri;Svart'),
(252, 'SteelSeries Rival 3', 399, 'Bästa budgetvalet för stabil gaming.', 'RGB-belysning;8500 CPI;Prisvärd;Lätt vikt'),
(253, 'Glorious Model O Wireless', 990, 'Hålad design för lägsta möjliga vikt och maximalt glid.', '69g vikt;BAMF Sensor;G-Skates;RGB'),
(254, 'Corsair Scimitar RGB Elite', 890, 'Specialdesignad för MMO och MOBA-spel.', '17 programmerbara knappar;18K DPI;Justerbar panel'),
(255, 'Zowie EC2-C', 790, 'E-sportsklassiker känd för sin perfekta form.', 'Ergonomisk;Plug & Play;Paracord-kabel;3360 Sensor'),
(256, 'HyperX Pulsefire Haste', 549, 'Ultralätt mus med honeycomb-skal.', '59g vikt;TTC Golden brytare;PTFE-skates;Svart'),
(257, 'ASUS ROG Spatha X', 1690, 'Trådlös monster-mus för dig med stora händer.', '12 knappar;Magnetisk laddningsstation;RGB;Tung & Stabil'),
(258, 'Logitech G502 Hero', 699, 'Världens mest sålda gamingmus genom tiderna.', '11 knappar;Justerbara vikter;Hero Sensor;RGB'),
(259, 'Finalmouse Starlight-12', 2490, 'Exklusiv samlarmus i magnesium.', '47g vikt;Magnesiumchassi;Limited Edition;Trådlös');

-- 2. TANGENTBORD - ID 260-269
INSERT INTO products (id, name, price, description, highlights) VALUES 
(260, 'SteelSeries Apex Pro TKL', 2290, 'Världens snabbaste tangentbord med justerbara brytare.', 'OmniPoint 2.0;OLED Smart Display;RGB;PBT Keycaps'),
(261, 'Logitech G915 TKL', 2190, 'Lågprofils-tangentbord i premiumkvalitet.', 'LIGHTSPEED Wireless;Mekaniska brytare;Aluminium;RGB'),
(262, 'Razer BlackWidow V4', 1890, 'Klassiskt mekaniskt tangentbord med massor av funktioner.', 'Gröna klickiga brytare;Media-rulle;RGB;Handlovsstöd'),
(263, 'Ducky One 3 Mini 60%', 1390, 'Kompakt 60% tangentbord för mer musmatta-yta.', 'Hot-swap;Cherry MX Blue;PBT Double-shot;RGB'),
(264, 'Varmilo VA88M Sakura', 1790, 'Högsta byggkvalitet med vacker rosa design.', 'Cherry MX Red;PBT plast;Sakura Design;TKL'),
(265, 'Corsair K70 RGB PRO', 1690, 'Turneringsklart tangentbord med hög prestanda.', '8000Hz Polling;OPX Brytare;Volymrulle;Avtagbar kabel'),
(266, 'Keychron Q1 Custom', 2490, 'För dig som vill ha den ultimata skrivkänslan.', 'Aluminiumchassi;Gasket Mount;Hot-swappable;Hög kvalitet'),
(267, 'Xtrfy K4 RGB TKL', 890, 'Stabilt och hållbart tangentbord för gaming.', 'Kailh Red;RGB;Slitstark konstruktion;Vit design'),
(268, 'Wooting 60HE', 2100, 'Tangentbord med analoga brytare för extrem kontroll.', 'Lekker brytare;Analog input;Rapid Trigger;60% format'),
(269, 'HyperX Alloy Origins Core', 990, 'Kompakt och stilrent med egenutvecklade brytare.', 'HyperX Red;Aluminiumkropp;RGB;TKL format');

-- 3. Koppla dessa 20 produkter till Kategori 3 (Tillbehor)
INSERT INTO product_categories (product_id, category_id) 
SELECT id, 3 FROM products WHERE id BETWEEN 250 AND 269;

-- 4. Lägg till 3 bilder per produkt
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Main' FROM products WHERE id BETWEEN 250 AND 269;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Side' FROM products WHERE id BETWEEN 250 AND 269;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Box' FROM products WHERE id BETWEEN 250 AND 269;

-- ==========================================================
-- TILLÄGG: LJUD & BILD (ID 300-344) -> KATEGORI 4
-- ==========================================================

-- 1. HEADSETS - ID 300-324 (25 stycken)
INSERT INTO products (id, name, price, description, highlights) VALUES 
(300, 'HyperX Cloud II', 899, 'Klassiskt gamingheadset med legendarisk komfort.', '7.1 Surround;Minnesskum;Avtagbar mikrofon;Multi-plattform'),
(301, 'SteelSeries Arctis Nova Pro', 3490, 'Det ultimata ljudet för krävande spelare.', 'Hi-Res Audio;Active Noise Cancelling;Dual Connect;GameDAC'),
(302, 'Razer BlackShark V2', 990, 'E-sportheadset med fantastisk mikrofon.', 'THX Spatial Audio;50mm element;Väger lite;USB-ljudkort'),
(303, 'Logitech G733 Wireless', 1390, 'Lätt och färgglatt trådlöst headset.', 'LIGHTSPEED;RGB;29h batteri;Blue VO!CE mikrofon'),
(304, 'Corsair HS80 RGB', 1590, 'Hög upplösning och otrolig mikrofonkvalitet.', 'Dolby Atmos;Broadcast-mikrofon;RGB;Slipe-headband'),
(305, 'Sony WH-1000XM5', 3890, 'Världsledande brusreducering för musik och spel.', 'Active Noise Cancelling;30h batteri;Touch-kontroll;Läder'),
(306, 'EPOS GSP 600', 1790, 'Professionellt slutet headset för fokus.', 'Tysk teknik;Sluten design;Justerbart tryck;Hållbar'),
(307, 'Astro A50 Wireless', 2990, 'Lyxigt headset med laddningsstation för konsol/PC.', 'Basstation ingår;Dolby Audio;15h batteri;Pro-mikrofon'),
(308, 'JBL Quantum 810', 1890, 'Dubbelt trådlöst med aktiv brusreducering.', 'Hi-Res Audio;ANC;Bluetooth + 2.4GHz;RGB-ljus'),
(309, 'Beyerdynamic DT 990 Pro', 1490, 'Studio-hörlurar för den mest kräsne lyssnaren.', 'Öppen design;Studiokvalitet;3m spiralkabel;Gjord i Tyskland'),
(310, 'Turtle Beach Stealth 700', 1450, 'Optimerad för Xbox och PlayStation.', 'Bluetooth;Superhuman Hearing;Vikbar mikrofon;Gelkylning'),
(311, 'Sennheiser Game Zero', 1290, 'Ihopfällbart headset för tävlingsinriktade spelare.', 'XXL öronkåpor;Brusreducerande mikrofon;Resefodral;Tyst'),
(312, 'Audio-Technica M50xSTS', 2190, 'Kombinerar studiokvalitet med streaming-mikrofon.', 'XLR-mikrofon;45mm element;Studioljud;Streamer-val'),
(313, 'Bose QuietComfort 45', 3290, 'Ikonisk komfort med fantastiskt ljud.', 'Noise Cancelling;Aware Mode;Hög trohet;24h batteri'),
(314, 'Skullcandy Crusher Evo', 1690, 'Känn basen vibrera i hela huvudet.', 'Justerbar sensorisk bas;40h batteri;Tile-teknik;Snabbladdning'),
(315, 'Roccat Elo 7.1 Air', 799, 'Prisvärt trådlöst med snygg belysning.', '7.1 Ljud;Stellar Wireless;Glasögon-vänlig;RGB'),
(316, 'Creative SXFI Gamer', 990, 'Personligt anpassat ljud baserat på dina öron.', 'Super X-Fi;Kevlar-kabel;CommanderMic;RGB'),
(317, 'Bang & Olufsen Beoplay Portal', 4990, 'High-end ljud för gaming och livsstil.', 'Lyxigt material;Dolby Atmos;ANC;Xbox-licensierad'),
(318, 'Fnatic React', 749, 'Rent ljud och fokus på det viktigaste.', 'E-sport tunad;Stora kåpor;Klar kommunikation;Analog'),
(319, 'Alienware AW920H', 1990, 'Futuristisk design med snabbladdning.', 'Tri-Mode koppling;Dolby Atmos;RGB;Snabbladdning'),
(320, 'V-MODA Crossfade 3', 2890, 'Robust och stilrent för DJ och Gaming.', 'Metallchassi;Kraftfull bas;Trådlös/Kabel;Anpassningsbar'),
(321, 'Plantronics RIG 800 PRO', 1690, 'Otroligt lätt med inbyggd Dolby Atmos.', 'Väger lite;Laddningsstation;40h batteri;Laggfritt'),
(322, 'Cooler Master MH751', 699, 'Det mest bekväma headsetet i sin prisklass.', 'Platt frekvensgång;Plysch-kuddar;Diskret;Hög kvalitet'),
(323, 'Audeze Maxwell', 3690, 'Planära magnetiska element för extrem detalj.', '90mm element;Filter-brusreducering;80h batteri;Hi-Res'),
(324, 'Asus ROG Delta S', 1890, 'Quad-DAC för ljud i absolut toppklass.', 'AI Noise-Cancelling Mic;MQA stöd;USB-C;RGB');

-- 2. SKÄRMAR - ID 325-344 (20 stycken)
INSERT INTO products (id, name, price, description, highlights) VALUES 
(325, 'Samsung 27" Odyssey G5', 2990, 'Välvd 1440p-skärm som tar dig närmare spelet.', 'QHD 1440p;144Hz;1ms;1000R Curve'),
(326, 'LG 27" UltraGear Nano IPS', 4490, 'Fantastiska färger och extremt snabb svarstid.', '1ms GtG;165Hz;G-Sync;HDR 10'),
(327, 'ASUS 24" ROG Swift', 5990, 'Världens snabbaste gamingskärm för proffs.', '360Hz;Full HD;NVIDIA Reflex;G-Sync Analyzer'),
(328, 'Dell 34" UltraSharp Curved', 8990, 'Ultrawide-skärm för produktivitet och film.', 'WQHD;IPS Black;USB-C Hub;90W PD'),
(329, 'BenQ ZOWIE XL2546K', 5490, 'Standardvalet för CS2-proffs världen över.', '240Hz;DyAc+;S-Switch;Shields ingår'),
(330, 'Gigabyte 32" M32U 4K', 8490, '4K gaming med hög uppdateringsfrekvens.', '4K UHD;144Hz;KVM-switch;HDMI 2.1'),
(331, 'MSI 27" Optix G271', 1990, 'Bästa budgetskärmen med IPS-panel.', 'Full HD;144Hz;1ms;IPS-panel'),
(332, 'Alienware 34" QD-OLED', 11990, 'Den ultimata bildkvaliteten med OLED-teknik.', 'QD-OLED;175Hz;0.1ms;Välvd'),
(333, 'ASUS 28" TUF Gaming 4K', 5290, 'Prisvärd 4K-skärm för både PC och konsol.', '4K UHD;144Hz;ELMB Sync;HDMI 2.1'),
(334, 'Samsung 49" Odyssey G9', 13990, 'Massiv ultrawide som ersätter två skärmar.', 'Dual QHD;240Hz;1000R Curve;HDR 1000'),
(335, 'Acer 27" Predator XB3', 4290, 'Grymt bra allround-skärm för seriösa spelare.', 'QHD 165Hz;G-Sync;IPS;RGB-baksida'),
(336, 'AOC 24" G2 Series', 1790, 'Klassisk instegsskärm för alla typer av spel.', '144Hz;1ms;FreeSync;Tunn ram'),
(337, 'ViewSonic 32" Elite', 6890, 'Stor yta och fantastisk färgåtergivning.', 'QHD;165Hz;G-Sync;Design-vinnare'),
(338, 'Philips 27" Momentum', 3990, 'Designad specifikt för Xbox och PS5.', '4K;60Hz (Console Optimerad);Ambiglow;Inbyggt ljud'),
(339, 'HP OMEN 27u 4K', 7490, 'Stilren design med belysning och 4K-kraft.', '4K UHD;144Hz;AMD FreeSync;RGB Diamond'),
(340, 'Lenovo Legion 25" Pro', 3190, 'Snabb skärm för tävlingsinriktat spelande.', '240Hz;Full HD;DisplayHDR 400;Ergonomisk'),
(341, 'Huawei MateView GT 34"', 5490, 'Ultrawide med inbyggd soundbar i foten.', '165Hz;Inbyggd högtalare;Touch-volym;Välvd'),
(342, 'Corsair Xeneon Flex', 19990, 'Världens första böjbara OLED-skärm.', 'OLED;240Hz;Böjbar panel;45 tum'),
(343, 'Iiyama 27" Red Eagle', 2490, 'Mest prestanda per krona i mellanklassen.', 'QHD;165Hz;0.5ms;IPS'),
(344, 'Eizo Foris Nova', 29990, 'Referensskärm för den som kräver perfektion.', '4K OLED;21 tum;Professionell färg;Unik');

-- 3. Koppla alla 45 till Kategori 4 (Ljud-Bild)
INSERT INTO product_categories (product_id, category_id) 
SELECT id, 4 FROM products WHERE id BETWEEN 300 AND 344;

-- 4. Lägg till 3 bilder per produkt
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Front' FROM products WHERE id BETWEEN 300 AND 344;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Side' FROM products WHERE id BETWEEN 300 AND 344;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Package' FROM products WHERE id BETWEEN 300 AND 344;


-- database: c:\Users\hetin\Desktop\SetupKungen\server\db\db-manager.db

-- ==========================================================
-- TILLÄGG: SPELKONSOLER (ID 400-415) -> KATEGORI 5
-- ==========================================================

-- 1. PLAYSTATION (PS5) - ID 400-402
INSERT INTO products (id, name, price, description, highlights) VALUES 
(400, 'PlayStation 5 Slim Disc Edition', 5990, 'Den senaste versionen av PS5 med avtagbar skivläsare och 1TB lagring.', '4K-gaming;1TB SSD;Ray Tracing;DualSense inkl.'),
(401, 'PlayStation 5 Slim Digital', 5290, 'Samma kraft som vanliga PS5 men helt utan skivläsare.', 'Helt digital;1TB SSD;Tunnare design;4K-stöd'),
(402, 'PlayStation Portal Remote Player', 2490, 'Spela dina PS5-spel trådlöst via ditt hemmanätverk.', '8" LCD-skärm;DualSense-funktioner;1080p 60fps;Streaming');

-- 2. XBOX SERIES - ID 403-405
INSERT INTO products (id, name, price, description, highlights) VALUES 
(403, 'Xbox Series X', 5690, 'Världens mest kraftfulla konsol med äkta 4K-gaming.', '12 Teraflops;1TB SSD;4K Blu-ray;Quick Resume'),
(404, 'Xbox Series S - 512GB', 3290, 'Den minsta och mest prisvärda Xbox-konsolen någonsin.', 'Helt digital;1440p-stöd;Kompakt;Next-gen prestanda'),
(405, 'Xbox Series S Carbon Black', 3890, 'Specialutgåva av Series S med mer lagringsutrymme.', '1TB SSD;Carbon Black finish;Digital;Snabb laddning');

-- 3. NINTENDO SWITCH - ID 406-408
INSERT INTO products (id, name, price, description, highlights) VALUES 
(406, 'Nintendo Switch OLED White', 3990, 'Upplev fantastiska färger med den nya OLED-skärmen.', '7" OLED-skärm;64GB minne;LAN-port;Vibrant Colors'),
(407, 'Nintendo Switch Neon Blue/Red', 3290, 'Den klassiska hybridkonsolen för hela familjen.', 'Handhållet/TV-läge;Joy-Cons inkl.;32GB minne;Klassisk'),
(408, 'Nintendo Switch Lite Turquoise', 2290, 'Specialdesignad för handhållet spelande när du är på språng.', 'Endast handhållen;Lätt design;Inbyggda kontroller;Turkos');

-- 4. HANDHÅLLNA PC-KONSOLER & RETRO - ID 409-413
INSERT INTO products (id, name, price, description, highlights) VALUES 
(409, 'Steam Deck OLED 512GB', 6890, 'Hela ditt Steam-bibliotek direkt i dina händer.', '7.4" OLED;90Hz;Bra batteritid;SteamOS'),
(410, 'ASUS ROG Ally Z1 Extreme', 7990, 'Extremt kraftfull handhållen PC med Windows 11.', 'Full HD 120Hz;Z1 Extreme chip;Windows 11;RGB-ljus'),
(411, 'Lenovo Legion Go', 8490, 'Handhållen gaming med massiv skärm och löstagbara kontroller.', '8.8" QHD skärm;Löstagbara kontroller;16GB RAM;Kickstand'),
(412, 'Analogue Pocket Black', 3490, 'Premium-konsol som spelar alla dina gamla Gameboy-kassetter.', 'Multi-format;Hög upplösning;FPGA-teknik;Retro-lyx'),
(413, 'Sega Mega Drive Mini 2', 1290, 'Klassisk konsol i miniformat med 60 förinstallerade spel.', '60 spel;HDMI-utgång;2 kontroller inkl.;Retro');

-- 5. Koppla alla 14 nya konsoler till Kategori 5 (Konsoler)
INSERT INTO product_categories (product_id, category_id) 
SELECT id, 5 FROM products WHERE id BETWEEN 400 AND 413;

-- 6. Lägg till 3 bilder per konsol
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Front' FROM products WHERE id BETWEEN 400 AND 413;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Box' FROM products WHERE id BETWEEN 400 AND 413;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Side' FROM products WHERE id BETWEEN 400 AND 413;


-- ==========================================================
-- TILLÄGG: SPEL & MEDIA (ID 500-529) -> KATEGORI 6
-- ==========================================================

-- 1. PLAYSTATION 5 SPEL - ID 500-509
INSERT INTO products (id, name, price, description, highlights) VALUES 
(500, 'Marvels Spider-Man 2', 749, 'Svinga dig genom New York som både Peter Parker och Miles Morales.', 'PS5 Exklusivt;Open World;Action;Svensk text'),
(501, 'God of War Ragnarök', 699, 'Följ Kratos och Atreus på en mytisk resa genom de nio rrikena.', 'PS5;Action-äventyr;Fantastisk grafik;Epos'),
(502, 'Gran Turismo 7', 649, 'Den ultimata racingsimulatorn med över 400 bilar.', 'Realistisk körning;4K;Ray Tracing;Samlarutgåva'),
(503, 'The Last of Us Part II Remastered', 549, 'Upplev det prisbelönta spelet med förbättrad grafik för PS5.', 'Story-driven;Action;Survival;4K-stöd'),
(504, 'Horizon Forbidden West', 599, 'Utforska en avlägsen framtid där maskiner styr jorden.', 'Action-RPG;Open World;Vacker grafik;PS5'),
(505, 'Ratchet & Clank: Rift Apart', 499, 'Hoppa mellan dimensioner i detta färgstarka äventyr.', 'Snabba laddningstider;Action;Familjevänligt;Pixar-kvalitet'),
(506, 'Final Fantasy VII Rebirth', 799, 'Den episka fortsättningen på FF7-remake projektet.', 'RPG;Stort äventyr;PS5 Exklusivt;Lång speltid'),
(507, 'Demon’s Souls', 449, 'Utmana dig själv i denna legendariska remake av klassikern.', 'Hardcore RPG;Mörk atmosfär;Extrem grafik;PS5'),
(508, 'Ghost of Tsushima Director’s Cut', 649, 'Bli en samuraj och befria ön Tsushima från invasionen.', 'Samuraj-action;Vacker öppen värld;Inkl. DLC;PS5'),
(509, 'Helldivers 2', 449, 'Kämpa för frihet i detta galna lagbaserade skjutspel.', 'Multiplayer;Action;Kaos;Samarbete');

-- 2. XBOX SERIES SPEL - ID 510-519
INSERT INTO products (id, name, price, description, highlights) VALUES 
(510, 'Halo Infinite', 599, 'Master Chief återvänder för att rädda mänskligheten en sista gång.', 'Action;FPS;Open World;Xbox Exklusivt'),
(511, 'Forza Horizon 5', 649, 'Utforska Mexikos vackra landskap i världens bästa racingspel.', 'Racing;Open World;Hundratals bilar;Fantastisk grafik'),
(512, 'Starfield', 749, 'Ett episkt rollspel från skaparna av Skyrim, nu i rymden.', 'RPG;Rymdäventyr;Stor öppen värld;Xbox/PC'),
(513, 'Gears 5', 299, 'Intensiv action och en gripande story i Gears-universumet.', 'Action;Tredjepersonsskjutare;Co-op;Xbox'),
(514, 'Sea of Thieves', 399, 'Bli en pirat och segla på de sju haven med dina vänner.', 'Multiplayer;Pirat-äventyr;Open World;Samarbete'),
(515, 'Microsoft Flight Simulator', 699, 'Flyg över hela världen i otrolig detaljrikedom.', 'Simulator;Hela jorden;Realistiskt;Avslappnande'),
(516, 'Senua’s Saga: Hellblade II', 549, 'En mörk och personlig resa genom vikingatidens myter.', 'Atmosfäriskt;Action;Psykologiskt;Xbox'),
(517, 'State of Decay 2', 249, 'Överlev zombie-apokalypsen genom att bygga din egen bas.', 'Zombies;Överlevnad;Strategi;Co-op'),
(518, 'Fable Anniversary', 349, 'Klassikern som startade allt, nu optimerad för moderna konsoler.', 'RPG;Fantasy;Humor;Klassiker'),
(519, 'Psychonauts 2', 449, 'Ett fantasifullt plattformsäventyr i hjärnans värld.', 'Plattform;Äventyr;Unik design;Xbox');

-- 3. NINTENDO SWITCH SPEL - ID 520-529
INSERT INTO products (id, name, price, description, highlights) VALUES 
(520, 'The Legend of Zelda: Tears of the Kingdom', 649, 'Upptäck Hyrules hemligheter både på marken och i skyn.', 'Äventyr;Open World;Nintendo Exklusivt;Årets spel'),
(521, 'Mario Kart 8 Deluxe', 499, 'Det ultimata racingspelet för vänner och familj.', 'Racing;Multiplayer;Alla åldrar;Klassiker'),
(522, 'Super Mario Odyssey', 549, 'Följ med Mario på ett globalt äventyr för att rädda Peach.', 'Plattform;Äventyr;Kreativt;Nintendo'),
(523, 'Pokémon Scarlet/Violet', 549, 'Fånga och träna Pokémon i en helt öppen värld.', 'RPG;Pokémon;Open World;Trådlös handel'),
(524, 'Animal Crossing: New Horizons', 499, 'Skapa ditt eget paradis på en öde ö.', 'Simulering;Avslappnande;Kreativt;Alla åldrar'),
(525, 'Super Smash Bros. Ultimate', 599, 'Alla tiders största fightingspel med alla dina favoriter.', 'Fighting;Multiplayer;Över 70 karaktärer;Kaos'),
(526, 'Splatoon 3', 499, 'Färglägg världen i detta unika och snabba skjutspel.', 'Action;Multiplayer;Färgglatt;Nintendo'),
(527, 'Luigis Mansion 3', 549, 'Hjälp Luigi att rädda sina vänner i ett spöklikt hotell.', 'Äventyr;Pussel;Roligt;Familjevänligt'),
(528, 'Metroid Dread', 449, 'Klassisk 2D-action med Samus Aran i toppform.', 'Action;Plattform;Utmanande;Atmosfäriskt'),
(529, 'Mario Party Superstars', 499, 'Den ultimata festen med klassiska spelplaner och minispel.', 'Partyspel;Multiplayer;Familj;Roligt');

-- 4. Koppla alla 30 spel till Kategori 6 (Spel)
INSERT INTO product_categories (product_id, category_id) 
SELECT id, 6 FROM products WHERE id BETWEEN 500 AND 529;

-- 5. Lägg till 3 bilder per spel
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Cover' FROM products WHERE id BETWEEN 500 AND 529;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Back' FROM products WHERE id BETWEEN 500 AND 529;
INSERT INTO product_images (product_id, image_url)
SELECT id, 'https://placehold.co/600x400?text=' || REPLACE(name, ' ', '+') || '+Screenshot' FROM products WHERE id BETWEEN 500 AND 529;