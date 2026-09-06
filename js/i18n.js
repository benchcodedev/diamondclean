/**
 * DIAMOND CLEAN - Internationalization (i18n) Engine
 * Comprehensive site-wide bilingual engine:
 * - English header is locked in English for BOTH ID and EN languages as requested
 * - Full English translation for Home and all sub-pages when EN is selected
 * - Flawless restoration of Indonesian content when ID is selected
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'diamond_lang';
  const DEFAULT_LANG = 'id';

  // --------------------------------------------------------------------------
  // 1. SPECIFIC DATA-I18N KEYS (Navbar & Dynamic Component Strings)
  // --------------------------------------------------------------------------
  const translations = {
    // BAHASA INDONESIA
    id: {
      // Header Navigation - REMAINS IN ENGLISH PER USER REQUEST
      nav_home: 'Home',
      nav_about: 'About Us',
      nav_solutions: 'Product Catalogue',
      nav_industries: 'HOREKA',
      nav_sustainability: 'Certifications',
      nav_contact: 'Contact Us',
      nav_consultation: 'Consultation',

      // Hero Section (Home)
      hero_badge: 'SUPPLIER RESMI SABUN CHEMICAL B2B & 5L',
      hero_title_prefix: 'Solusi Kebersihan HOREKA & ',
      hero_title_highlight: 'Supplier Sabun 5L',
      hero_desc: 'Diamond Clean menghadirkan pasokan konsentrat sabun dan chemical pembersih bermutu tinggi dengan kemasan 5L hemat biaya untuk Hotel, Restoran, Café, Laundry, Car Wash, dan Fasilitas Komersial di seluruh Indonesia.',
      hero_cta_consult: 'Minta Konsultasi & Sampel',
      hero_cta_catalog: 'Jelajahi Produk 5L',

      // Video Section (Home)
      video_badge: 'SHOWCASE VIDEO RESMI',
      video_title: 'Profil Operasional & Kinerja Diamond Clean',
      video_desc: 'Saksikan bagaimana standar pengemasan 5L, efisiensi formulasi konsentrat, serta komitmen mutu kebersihan higienis kami diproduksi untuk mendukung kelancaran usaha Anda.',
      video_tab_1: '1. Profil & Kemasan 5L',
      video_tab_2: '2. Uji Kinerja & Busa Pembersih',
      video_tab_3: '3. Standar Higienitas Halal',
      video_chapter_1_title: 'Diamond Clean — Profil Pasokan Chemical & Kemasan 5L Industri',
      video_chapter_1_desc: 'Saksikan komitmen kami dalam menghadirkan formulasi konsentrat pembersih berdaya bersih tinggi dengan kemasan 5L hemat biaya bagi mitra usaha.',
      video_chapter_1_badge: 'PRODUKSI & SUPPLY 5L',
      video_chapter_2_title: 'Uji Kinerja Formulasi: Busa Melimpah & Daya Angkat Minyak Seketika',
      video_chapter_2_desc: 'Demonstrasi daya angkat lemak pada sabun cuci piring dan performa busa salju shampo mobil yang efektif namun tetap aman dengan pH balance seimbang.',
      video_chapter_2_badge: 'UJI LABORATORIUM & KINERJA',
      video_chapter_3_title: 'Standar Mutu Higienis & Kepatuhan Sertifikasi Halal Indonesia',
      video_chapter_3_desc: 'Seluruh lini formulasi sabun Diamond Clean diproduksi bebas dari bahan najis dan alkohol berbahaya, menjamin keamanan mutlak untuk hotel, resto, dan café Anda.',
      video_chapter_3_badge: '100% HALAL INDONESIA'
    },

    // ENGLISH
    en: {
      // Header Navigation - EXACT SAME ENGLISH
      nav_home: 'Home',
      nav_about: 'About Us',
      nav_solutions: 'Product Catalogue',
      nav_industries: 'HOREKA',
      nav_sustainability: 'Certifications',
      nav_contact: 'Contact Us',
      nav_consultation: 'Consultation',

      // Hero Section (Home)
      hero_badge: 'AUTHORIZED 5L B2B CHEMICAL SOAP SUPPLIER',
      hero_title_prefix: 'HOREKA Cleaning Solutions & ',
      hero_title_highlight: '5L Bulk Soap Supplier',
      hero_desc: 'Diamond Clean provides high-concentrate cleaning chemical and bulk soap solutions in economical 5L cans for Hotels, Restaurants, Cafés, Laundries, Car Washes, and Commercial Facilities across Indonesia.',
      hero_cta_consult: 'Request Consultation & Samples',
      hero_cta_catalog: 'Explore 5L Products',

      // Video Section (Home)
      video_badge: 'OFFICIAL VIDEO SHOWCASE',
      video_title: 'Diamond Clean Operational Profile & Performance',
      video_desc: 'Discover how our 5L packaging standards, concentrate efficiency, and hygienic quality commitments are engineered to support your business.',
      video_tab_1: '1. Profile & 5L Packaging',
      video_tab_2: '2. Performance & Foam Testing',
      video_tab_3: '3. Halal Hygiene Standards',
      video_chapter_1_title: 'Diamond Clean — Industrial Chemical Supply & 5L Packaging Profile',
      video_chapter_1_desc: 'Witness our dedication to providing high-potency cleaning formulas in cost-saving 5L containers for business partners.',
      video_chapter_1_badge: '5L PRODUCTION & SUPPLY',
      video_chapter_2_title: 'Formula Performance Test: Rich Foam & Instant Grease Cutting',
      video_chapter_2_desc: 'Demonstrating instant grease-cutting dishwashing action and thick snow foam car shampoo that is gentle and pH-balanced.',
      video_chapter_2_badge: 'LAB TESTING & PERFORMANCE',
      video_chapter_3_title: 'Hygienic Standards & Official Halal Indonesia Compliance',
      video_chapter_3_desc: 'All Diamond Clean product formulations are certified free from najis and prohibited alcohol, ensuring complete safety for your establishments.',
      video_chapter_3_badge: '100% HALAL INDONESIA'
    }
  };

  // --------------------------------------------------------------------------
  // 2. COMPREHENSIVE PHRASE DICTIONARY (ID -> EN) FOR DOM TREEWALKER
  // --------------------------------------------------------------------------
  const PHRASE_DICTIONARY = {
    // Breadcrumbs
    'Beranda': 'Home',
    'Tentang Kami': 'About Us',
    'Katalog Produk': 'Product Catalogue',
    'Sektor Industri': 'Industry Sectors',
    'Mutu & Halal': 'Quality & Halal',
    'Kontak Kami': 'Contact Us',

    // Hero / Banners
    'Diamond Clean menghadirkan pasokan konsentrat sabun dan chemical pembersih bermutu tinggi dengan kemasan 5L hemat biaya untuk Hotel, Restoran, Café, Laundry, Car Wash, dan Fasilitas Komersial di seluruh Indonesia.':
      'Diamond Clean provides high-concentrate cleaning chemical and bulk soap solutions in economical 5L cans for Hotels, Restaurants, Cafés, Laundries, Car Washes, and Commercial Facilities across Indonesia.',
    'Diamond Clean — Profil Pasokan Chemical & Kemasan 5L Industri':
      'Diamond Clean — Industrial Chemical Supply & 5L Packaging Profile',
    'Saksikan komitmen kami dalam menghadirkan formulasi konsentrat pembersih berdaya bersih tinggi dengan kemasan 5L hemat biaya bagi mitra usaha.':
      'Witness our dedication to providing high-potency cleaning formulas in cost-saving 5L containers for business partners.',
    'SUPPLIER RESMI SABUN CHEMICAL B2B & 5L': 'AUTHORIZED 5L B2B CHEMICAL SOAP SUPPLIER',
    'SUPPLIER SABUN 5L LANGSUNG PABRIK': 'FACTORY-DIRECT 5L BULK SOAP SUPPLIER',
    'Solusi Kebersihan HOREKA &': 'HOREKA Cleaning Solutions &',
    'Supplier Sabun 5L': '5L Bulk Soap Supplier',
    'Minta Konsultasi & Sampel': 'Request Consultation & Samples',
    'Jelajahi Produk 5L': 'Explore 5L Products',
    'SPESIFIKASI & PANDUAN PENGENCERAN': 'SPECIFICATIONS & DILUTION GUIDE',
    'Solusi Chemical & Sabun 5L': '5L Chemical & Bulk Soap Solutions',
    'Rangkaian lengkap 8 lini produk sabun industri dan chemical pembersih konsentrat tinggi dalam kemasan 5L hemat biaya dan berstandar Halal resmi.':
      'A complete 8-product lineup of industrial soaps and high-concentrate cleaning chemicals in cost-saving 5L packaging, officially Halal certified.',
    'TARGET PASAR KOMERSIAL': 'COMMERCIAL SECTORS',
    'Solusi Kebersihan Lintas Sektor': 'Cross-Sector Cleaning Solutions',
    'Formulasi khusus yang disesuaikan dengan standar operasional berat, intensitas pemakaian, dan karakteristik kebersihan pada masing-masing sektor industri.':
      'Tailored chemical formulations engineered for heavy-duty operational standards, high-frequency usage, and sector-specific hygiene requirements.',
    'INTEGRITAS & KEPATUHAN': 'INTEGRITY & COMPLIANCE',
    'Standar Mutu & Sertifikasi Halal': 'Quality Standards & Halal Certification',
    'Komitmen kami terhadap kemurnian bahan baku, kepatuhan syariat halal resmi, keselamatan kontak makanan, dan kelestarian ekosistem lingkungan.':
      'Our commitment to ingredient purity, official halal compliance, food-contact safety, and ecological sustainability.',
    'LAYANAN KONSULTASI B2B': 'B2B CONSULTATION DESK',
    'Hubungi Tim Diamond Clean': 'Contact the Diamond Clean Team',
    'Siap melayani kebutuhan pasokan rutin 5L untuk Hotel, Restoran, Café, Laundry, dan Car Wash dengan respon cepat dan harga tangan pertama.':
      'Ready to fulfill regular 5L supply needs for Hotels, Restaurants, Cafés, Laundries, and Car Washes with fast response and factory-direct pricing.',
    'PROFIL PERUSAHAAN': 'COMPANY PROFILE',
    'Keahlian & Komitmen Kebersihan Industri': 'Industrial Hygiene Expertise & Commitment',
    'Mengenal lebih dekat Diamond Clean — mitra terpercaya penyedia chemical pembersih dan sabun konsentrat berkualitas tinggi untuk pertumbuhan operasional bisnis Anda.':
      'Get to know Diamond Clean — your trusted partner in high-concentrate cleaning chemicals and soap formulations engineered for business growth.',

    // Video Section
    'SHOWCASE VIDEO RESMI': 'OFFICIAL VIDEO SHOWCASE',
    'Profil Operasional & Kinerja Diamond Clean': 'Diamond Clean Operational Profile & Performance',
    'Saksikan bagaimana standar pengemasan 5L, efisiensi formulasi konsentrat, serta komitmen mutu kebersihan higienis kami diproduksi untuk mendukung kelancaran usaha Anda.':
      'Discover how our 5L packaging standards, concentrate efficiency, and hygienic quality commitments are engineered to support your business.',
    'PRODUKSI & SUPPLY 5L': '5L PRODUCTION & SUPPLY',
    'KEMASAN 5L': '5L PACKAGING',
    '1. Profil & Kemasan 5L': '1. Profile & 5L Packaging',
    '2. Uji Kinerja & Busa Pembersih': '2. Performance & Foam Testing',
    '3. Standar Higienitas Halal': '3. Halal Hygiene Standards',

    // Value Pillars (Why Choose Us)
    'KEUNGGULAN UTAMA': 'KEY VALUE PILLARS',
    'Mengapa Mitra B2B Memilih Diamond Clean?': 'Why Do B2B Partners Choose Diamond Clean?',
    'Kami memahami bahwa efisiensi biaya, konsistensi daya bersih, dan keamanan staf operasional adalah prioritas utama setiap bisnis.':
      'We understand that operational cost efficiency, consistent cleaning performance, and staff safety are the top priorities of every business.',
    'Formula Konsentrat Tinggi': 'High-Concentrate Formula',
    'Dosis pemakaian jauh lebih sedikit dibandingkan sabun retail. Dapat diencerkan sesuai rasio kebutuhan dapur, laundry, maupun car wash tanpa mengurangi daya bersih.':
      'Requires significantly smaller dosage than retail consumer soaps. Can be diluted per operational requirements without losing cleaning strength.',
    'Kemasan 5L B2B': 'Industrial 5L Cans',
    'Format kemasan standar industri yang ergonomis, kokoh, dan anti-bocor. Mempermudah penyimpanan stok gudang dan perhitungan pemakaian harian operasional.':
      'Ergonomic, sturdy, leak-proof industrial format. Simplifies warehouse storage and daily operational consumption tracking.',
    'Pasokan Stabil & Cepat': 'Fast & Dependable Supply',
    'Kapasitas pasokan terencana dengan opsi jadwal pengiriman rutin mingguan atau bulanan, memastikan operasional hotel atau restoran Anda bebas dari risiko kehabisan stok.':
      'Engineered supply capacity with weekly or monthly scheduled deliveries, ensuring your facilities never face inventory shortages.',
    '100% Halal & Aman': '100% Halal & Safe',
    'Telah bersertifikat Halal Indonesia resmi. Formulasi ramah lingkungan, surfaktan biodegradable, pH netral yang ramah di tangan, serta bebas dari bahan kimia berbahaya.':
      'Officially certified Halal Indonesia. Eco-friendly biodegradable surfactants, skin-friendly neutral pH, and zero hazardous caustic chemicals.',

    // Advantage Banner
    'KEUNGGULAN DIAMOND CLEAN 5L': 'DIAMOND CLEAN 5L ADVANTAGE',
    'Solusi Pasokan Tangan Pertama': 'Factory-Direct Supply Solutions',
    'Dengan bermitra bersama Diamond Clean, usaha Anda mendapatkan skema harga supplier langsung dengan mutu formula stabil standar. Efisiensi biaya maksimal tanpa kompromi pada daya bersih.':
      'By partnering with Diamond Clean, your business secures direct manufacturer pricing with consistent high-standard formulations. Maximum cost efficiency without compromising cleaning power.',
    'Konsultasi Penghematan Usaha': 'Consult Facility Savings',
    'Sampel Gratis B2B': 'Free B2B Samples',
    'Faktur Pajak Resmi': 'Official Tax Invoice',
    'Pengiriman Terjadwal': 'Scheduled Delivery',
    'Hemat Biaya hingga 35%': 'Save Up to 35% on Chemical Costs',
    'Konsentrat tinggi dapat diencerkan 1:5 s/d 1:20 sesuai kebutuhan dapur horeka, laundry, dan car wash Anda.':
      'High concentrates can be diluted 1:5 to 1:20 to meet specific demands for kitchens, laundries, and auto bays.',
    'Jaminan Pasokan Prioritas': 'Priority Supply Guarantee',
    'Pengiriman terjadwal dan siap kirim ke lokasi usaha Anda, bebas dari kendala kehabisan stok saat jam sibuk.':
      'Scheduled deliveries ready to reach your doorstep, ensuring zero risk of running out of soap during peak hours.',
    'Faktur Resmi & Konsultasi': 'Official Invoicing & Consultation',
    'Dukungan sampel produk uji coba gratis bagi mitra B2B baru dengan fasilitas termin pembayaran tempo.':
      'Complimentary trial sample support for new corporate partners with flexible credit invoicing options.',

    // Product Section Headings
    'KATALOG PRODUK 5L': '5L PRODUCT CATALOGUE',
    '8 Lini Produk Pembersih Diamond Clean': '8 Diamond Clean Cleaning Product Lines',
    'Formula khusus berdaya bersih maksimal, higienis, beraroma mewah tahan lama, dan terbukti efektif untuk kebutuhan operasional berat.':
      'Specialized formulas delivering maximum cleaning power, hygienic standards, long-lasting luxury fragrances, and proven heavy-duty efficiency.',
    'Buka Spesifikasi Lengkap & Tabel Pengenceran': 'View Full Specifications & Dilution Table',

    // Product 1: Sabun Cuci Piring
    'Sabun Cuci Piring': 'Dishwashing Liquid',
    'Formula konsentrat ekstrak jeruk nipis segar dengan daya potong lemak seketika, hilangkan bau amis, perkakas dapur bersih kinclong & kesat.':
      'Concentrated fresh lime extract formula with instant grease cutting power, neutralizes fishy odor, leaving kitchenware sparkling clean & squeaky clean.',
    '🍋 Extra Jeruk Nipis Segar': '🍋 Fresh Lime Extract',
    'Extra Jeruk Nipis Segar': 'Fresh Lime Extract',
    'Busa Melimpah & Kesat': 'Rich Suds & Squeaky Clean',
    '5L & Pail 20L': '5L Cans & 20L Pails',

    // Product 2: Sabun Cuci Tangan
    'Sabun Cuci Tangan': 'Antibacterial Hand Soap',
    'Hand soap antibakteri 99.9% dengan busa melimpah & lembut di kulit. Geser foto untuk melihat varian Strawberry dan Peppermint / Mint.':
      '99.9% antibacterial hand soap with rich lather & skin moisturizers. Slide photo to view Strawberry and Peppermint / Mint variants.',
    '🍓 Strawberry': '🍓 Strawberry',
    '🍃 Peppermint': '🍃 Peppermint',
    'Extra Strawberry Segar': 'Fresh Strawberry Extract',
    'Extra Peppermint / Mint Segar & Dingin': 'Cool & Refreshing Peppermint / Mint',
    '99.9% Bunuh Kuman': '99.9% Germ Protection',

    // Product 3: Sabun Lantai
    'Sabun Lantai Extra Apel': 'Floor Cleaner - Fresh Apple',
    'Sabun Lantai Extra Daun Sereh': 'Floor Cleaner - Lemongrass',
    'Sabun Lantai (Apel & Daun Sereh)': 'Floor Cleaner (Apple & Lemongrass)',
    'Pembersih lantai aroma Extra Buah Apel segar tahan lama. Efektif membunuh 99.9% kuman & bakteri, hilangkan noda membandel, lantai kinclong tidak lengket.':
      'Floor cleaner with long-lasting fresh apple scent. Effectively eliminates 99.9% of germs & bacteria, removes tough stains, leaves floors sparkling & non-sticky.',
    'Aroma Daun Sereh / Lemongrass segar & alami tahan lama. 99.9% membunuh kuman & bakteri, bersihkan lantai sampai kinclong, busa mudah bilas tidak lengket.':
      'Natural fresh lemongrass scent. Kills 99.9% of germs & bacteria, cleans floors to a streak-free shine, easy-rinse foam, completely non-sticky.',
    '🍏 Extra Apel': '🍏 Fresh Apple',
    '🌿 Extra Daun Sereh': '🌿 Lemongrass',
    'Extra Buah Apel Segar': 'Crisp Fresh Apple',
    'Extra Daun Sereh / Lemongrass': 'Fresh Lemongrass Extract',
    '99.9% Bunuh Kuman & Bakteri': '99.9% Kills Germs & Bacteria',
    '5L (Halal MUI)': '5L (Halal Certified)',

    // Product 4: Pembersih Kaca & Meja
    'Pembersih Kaca & Meja': 'Glass & Surface Cleaner',
    'Pembersih Kaca dan Meja': 'Glass & Surface Cleaner',
    'Cairan pembersih kaca, meja & stainless steel Extra Buah Apel. Formula streak-free kilap seketika tanpa noda bercak dan anti debu.':
      'Fresh Apple glass, table & stainless steel cleaner. Streak-free formula for instant shine without smudges or water spots, with anti-dust protection.',
    '🪟 Extra Buah Apel Segar': '🪟 Fresh Apple',
    'Kaca, Meja & Stainless': 'Glass, Tables & Stainless Steel',

    // Product 5: Cairan Pembersih Kerak
    'Cairan Pembersih Kerak': 'Heavy Duty Scale & Porcelain Cleaner',
    'Formula ekstra kuat angkat kerak membandel lebih cepat, lindungi permukaan keramik, toilet, wastafel & kamar mandi, bersih kinclong seperti baru.':
      'Extra-strength formula dissolves stubborn mineral scale and rust faster, protects ceramic surfaces, toilets, sinks & bathrooms, restoring like-new shine.',
    '✨ Ekstra Kuat Angkat Kerak': '✨ Fast Acting Scale Dissolver',
    'Ekstra Kuat Angkat Kerak': 'Extra Heavy Duty Scale Lifter',
    'Toilet, Keramik & Wastafel': 'Toilets, Ceramics & Sinks',
    '5L Netto (Halal)': '5L Net (Halal Certified)',

    // Product 6: Shampo Mobil
    'Shampo Mobil Touchless': 'Touchless Snow Foam Car Shampoo',
    'Shampo Mobil': 'Car Shampoo',
    'Formula cuci tanpa sentuh (touchless). Bersihkan kotoran, debu & lumpur cepat, pH balance lembut aman untuk cat & wax, hasil kilap mengkilap.':
      'Touchless wash formulation. Swiftly lifts traffic film, dust & mud, balanced neutral pH safe for paint & wax coats, delivering a wet-look deep gloss.',
    '🚗 Touchless Snow Foam': '🚗 Touchless Snow Foam',
    'Touchless Snow Foam': 'Touchless Snow Foam',
    'pH Balance (Aman Wax)': 'pH Balanced (Wax Safe)',

    // Product 7: Detergen Cair Laundry
    'Detergen Cair Laundry': 'Commercial Liquid Detergent',
    'Detergen Cair Laundry Dony Blue': 'Commercial Liquid Detergent - Dony Blue',
    'Formula konsentrat aroma Dony segar & mewah tahan lama. Busa melimpah mudah bilas, angkat noda efektif, rawat warna pakaian tetap cerah.':
      'Concentrated liquid detergent with long-lasting elegant Dony fragrance. Abundant lather with fast rinse, lifts stains effectively, keeps garment fibers vibrant.',
    'Aroma Dony Blue segar & mewah tahan lama. Membersihkan pakaian sampai bersih & wangi, busa melimpah & mudah bilas, rawat warna pakaian tetap cerah.':
      'Fresh and luxurious Dony Blue scent. Thoroughly cleans and deodorizes fabrics, high suds with quick rinse, preserves fabric color brilliance.',
    '🌸 Dony Classic': '🌸 Dony Classic',
    '💙 Dony Blue': '💙 Dony Blue',
    'Dony Segar & Mewah': 'Fresh & Luxurious Dony',
    'Dony Blue Segar & Mewah': 'Fresh & Luxurious Dony Blue',
    'Bersih Wangi & Warna Cerah': 'Deep Clean & Bright Color Care',
    'Busa Melimpah & Lembut Kain': 'Rich Foam & Fabric Soft',

    // Product 8: Parfum Laundry
    'Parfum Laundry Premium': 'Premium Laundry Perfume',
    'Parfum Laundry': 'Laundry Perfume',
    'Pewangi pakaian bibit wangi grade A. Tahan berminggu-minggu tanpa noda kuning di serat sprei/pakaian. Varian: Dony, Sakura, Snappy & Custom.':
      'Grade-A apparel perfume essence. Lasts for weeks without yellow stains on linens or garments. Scents: Dony, Sakura, Snappy & Custom.',
    '💐 Dony, Sakura & Snappy': '💐 Dony, Sakura & Snappy',
    'Dony, Sakura, Snappy': 'Dony, Sakura, Snappy',
    'Hingga 14 - 21 Hari': 'Up to 14 - 21 Days',

    // Common Spec Labels & Actions
    'Aroma:': 'Scent:',
    'Karakter:': 'Character:',
    'Kemasan:': 'Packaging:',
    'Proteksi:': 'Protection:',
    'Aplikasi:': 'Application:',
    'Formula:': 'Formula:',
    'Tipe Busa:': 'Foam Type:',
    'Varian Aroma:': 'Scent Options:',
    'Ketahanan:': 'Longevity:',
    'Buka Brosur': 'View Brochure',
    'Pesan via WhatsApp': 'Order via WhatsApp',
    'Pesan Sekarang': 'Order Now',

    // Workflow (How It Works)
    'ALUR KERJASAMA B2B': 'B2B SUPPLY WORKFLOW',
    'Alur Pemesanan & Pasokan Rutin': 'Ordering Process & Scheduled Supply',
    'Langkah mudah dan transparan untuk memulai pasokan chemical pembersih teratur bagi seluruh cabang usaha Anda.':
      'A clear, transparent five-step process to secure dependable cleaning chemical supplies for all your business branches.',
    'Konsultasi & Sample': 'Consultation & Sample',
    'Diskusikan kebutuhan operasional usaha Anda dan dapatkan sampel produk uji coba gratis.':
      'Discuss your facility\'s operational demands and receive free product trial samples.',
    'Penawaran Harga': 'Wholesale Quotation',
    'Menerima skema harga grosir B2B khusus dengan kalkulasi hemat volume pemakaian.':
      'Receive tailored B2B wholesale pricing with calculated operational volume savings.',
    'Quality Control': 'Quality Control',
    'Produk disiapkan dan disegel aman dalam kemasan 5L berkualitas food-grade/high impact.':
      'Formulations prepared and securely sealed in heavy-duty 5L industrial containers.',
    'Distribusi Tepat Waktu': 'On-Time Distribution',
    'Pengiriman langsung ke lokasi dapur, laundry, atau workshop Anda sesuai jadwal.':
      'Direct delivery straight to your kitchen, laundry room, or workshop on schedule.',
    'Layanan Purna Jual': 'After-Sales Support',
    'Monitoring kepuasan, dukungan teknis takaran pemakaian, dan sistem auto-reorder.':
      'Customer satisfaction follow-up, technical dosage guidance, and recurring auto-reorder setup.',

    // Target Industries Section
    'SEKTOR BISNIS': 'BUSINESS SECTORS',
    'Melayani Seluruh Sektor Industri Kebersihan': 'Serving All Commercial Cleaning Sectors',
    'Dari perhotelan bintang hingga jaringan car wash modern, produk Diamond Clean diformulasikan sesuai standar tiap sektor.':
      'From star-rated hospitality to modern car wash centers, Diamond Clean formulations adhere to each sector\'s strict operational demands.',
    'HOSPITALITY': 'HOSPITALITY',
    'Hotel & Resort': 'Hotel & Resort',
    'Sanitasi kamar mandi tamu, housekeeping lantai lobby, pembersih kaca cermin, dan sabun cuci tangan higienis.':
      'Guest bathroom sanitation, lobby floor housekeeping, streak-free mirror cleaners, and hygienic hand soaps.',
    'Pembersih Lantai': 'Floor Cleaner',
    'Pembersih Kaca': 'Glass Cleaner',
    'Hand Soap': 'Hand Soap',
    'FOOD & BEVERAGE': 'FOOD & BEVERAGE',
    'Restoran & Rumah Makan': 'Restaurant & Dining',
    'Penghancur minyak piring saji, sanitasi meja makan tamu, pembersih lantai dapur berminyak, dan kebersihan kitchen area.':
      'Instant grease-cutting for dining dishware, table sanitation, degreasing kitchen floors, and food preparation hygiene.',
    'Sabun Cuci Piring 5L': '5L Dishwashing Liquid',
    'Pembersih Meja': 'Table Cleaner',
    'Hand Wash': 'Hand Wash',
    'MODERN CAFÉ': 'MODERN CAFÉ',
    'Café & Coffee Shop': 'Café & Coffee Shop',
    'Pembersih mesin kopi & blender bebas bau amis susu, pembersih kaca etalase bakery, dan hand soap beraroma estetik.':
      'Coffee machine & blender cleaning without milk odor, bakery display case cleaners, and aesthetic scented hand soaps.',
    'Dishwashing': 'Dishwashing',
    'Streak-Free Glass': 'Streak-Free Glass',
    'Floor Floral': 'Floor Cleaner',
    'COMMERCIAL LAUNDRY': 'COMMERCIAL LAUNDRY',
    'Laundry Kiloan & Komersial': 'Commercial & Retail Laundry',
    'Detergen konsentrat cair ramah mesin, penghilang noda kerah dan minyak, serta parfum laundry tahan berhari-hari.':
      'Machine-friendly liquid detergent concentrates, collar stain and grease removers, and long-lasting fabric perfumes.',
    'Detergen Low Suds': 'Low Suds Detergent',
    'Parfum Grade A': 'Grade-A Perfume',
    'AUTOMOTIVE CARE': 'AUTOMOTIVE CARE',
    'Car Wash & Auto Detailing': 'Car Wash & Auto Detailing',
    'Shampo salju berbusa tebal, mengangkat polusi debu dan lumpur dengan pH netral yang melindungi kilau coating cat.':
      'Thick snow foam car shampoo, removes dust and grime with a paint-safe neutral pH protecting wax and coating.',
    'Shampo Salju 5L': '5L Snow Shampoo',
    'Glass Cleaner': 'Glass Cleaner',
    'FACILITY CARE': 'FACILITY CARE',
    'Pabrik, Kantor & Fasilitas': 'Offices, Factories & Facilities',
    'Perawatan koridor publik, sanitasi toilet karyawan bertrafik tinggi, dan suplai hand soap wastafel berkala.':
      'Public corridor care, high-traffic employee restroom sanitation, and scheduled hand soap refill supplies.',
    'Hand Soap 5L': '5L Hand Soap',

    // Halal Section (Home & Sustainability)
    'KEAMANAN & KEPATUHAN': 'SAFETY & COMPLIANCE',
    'Jaminan Mutu & Sertifikasi Halal Indonesia Resmi': 'Quality Assurance & Official Halal Indonesia Certification',
    'Diamond Clean menjamin seluruh formula diproduksi di fasilitas higienis bebas dari bahan najis, bebas alkohol terlarang, dan memenuhi standar keamanan kontak makanan untuk restoran serta hotel.':
      'Diamond Clean ensures every formula is manufactured in hygienic facilities free from impurities and prohibited alcohol, meeting food-contact safety standards for restaurants and hotels.',
    '100% Halal Certified': '100% Halal Certified',
    'Sertifikasi resmi Halal Indonesia untuk rasa aman mitra F&B dan hotel syariah.':
      'Official Halal Indonesia certification providing peace of mind for F&B partners and sharia hotels.',
    'Surfaktan Biodegradable': 'Biodegradable Surfactants',
    'Limbah cuci mudah terurai di saluran pembuangan dan ramah lingkungan hidup.':
      'Wash effluent breaks down readily in drainage systems, protecting the natural environment.',
    'Pelajari Standar Mutu Kami': 'Explore Our Quality Standards',
    'Sertifikasi Halal Resmi': 'Official Halal Certification',
    'Terdaftar dan diakui secara nasional. Menjamin kemurnian bahan baku serta integritas proses produksi chemical kebersihan.':
      'Nationally registered and verified. Safeguarding raw material purity and the integrity of cleaning chemical production.',
    '100% RESMI TERDAFTAR': '100% OFFICIALLY CERTIFIED',
    'Integritas Sertifikasi Halal Indonesia': 'Halal Indonesia Certification Integrity',
    'Dalam industri kuliner, restoran, katering, dan perhotelan, kehalalan bukan sekadar bahan makanan yang diolah, tetapi juga mencakup seluruh media dan zat pembersih yang bersentuhan langsung dengan wadah sajian.':
      'In hospitality, catering, and culinary sectors, halal standards extend beyond raw food ingredients to encompass every cleaning substance contacting cooking and serving ware.',
    'Diamond Clean menjamin seluruh formulasi sabun cuci piring, pembersih meja, hand soap, hingga detergen pakaian diproduksi secara halal:':
      'Diamond Clean guarantees that all dish soaps, table sanitizers, hand soaps, and laundry detergents are produced under strict halal protocols:',
    'Bebas Bahan Najis:': 'Free from Impurities (Najis):',
    'Tidak mengandung turunan hewani non-halal atau lemak babi dalam agen surfaktan.':
      'Zero non-halal animal derivatives or lard in any surfactant agents.',
    'Bebas Alkohol Khamr Terlarang:': 'Free from Prohibited Alcohol:',
    'Pelarut parfum laundry menggunakan grade kosmetik aman tanpa bahan memabukkan.':
      'Laundry perfume solvents utilize safe cosmetic-grade carriers without intoxicants.',
    'Higienitas Fasilitas Produksi:': 'Hygienic Production Facility:',
    'Ruang pencampuran dan kemasan 5L baru yang disterilisasi sebelum pengisian.':
      'Cleanroom mixing tanks and brand-new sterilized 5L containers before bottling.',
    'Sertifikasi Halal Indonesia Resmi': 'Official Halal Indonesia Certification',
    'Memberikan perlindungan hukum, kepastian higienitas, dan rasa tenang bagi konsumen setia resto dan hotel Anda.':
      'Provides legal assurance, verifiable hygiene, and complete peace of mind for your hotel and restaurant patrons.',
    'Minta Salinan Surat Keterangan / Dokumen': 'Request Certificate Copies / MSDS',
    'KEBERLANJUTAN LINGKUNGAN': 'ENVIRONMENTAL SUSTAINABILITY',
    'Surfaktan Biodegradable & Ramah Saluran': 'Biodegradable Surfactants & Drain-Friendly',
    'Formula kimia yang dirancang agar tidak mencemari ekosistem air dan aman bagi septic tank.':
      'Formulations engineered to safeguard aquatic ecosystems and protect septic bacterial balance.',
    'Mudah Terurai (Biodegradable)': 'Readily Biodegradable',
    'Kandungan zat aktif pembersih terurai secara alami oleh mikroorganisme tanah dan saluran air limbah tanpa meninggalkan residu racun kimia.':
      'Active surfactants break down naturally via wastewater microorganisms without toxic persistent residues.',
    'Bebas Fosfat Berlebih': 'Excess-Phosphate Free',
    'Mencegah fenomena eutrofikasi (ledakan ganggang air) di sungai sekitar area pembuangan cucian laundry dan dapur komersial.':
      'Prevents algae blooms (eutrophication) in local waterways surrounding commercial kitchens and laundry facilities.',
    'Aman bagi Septic Tank': 'Septic Tank Safe',
    'Formulasi tidak membunuh bakteri pengurai alami di dalam grease trap maupun septic tank operasional hotel atau restoran Anda.':
      'Will not disrupt beneficial decomposing bacteria inside grease traps and septic systems.',
    'Tersedia Lembar Data (MSDS)': 'Material Safety Data Sheets (MSDS)',
    'Dilengkapi Material Safety Data Sheet resmi untuk pemenuhan kelengkapan audit K3, audit ISO hotel, dan sertifikasi kebersihan industri.':
      'Accompanied by official MSDS documentation for OHS audits, ISO property standards, and industrial hygiene compliance.',

    // FAQ Section
    'PERTANYAAN UMUM': 'GENERAL QUESTIONS',
    'Frequently Asked Questions (FAQ)': 'Frequently Asked Questions (FAQ)',
    'Hal-hal yang sering ditanyakan mengenai pemesanan, sampel, dan pengiriman Diamond Clean.':
      'Common questions regarding orders, samples, and shipping from Diamond Clean.',
    'Berapa batas minimum pemesanan (MOQ) untuk kemasan 5L?':
      'What is the Minimum Order Quantity (MOQ) for 5L cans?',
    'Untuk kemitraan B2B di area jangkauan kami, minimum pemesanan mulai dari 1 kardus (isi 4 @5L) dan dapat dicampur varian produk. Untuk pengiriman luar kota atau kontrak rutin, kami menyediakan kuota pengiriman khusus dengan diskon volume grosir.':
      'For B2B partnerships in our standard coverage area, minimum orders start from just 1 box (4 x 5L cans), which can mix different product variants. For inter-city freight or routine contracts, we provide specialized bulk shipping quotas with volume wholesale discounts.',
    'Apakah usaha baru dapat meminta sampel produk gratis?':
      'Can new commercial partners request free product samples?',
    'Tentu saja! Kami menyediakan tester/sampel produk gratis bagi pengelola Hotel, Restoran, Café, Laundry, atau Car Wash yang ingin menguji langsung daya bersih formula Diamond Clean di lokasi usahanya. Hubungi tim kami via WhatsApp untuk verifikasi kebutuhan sampel Anda.':
      'Absolutely! We provide complimentary trial samples for Hotels, Restaurants, Cafés, Laundries, or Car Washes seeking to evaluate Diamond Clean\'s cleaning efficacy on-site. Contact our team via WhatsApp to verify your trial requirements.',
    'Apakah seluruh produk Diamond Clean aman untuk kulit staf operasional?':
      'Are Diamond Clean formulations safe for operational staff skin?',
    'Ya. Produk kami diformulasikan dengan pH seimbang dan bahan aktif berkualitas tinggi. Sabun cuci tangan dilengkapi moisturizer, sabun cuci piring lembut di tangan, dan sabun mobil memiliki pH netral 7.0 yang aman dari iritasi serta tidak merusak material kerja Anda.':
      'Yes. Our products are formulated with balanced pH and premium gentle active ingredients. Hand soap includes skin moisturizers, dishwashing liquid is gentle on hands, and car shampoo has a neutral 7.0 pH that avoids skin irritation while protecting work surfaces.',
    'Bagaimana cara memesan dan melakukan pembayaran?':
      'How do we place orders and handle invoicing / payments?',
    'Pemesanan dapat dilakukan langsung melalui WhatsApp Hotline resmi 0882007907237 atau mengisi formulir konsultasi di website ini. Pembayaran dapat melalui transfer bank resmi perusahaan, dan untuk mitra korporasi rutin kami menyediakan fasilitas termin penagihan (invoicing/tempo).':
      'Orders can be placed directly through our official WhatsApp Hotline at 0882007907237 or by submitting the consultation form on this website. Payments can be settled via company bank transfer, and for routine corporate partners we offer structured invoicing credit terms.',

    // Contact & Form Elements
    'HOTLINE B2B': 'B2B HOTLINE',
    'Hubungi Diamond Clean': 'Contact Diamond Clean',
    'Dapatkan penawaran harga grosir 5L langsung dari supplier resmi. Tim kami siap merespons kebutuhan usaha Anda.':
      'Get direct 5L wholesale quotes straight from the manufacturer. Our team is ready to respond to your operational needs.',
    'WhatsApp Hotline Resmi': 'Official WhatsApp Hotline',
    '0882007907237 (Fast Response)': '0882007907237 (Fast Response)',
    'Jam Layanan Pelanggan': 'Customer Service Hours',
    'Senin – Sabtu: 08.00 – 17.00 WIB': 'Monday – Saturday: 08:00 – 17:00 WIB',
    'Layanan Pasokan B2B': 'B2B Supply Desk',
    'Hotel, Resto, Café, Laundry, Car Wash, dan Komersial':
      'Hotels, Restos, Cafés, Laundries, Car Washes & Commercials',
    'Chat WhatsApp Langsung': 'Chat Directly on WhatsApp',
    'Formulir Permintaan Penawaran & Sampel': 'Quotation & Sample Request Form',
    'Isi formulir singkat di bawah ini untuk terhubung langsung dengan pesan WhatsApp terformat otomatis.':
      'Complete the brief form below to connect instantly with a pre-formatted WhatsApp inquiry.',
    'Isi formulir berikut, data Anda akan langsung diformat rapi dan terhubung ke WhatsApp customer service kami.':
      'Fill out this form; your details will be pre-formatted directly to our customer service WhatsApp.',
    'Nama Anda *': 'Your Name *',
    'Nama Lengkap *': 'Full Name *',
    'Nama Usaha / PT *': 'Business / Company Name *',
    'Nama Usaha / Hotel / Resto *': 'Company / Facility Name *',
    'Sektor Usaha *': 'Industry Sector *',
    'Kebutuhan Produk *': 'Product Needed *',
    'Estimasi Kebutuhan Bulanan': 'Estimated Monthly Volume',
    'Estimasi Kebutuhan': 'Estimated Volume',
    'Catatan Tambahan (Opsional)': 'Additional Notes (Optional)',
    'Alamat Pengiriman & Catatan': 'Delivery Address & Notes',
    'Kirim Permintaan Penawaran via WhatsApp': 'Send Quotation Request via WhatsApp',
    'Kirim via WhatsApp Sekarang': 'Submit via WhatsApp Now',
    'HOTLINE WHATSAPP': 'WHATSAPP HOTLINE',
    'Layanan Pelanggan & Pemesanan': 'Customer Support & Orders',
    'Silakan hubungi kami untuk informasi harga grosir, katalog lengkap, atau permintaan pengiriman sampel langsung ke lokasi usaha Anda.':
      'Reach out for wholesale price quotes, complete catalogues, or complimentary product sample delivery to your business premises.',
    'Nomor WhatsApp Resmi': 'Official WhatsApp Number',
    '0882007907237 (Hotline 24 Jam)': '0882007907237 (24h Hotline)',
    'Jam Operasional Kantor & Gudang': 'Office & Warehouse Working Hours',
    'Senin – Sabtu: 08.00 – 17.00 WIB (Minggu/Libur: By Appointment)':
      'Monday – Saturday: 08:00 – 17:00 WIB (Sunday/Holiday: By Appointment)',
    'Area Jangkauan Pengiriman': 'Delivery Coverage Area',
    'Melayani Pengiriman Langsung & Ekspedisi Kargo ke Seluruh Indonesia':
      'Direct Delivery & Freight Cargo Shipping Across Indonesia',
    'Hubungi via WhatsApp Instan': 'Chat via WhatsApp Instantly',

    // Select options (Industry Sectors)
    'Restoran / Café / F&B': 'Restaurant / Café / F&B',
    'Restoran / Rumah Makan / Café': 'Restaurant / Dining / Café',
    'Hotel / Penginapan': 'Hotel & Hospitality',
    'Hotel / Penginapan / Villa': 'Hotel / Hospitality / Villa',
    'Laundry Kiloan / Komersial': 'Commercial & Retail Laundry',
    'Car Wash / Cuci Mobil': 'Car Wash & Auto Detailing',
    'Car Wash / Cuci Mobil & Motor': 'Car & Motorcycle Wash',
    'Pabrik / Perkantoran': 'Manufacturing / Office Buildings',
    'Pabrik / Gedung Fasilitas': 'Manufacturing / Facility Buildings',
    'Lainnya': 'Other / Commercial Partner',

    // Select options (Products)
    'Sabun Cuci Piring 5L': '5L Dishwashing Liquid',
    'Sabun Cuci Tangan 5L': '5L Hand Soap',
    'Sabun Lantai 5L': '5L Floor Cleaner',
    'Pembersih Kaca dan Meja 5L': '5L Glass & Surface Cleaner',
    'Pembersih Kaca & Meja 5L': '5L Glass & Surface Cleaner',
    'Cairan Pembersih Kerak 5L': '5L Heavy Duty Scale Remover',
    'Shampo Mobil 5L': '5L Car Shampoo',
    'Detergen Cair Laundry 5L': '5L Liquid Laundry Detergent',
    'Parfum Laundry 5L': '5L Laundry Perfume',
    'Paket Lengkap Campuran': 'Complete Mixed Bundle',
    'Paket Campuran / Semua Produk': 'Mixed Bundle / All Products',

    // Select options (Volume)
    '1 - 5 Kemasan 5L (Uji Coba)': '1 - 5 Cans (Trial / Sample)',
    '1 - 5 Kemasan 5L (Uji Coba / Sample)': '1 - 5 Cans (Trial / Sample)',
    '1 - 5 Kemasan 5L (Sampel / Uji Coba)': '1 - 5 Cans (Trial / Sample)',
    '6 - 20 Kemasan 5L / Bulan': '6 - 20 Cans / Month',
    '21 - 50 Kemasan 5L / Bulan': '21 - 50 Cans / Month',
    '> 50 Kemasan 5L / Kontrak Rutin': '> 50 Cans / Scheduled Supply Contract',
    '> 50 Kemasan 5L / Kontrak Pengiriman Rutin': '> 50 Cans / Scheduled Supply Contract',

    // Placeholders
    'Contoh: Bpk. Hendra': 'e.g. Mr. Hendra',
    'Nama Anda': 'Your Full Name',
    'Contoh: Resto Sedap Rasa': 'e.g. Grand Emerald Hotel & Resto',
    'Nama Usaha Anda': 'Your Business Name',
    'Tuliskan permintaan tester sampel atau lokasi pengiriman...':
      'Specify sample request details or target delivery city...',
    'Tuliskan kota/alamat usaha Anda atau permintaan sampel khusus...':
      'Specify your city/facility address or custom sample requests...',

    // Table Matrix (Solutions Page)
    'STANDAR 5L': '5L STANDARD',
    'Tabel Rekomendasi Takaran & Karakteristik': 'Recommended Dosage & Characteristics Table',
    'Gunakan acuan ini untuk memaksimalkan efisiensi dan hasil pembersihan staf operasional Anda.':
      'Use this reference guide to maximize efficiency and cleaning results for your operational staff.',
    'Produk': 'Product',
    'Aplikasi Utama': 'Primary Application',
    'Rasio Pengenceran': 'Dilution Ratio',
    'pH Level': 'pH Level',
    'Karakter Busa': 'Foam Character',
    'Peralatan dapur, piring, wajan berlemak': 'Kitchen utensils, dining plates, greasy woks',
    '1 : 5 s/d 1 : 10 air bersih': '1 : 5 to 1 : 10 clean water',
    '6.5 - 7.5 (Lembut)': '6.5 - 7.5 (Gentle)',
    'Melimpah (High Foam)': 'Rich Foam (High Foam)',
    'Wastafel hotel, resto, kantor, klinik': 'Hotel sinks, restaurants, offices, clinics',
    'Siap pakai (Langsung ke dispenser)': 'Ready to use (Direct to dispenser)',
    '6.5 (Skin Friendly)': '6.5 (Skin Friendly)',
    'Busa Lembut Antibakteri': 'Antibacterial Gentle Foam',
    'Lantai keramik, granit, marmer lobby & dapur': 'Ceramic, granite, marble lobby & kitchen floors',
    '30 ml per 5L ember air': '30 ml per 5L water bucket',
    '7.0 (Netral Aman Lantai)': '7.0 (Neutral Floor Safe)',
    'Rendah Busa, Cepat Kering & Kilap': 'Low Suds, Quick Dry & Gloss',
    'Kaca etalase, cermin, meja resto & stainless steel': 'Display glass, mirrors, dining tables & stainless steel',
    'Spray langsung tanpa pengenceran': 'Direct spray without dilution',
    '7.0 (Netral)': '7.0 (Neutral)',
    'Streak-Free (Kilap Bening Tanpa Noda)': 'Streak-Free (Crystal Clear Without Smudges)',
    'Toilet, dinding keramik, wastafel & noda kerak membandel': 'Toilets, ceramic walls, sinks & stubborn mineral deposits',
    'Oles langsung / tuang & sikat merata': 'Apply directly / pour & scrub evenly',
    '2.0 - 3.0 (Asam Lembut Aktif)': '2.0 - 3.0 (Active Mild Acidic)',
    'Busa Pembersih Kerak & Kilap Seketika': 'Scale Dissolving Lather & Instant Shine',
    'Tabung snow foam / cuci manual car wash': 'Snow foam tank / manual car wash bucket',
    '1 : 20 (Manual) / 1 : 40 (Tabung Salju)': '1 : 20 (Manual) / 1 : 40 (Snow Tank)',
    '7.0 (Aman Coating)': '7.0 (Coating Safe)',
    'Salju Tebal (Snow Foam)': 'Thick Snow Foam',
    'Mesin cuci front load & top load laundry': 'Front load & top load washing machines',
    '35 - 50 ml per 7 kg pakaian': '35 - 50 ml per 7 kg laundry',
    '8.0 - 9.0 (Active Stain)': '8.0 - 9.0 (Active Stain)',
    'Rendah Busa (Low Suds)': 'Low Suds (Machine Safe)',
    'Finishing setrika pakaian & packing': 'Ironing finish & garment packaging',
    'Semprot langsung saat proses packing': 'Spray directly during packing',
    'Formula Khusus Anti Jamur': 'Special Anti-Mildew Formula',
    'Aroma Tahan 14-21 Hari': 'Scent Lasts 14-21 Days',

    // About Us Page Details
    'LATAR BELAKANG USAHA': 'OUR BACKGROUND',
    'Solusi Kebersihan Tangan Pertama untuk Sektor Komersial': 'First-Hand Cleaning Solutions for Commercial Sectors',
    'Diamond Clean': 'Diamond Clean',
    'didirikan untuk menjawab tantangan tingginya biaya pengeluaran chemical kebersihan yang dialami oleh pengusaha perhotelan, restoran, laundry, dan otomotif di Indonesia.':
      'was founded to solve the rising cleaning chemical costs faced by hotels, restaurants, laundries, and automotive businesses across Indonesia.',
    'Dengan memotong rantai distribusi perantara, Diamond Clean menyediakan formula konsentrat murni dalam kemasan 5L dan 20L langsung ke tangan pengelola usaha. Formula kami dirancang khusus agar memiliki daya angkat kotoran seketika, busa melimpah atau terkontrol sesuai peruntukannya, serta aroma mewah yang bertahan lama.':
      'By eliminating middleman distribution layers, Diamond Clean delivers pure concentrate formulations in 5L and 20L containers directly to business operators. Our formulas are engineered for instant soil removal, tailored lather performance, and long-lasting luxury fragrances.',
    '8 Lini': '8 Lines',
    'Solusi Chemical Spesifik': 'Specialized Chemical Solutions',
    '100%': '100%',
    'Sertifikasi Halal Indonesia': 'Halal Indonesia Certified',
    'STANDAR KEBERSIHAN RESMI': 'OFFICIAL HYGIENE STANDARD',
    'Komitmen Mutu Higienis': 'Hygienic Quality Commitment',
    'Seluruh bahan baku surfaktan yang digunakan telah teruji bebas najis, ramah lingkungan (biodegradable), dan memiliki pH seimbang yang aman bagi kontak kulit harian staf Anda.':
      'All surfactant raw materials are strictly tested free from non-halal impurities, biodegradable, and formulated with a balanced pH safe for daily staff handling.',
    'Minta Sampel Tester Gratis': 'Request Free Tester Samples',
    'ARAH STRATEGIS': 'STRATEGIC VISION',
    'Visi & Misi Perusahaan': 'Company Vision & Mission',
    'Prinsip kerja yang memandu inovasi dan kemitraan jangka panjang Diamond Clean.':
      'Core working principles guiding Diamond Clean innovation and long-term business partnerships.',
    'Visi Kami': 'Our Vision',
    'Menjadi penyedia produk kimia pembersih dan sabun industri kemasan 5L terdepan di Indonesia yang dipercaya karena kualitas konsentrat unggul, harga paling kompetitif, serta kepatuhan mutlak terhadap standar halal dan kelestarian lingkungan.':
      'To be the leading industrial 5L cleaning chemical and bulk soap provider in Indonesia, trusted for superior concentrate quality, competitive pricing, and strict compliance with halal standards and environmental sustainability.',
    'Misi Kami': 'Our Mission',
    'Memproduksi sabun berkonsentrat tinggi yang terbukti memangkas biaya belanja operasional rutin mitra B2B hingga 35%.':
      'To manufacture high-concentrate soaps proven to cut routine operational expenses for B2B partners by up to 35%.',
    'Menjamin ketersediaan stok stabil dan keandalan pengiriman tepat waktu tanpa kendala operasional.':
      'To guarantee consistent warehouse inventory and on-time delivery schedules without operational interruptions.',
    'Menghadirkan edukasi takaran pengenceran tepat guna mencegah pemborosan cairan sabun.':
      'To provide clear dilution guidance and dosage education to eliminate chemical waste.',
    'Mempertahankan integritas sertifikasi Halal Indonesia dan keamanan formula kimia non-korosif.':
      'To uphold official Halal Indonesia integrity and non-corrosive chemical safety across all products.',

    // Industries Page Detailed Rows
    'Hotel, Resort & Penginapan': 'Hotels, Resorts & Lodging',
    'Kenyamanan tamu hotel bermula dari kebersihan kamar, keharuman linen sprei, dan kilau lantai lobby. Diamond Clean menyediakan paket chemical menyeluruh untuk tim housekeeping dan laundry hotel Anda.':
      'Guest comfort begins with room cleanliness, fresh linen fragrances, and pristine lobby floors. Diamond Clean provides a complete chemical package for housekeeping and commercial laundry.',
    'Pembersih Lantai:': 'Floor Cleaner:',
    'Cepat kering, tidak lengket, keharuman lavender mewah tahan lama.':
      'Quick-drying, non-sticky, with long-lasting luxurious fragrance.',
    'Pembersih Kaca Streak-Free:': 'Streak-Free Glass Cleaner:',
    'Cermin kamar mandi & jendela lobby berkilau tanpa bekas kabut.':
      'Bathroom mirrors & lobby windows shine crystal clear without haze.',
    'Sabun Cuci Tangan Lembut:': 'Gentle Hand Soap:',
    'Dilengkapi pelembab, ramah di kulit tamu hotel.':
      'Enriched with moisturizers, gentle on guest and staff skin.',
    'Konsultasi Paket Hotel': 'Consult Hotel Package',
    'PAKET CHEMICAL HOTEL': 'HOTEL CHEMICAL SUITE',
    '5L Siap Refill Housekeeping': '5L Ready-to-Refill Housekeeping',
    'Kemudahan penuangan ke botol semprot (spray bottle) staf kamar, menjaga kerapian trolley kebersihan hotel Anda.':
      'Easy decanting into staff spray bottles, ensuring organized housekeeping trolleys across your property.',
    'F&B INDUSTRY': 'F&B INDUSTRY',
    'Restoran, Rumah Makan & Café': 'Restaurants, Eateries & Cafés',
    'Operasional dapur resto membutuhkan sabun cuci piring yang mampu memotong minyak dan lemak jenuh dalam hitungan detik tanpa meninggalkan bau sabun kimia pada piring makan pelanggan.':
      'Commercial kitchens require dishwashing liquid that dissolves grease and saturated fats in seconds without leaving lingering chemical perfume on tableware.',
    'Cuci Piring Ekstrak Jeruk Nipis:': 'Fresh Lime Dishwashing:',
    'Hancurkan kerak saus dan lemak membandel.':
      'Eliminates baked-on grease, sauces, and tough food residues.',
    'Sanitasi Meja Makan:': 'Dining Table Sanitizer:',
    'Pembersih meja food-safe, cepat kering saat turnover tamu.':
      'Food-safe surface cleaner, dries rapidly for fast turnover.',
    '100% Bersertifikat Halal:': '100% Halal Certified:',
    'Menjamin ketenangan sertifikasi halal dapur resto Anda.':
      'Guarantees peace of mind for your restaurant\'s halal compliance audits.',
    'Konsultasi Paket Resto & Café': 'Consult Resto & Café Package',
    '100% FOOD SAFE & HALAL': '100% FOOD SAFE & HALAL',
    'Bebas Bau Amis & Lemak Jenuh': 'Zero Fishy Odor & Zero Grease',
    'Diformulasikan agar mudah dibilas tanpa sisa residu licin pada gelas minum atau piring hidangan.':
      'Formulated for effortless rinsing without soapy residue on glassware or dining plates.',
    'Laundry Kiloan, Hotel & Komersial': 'Retail Laundries, Hotels & Commercial Plants',
    'Kombinasi Detergen Cair Konsentrat Rendah Busa (Low Suds) dan Parfum Laundry Grade A Diamond Clean menjaga keawetan mesin cuci sekaligus memuaskan pelanggan dengan pakaian bersih dan wangi tahan lama.':
      'The combination of Low-Suds Liquid Detergent and Grade-A Laundry Perfume protects commercial machines while delighting customers with impeccably clean, fragrant garments.',
    'Detergen Low Suds:': 'Low Suds Detergent:',
    'Aman untuk mesin bukaan depan (front load), hemat air bilas.':
      'Safe for front-load commercial washers, saves rinse water.',
    'Parfum Tahan Lama:': 'Long-Lasting Perfume:',
    'Formula anti apek, aroma melekat 14-21 hari di plastik packing.':
      'Anti-musty formula, fragrance locks in for 14-21 days inside packaging.',
    'Biaya per Kg Lebih Murah:': 'Lower Cost per Kg:',
    'Konsentrat tinggi menurunkan biaya cuci per kilogram.':
      'High concentration lowers washing cost per kilogram significantly.',
    'Konsultasi Paket Laundry': 'Consult Laundry Package',
    'SUPPLY BULANAN LAUNDRY': 'MONTHLY LAUNDRY SUPPLY',
    'Kombinasi Detergen 5L & Parfum 5L': '5L Detergent & 5L Perfume Bundles',
    'Paket bundling hemat dengan harga grosir khusus pengusaha laundry kiloan dan hotelier.':
      'Cost-effective wholesale bundles tailored for laundry entrepreneurs and hospitality managers.',
    'AUTO DETAILING': 'AUTO DETAILING',
    'Car Wash & Workshop Otomotif': 'Car Wash & Automotive Studios',
    'Shampo mobil salju Diamond Clean menghasilkan busa creamy tebal yang mampu melarutkan oli jalanan, kotoran aspal, dan lumpur tanah tanpa mengikis lapisan coating mobil pelanggan Anda.':
      'Diamond Clean snow foam shampoo produces thick creamy suds that break down road grime, asphalt specks, and mud without stripping ceramic coatings or wax.',
    'Busa Salju Melimpah:': 'Thick Snow Foam:',
    'Tampilan visual cuci salju profesional menarik minat pelanggan.':
      'Professional thick snow foam visuals that impress car owners.',
    'pH Netral 7.0:': 'Neutral 7.0 pH:',
    'Tidak merusak cat mobil, tidak meninggalkan bintik air (water spot).':
      'Safe for all paint coats, prevents water spots and mineral rings.',
    'Kapasitas 5L & Pail 20L:': '5L Cans & 20L Pails:',
    'Pasokan rutin tanpa kendala stok habis di akhir pekan.':
      'Continuous bulk supply prevents weekend stockouts.',
    'Konsultasi Paket Car Wash': 'Consult Car Wash Package',
    'TEKNOLOGI SNOW WASH': 'SNOW WASH FORMULATION',
    'Kilau Wet-Look & Perlindungan Cat': 'Wet-Look Gloss & Paint Protection',
    'Meningkatkan kepuasan pemilik kendaraan dengan hasil cuci kilap maksimal dan aman bagi cat.':
      'Boosts vehicle owner satisfaction with deep gloss shine and gentle surface protection.',

    // Footer Elements
    'Diamond Clean adalah supplier resmi chemical pembersih dan sabun industri konsentrat tinggi kemasan 5L. Solusi efisiensi biaya, mutu higienis, dan pasokan stabil untuk industri modern di Indonesia.':
      'Diamond Clean is an authorized supplier of high-concentrate 5L cleaning chemical and bulk soap solutions. Cost efficiency, hygienic quality, and reliable supply for modern industries in Indonesia.',
    'Terverifikasi Halal Indonesia': 'Verified Halal Indonesia',
    'Katalog 8 Produk': '8 Products Catalogue',
    'Sektor Industri': 'Industry Sectors',
    'Hubungi Kami': 'Contact Us',
    'Hotline / WhatsApp:': 'Hotline / WhatsApp:',
    'Layanan Pengiriman:': 'Delivery Service:',
    'Kemasan 5L & Curah 20L Siap Kirim ke Seluruh Lokasi Bisnis':
      '5L Cans & 20L Bulk Ready to Ship Nationwide to Business Locations',
    'Senin – Sabtu: 08.00 – 17.00 WIB': 'Monday – Saturday: 08:00 – 17:00 WIB',
    'Senin – Sabtu: 08.00 – 17.00 WIB (Minggu/Libur: By Appointment)':
      'Monday – Saturday: 08:00 – 17:00 WIB (Sunday/Holiday: By Appointment)',
    'Pembersih Kaca & Meja 5L': '5L Glass & Surface Cleaner',
    'Pembersih Kerak 5L': '5L Scale Remover',
    'Detergen Cair 5L': '5L Laundry Detergent',
    'Hotel & Hospitality': 'Hotel & Hospitality',
    'Laundry Komersial': 'Commercial Laundry',
    'Car Wash & Detailing': 'Car Wash & Detailing',
    'Pabrik & Perkantoran': 'Factories & Office Buildings',
    'Lantai keramik, granit, marmer lobby & dapur': 'Ceramic, granite, marble lobby & kitchen floors',
    'Rendah Busa, Cepat Kering & Kilap': 'Low Suds, Fast Drying & High Gloss',
    'Kaca, Meja & Stainless': 'Glass, Tables & Stainless Steel',
    'Kaca etalase, cermin, meja resto & stainless steel': 'Display glass, mirrors, dining tables & stainless steel',
    'Toilet, dinding keramik, wastafel & noda kerak membandel': 'Toilets, ceramic walls, sinks & stubborn mineral deposits',
    'Oles langsung / tuang & sikat merata': 'Apply directly / pour & scrub evenly',
    'Busa Pembersih Kerak & Kilap Seketika': 'Scale Dissolving Lather & Instant Shine',
    '99.9% Bunuh Kuman & Bakteri': '99.9% Kills Germs & Bacteria',
    '(Hotline 24 Jam)': '(24h Hotline)',
    '(Fast Response)': '(Fast Response)',
    'Diamond Clean Video Showcase': 'Diamond Clean Video Showcase',
    'Browser Anda tidak mendukung tag video HTML5.': 'Your browser does not support the HTML5 video tag.'
  };

  // WhatsApp Message Translations for Slide Dynamic Buttons
  const WA_SLIDE_MESSAGES = {
    'Sabun Lantai Extra Apel': 'Hello Diamond Clean, I would like to order 5L Fresh Apple Floor Cleaner.',
    'Sabun Lantai Extra Daun Sereh': 'Hello Diamond Clean, I would like to order 5L Lemongrass Floor Cleaner.',
    'Detergen Cair Aroma Dony': 'Hello Diamond Clean, I would like to order 5L Laundry Detergent (Dony).',
    'Detergen Cair Aroma Dony Blue': 'Hello Diamond Clean, I would like to order 5L Laundry Detergent (Dony Blue).'
  };

  // Page Titles for ID and EN
  const PAGE_TITLES = {
    index: {
      id: 'Diamond Clean | Solusi Kebersihan & Supplier Sabun 5L - Hotel, Resto, Laundry, Car Wash',
      en: 'Diamond Clean | Commercial Hygiene Solutions & 5L Soap Supplier - Hotel, Resto, Laundry, Car Wash'
    },
    about: {
      id: 'Tentang Kami | Diamond Clean - Solusi Sabun & Chemical Pembersih Industri 5L',
      en: 'About Us | Diamond Clean - 5L Industrial Cleaning Chemical & Soap Solutions'
    },
    solutions: {
      id: 'Katalog Produk Sabun 5L & Chemical | Diamond Clean Indonesia',
      en: '5L Soap & Chemical Product Catalogue | Diamond Clean Indonesia'
    },
    industries: {
      id: 'Sektor Industri & Kemitraan B2B | Diamond Clean Indonesia',
      en: 'Industry Sectors & B2B Partnerships | Diamond Clean Indonesia'
    },
    sustainability: {
      id: 'Standar Mutu & Sertifikasi Halal | Diamond Clean Indonesia',
      en: 'Quality Standards & Halal Certification | Diamond Clean Indonesia'
    },
    contact: {
      id: 'Kontak & Permintaan Penawaran | Diamond Clean Indonesia',
      en: 'Contact & Quotation Requests | Diamond Clean Indonesia'
    }
  };

  /**
   * Determine current page key from URL
   */
  function getCurrentPageKey() {
    const p = (typeof window !== 'undefined' && window.location && window.location.pathname) ? window.location.pathname.toLowerCase() : '';
    if (p.includes('about')) return 'about';
    if (p.includes('solutions') || p.includes('product')) return 'solutions';
    if (p.includes('industries')) return 'industries';
    if (p.includes('sustainability')) return 'sustainability';
    if (p.includes('contact')) return 'contact';
    return 'index';
  }

  /**
   * Helper: Normalize string by collapsing extra whitespace and decoding &amp;
   */
  function normalizeStr(str) {
    if (!str) return '';
    return str.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  }

  /**
   * Retrieve active language ('id' or 'en')
   */
  function getCurrentLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'id') return stored;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  /**
   * Apply translations site-wide
   */
  function applyTranslations(lang) {
    const isEn = lang === 'en';
    const dict = translations[lang] || translations[DEFAULT_LANG];

    // 1. Explicit data-i18n elements (e.g. Header nav, Hero, Video tabs)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key] !== undefined) {
        if (el.getAttribute('data-i18n-html') === 'true') {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 2. DOM TreeWalker: Translate text nodes throughout body EXCEPT header
    const SHOW_TEXT = (typeof NodeFilter !== 'undefined' && NodeFilter.SHOW_TEXT) ? NodeFilter.SHOW_TEXT : 4;
    const FILTER_ACCEPT = (typeof NodeFilter !== 'undefined' && NodeFilter.FILTER_ACCEPT) ? NodeFilter.FILTER_ACCEPT : 1;
    const FILTER_REJECT = (typeof NodeFilter !== 'undefined' && NodeFilter.FILTER_REJECT) ? NodeFilter.FILTER_REJECT : 2;

    const walker = document.createTreeWalker(
      document.body,
      SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return FILTER_REJECT;
          }
          const parent = node.parentElement;
          if (!parent) return FILTER_REJECT;

          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'noscript') {
            return FILTER_REJECT;
          }

          // EXCLUDE HEADER so that header remains firmly in English on BOTH id and en!
          if (parent.closest('header') || parent.closest('.header') || parent.closest('#header')) {
            return FILTER_REJECT;
          }

          // EXCLUDE language switcher buttons
          if (parent.closest('.lang-switch-container') || parent.classList.contains('lang-btn')) {
            return FILTER_REJECT;
          }

          // If element has data-i18n, let step 1 manage it
          if (parent.hasAttribute('data-i18n')) {
            return FILTER_REJECT;
          }

          return FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      // Cache original Indonesian text on first access
      if (node._origText === undefined) {
        node._origText = node.nodeValue;
      }

      if (isEn) {
        const normalized = normalizeStr(node._origText);
        if (PHRASE_DICTIONARY[normalized]) {
          const leadingSpace = node._origText.match(/^\s*/)[0];
          const trailingSpace = node._origText.match(/\s*$/)[0];
          node.nodeValue = leadingSpace + PHRASE_DICTIONARY[normalized] + trailingSpace;
        }
      } else {
        // Restore Indonesian
        node.nodeValue = node._origText;
      }
    });

    // 3. Translate Form Input and Textarea Placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      if (el._origPlaceholder === undefined) {
        el._origPlaceholder = el.getAttribute('placeholder');
      }
      if (isEn) {
        const normalized = normalizeStr(el._origPlaceholder);
        if (PHRASE_DICTIONARY[normalized]) {
          el.setAttribute('placeholder', PHRASE_DICTIONARY[normalized]);
        }
      } else {
        el.setAttribute('placeholder', el._origPlaceholder);
      }
    });

    // 4. Translate <select> Dropdown <option> Texts
    document.querySelectorAll('select option').forEach(opt => {
      if (opt._origText === undefined) {
        opt._origText = opt.textContent;
      }
      if (isEn) {
        const normalized = normalizeStr(opt._origText);
        if (PHRASE_DICTIONARY[normalized]) {
          opt.textContent = PHRASE_DICTIONARY[normalized];
        }
      } else {
        opt.textContent = opt._origText;
      }
    });

    // 5. Product Slider Dynamic Attributes & Active Card Re-sync
    document.querySelectorAll('.product-slider').forEach(slider => {
      const slides = slider.querySelectorAll('.slider-slide');
      slides.forEach(slide => {
        // Cache original attributes
        if (!slide._origAttrs) {
          slide._origAttrs = {
            title: slide.getAttribute('data-title') || '',
            desc: slide.getAttribute('data-desc') || '',
            aroma: slide.getAttribute('data-aroma') || '',
            spec1Label: slide.getAttribute('data-spec1-label') || '',
            spec1Val: slide.getAttribute('data-spec1-val') || '',
            spec2Label: slide.getAttribute('data-spec2-label') || '',
            spec2Val: slide.getAttribute('data-spec2-val') || '',
            spec3Label: slide.getAttribute('data-spec3-label') || '',
            spec3Val: slide.getAttribute('data-spec3-val') || '',
            waText: slide.getAttribute('data-wa-text') || ''
          };
        }

        const orig = slide._origAttrs;
        if (isEn) {
          if (orig.title && PHRASE_DICTIONARY[normalizeStr(orig.title)]) {
            slide.setAttribute('data-title', PHRASE_DICTIONARY[normalizeStr(orig.title)]);
          }
          if (orig.desc && PHRASE_DICTIONARY[normalizeStr(orig.desc)]) {
            slide.setAttribute('data-desc', PHRASE_DICTIONARY[normalizeStr(orig.desc)]);
          }
          if (orig.aroma && PHRASE_DICTIONARY[normalizeStr(orig.aroma)]) {
            slide.setAttribute('data-aroma', PHRASE_DICTIONARY[normalizeStr(orig.aroma)]);
          }
          if (orig.spec1Label && PHRASE_DICTIONARY[normalizeStr(orig.spec1Label)]) {
            slide.setAttribute('data-spec1-label', PHRASE_DICTIONARY[normalizeStr(orig.spec1Label)]);
          }
          if (orig.spec1Val && PHRASE_DICTIONARY[normalizeStr(orig.spec1Val)]) {
            slide.setAttribute('data-spec1-val', PHRASE_DICTIONARY[normalizeStr(orig.spec1Val)]);
          }
          if (orig.spec2Label && PHRASE_DICTIONARY[normalizeStr(orig.spec2Label)]) {
            slide.setAttribute('data-spec2-label', PHRASE_DICTIONARY[normalizeStr(orig.spec2Label)]);
          }
          if (orig.spec2Val && PHRASE_DICTIONARY[normalizeStr(orig.spec2Val)]) {
            slide.setAttribute('data-spec2-val', PHRASE_DICTIONARY[normalizeStr(orig.spec2Val)]);
          }
          if (orig.spec3Label && PHRASE_DICTIONARY[normalizeStr(orig.spec3Label)]) {
            slide.setAttribute('data-spec3-label', PHRASE_DICTIONARY[normalizeStr(orig.spec3Label)]);
          }
          if (orig.spec3Val && PHRASE_DICTIONARY[normalizeStr(orig.spec3Val)]) {
            slide.setAttribute('data-spec3-val', PHRASE_DICTIONARY[normalizeStr(orig.spec3Val)]);
          }
          const vKey = slide.getAttribute('data-variant');
          if (vKey && WA_SLIDE_MESSAGES[vKey]) {
            slide.setAttribute('data-wa-text', WA_SLIDE_MESSAGES[vKey]);
          }
        } else {
          // Restore Indonesian
          if (orig.title) slide.setAttribute('data-title', orig.title);
          if (orig.desc) slide.setAttribute('data-desc', orig.desc);
          if (orig.aroma) slide.setAttribute('data-aroma', orig.aroma);
          if (orig.spec1Label) slide.setAttribute('data-spec1-label', orig.spec1Label);
          if (orig.spec1Val) slide.setAttribute('data-spec1-val', orig.spec1Val);
          if (orig.spec2Label) slide.setAttribute('data-spec2-label', orig.spec2Label);
          if (orig.spec2Val) slide.setAttribute('data-spec2-val', orig.spec2Val);
          if (orig.spec3Label) slide.setAttribute('data-spec3-label', orig.spec3Label);
          if (orig.spec3Val) slide.setAttribute('data-spec3-val', orig.spec3Val);
          if (orig.waText) slide.setAttribute('data-wa-text', orig.waText);
        }
      });

      // Synchronize active slide to parent card
      const card = slider.closest('.product-card');
      const activeSlide = slider.querySelector('.slider-slide.active') || slider.querySelector('.slider-slide');
      if (card && activeSlide) {
        const titleEl = card.querySelector('.card-dynamic-title');
        const descEl = card.querySelector('.card-dynamic-desc');
        const aromaVal = card.querySelector('.spec-aroma-val');
        const dTitle = activeSlide.getAttribute('data-title');
        const dDesc = activeSlide.getAttribute('data-desc');
        const dAroma = activeSlide.getAttribute('data-aroma');

        if (titleEl && dTitle) titleEl.textContent = dTitle;
        if (descEl && dDesc) descEl.textContent = dDesc;
        if (aromaVal && dAroma) aromaVal.textContent = dAroma;

        for (let s = 1; s <= 3; s++) {
          const lEl = card.querySelector(`.spec-label-${s}`);
          const vEl = card.querySelector(`.spec-val-${s}`);
          const sLabel = activeSlide.getAttribute(`data-spec${s}-label`);
          const sVal = activeSlide.getAttribute(`data-spec${s}-val`);
          if (lEl && sLabel) lEl.textContent = sLabel;
          if (vEl && sVal) vEl.textContent = sVal;
        }

        const waBtn = card.querySelector('.btn-dynamic-wa') || card.querySelector('a[href^="https://wa.me"]');
        const customWa = activeSlide.getAttribute('data-wa-text');
        if (waBtn && customWa) {
          waBtn.href = `https://wa.me/62882007907237?text=${encodeURIComponent(customWa)}`;
        }
      }
    });

    // 6. Update document.title
    const pageKey = getCurrentPageKey();
    if (PAGE_TITLES[pageKey]) {
      document.title = isEn ? PAGE_TITLES[pageKey].en : PAGE_TITLES[pageKey].id;
    }

    // 7. Update document language attribute
    document.documentElement.lang = lang;

    // 8. Update toggle button visual state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // 9. Dispatch custom event for dynamic components (video player, etc.)
    if (typeof window.dispatchEvent === 'function' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { lang, dict, isEn }
      }));
    }
  }

  /**
   * Set language and persist to localStorage
   */
  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'id') lang = DEFAULT_LANG;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyTranslations(lang);
  }

  // Expose API
  window.DiamondI18n = {
    get: getCurrentLanguage,
    set: setLanguage,
    translations: translations,
    apply: applyTranslations,
    phrases: PHRASE_DICTIONARY
  };

  // Initialize
  function init() {
    const initialLang = getCurrentLanguage();
    applyTranslations(initialLang);

    // Global event delegation for all language selector buttons
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== getCurrentLanguage()) {
        setLanguage(targetLang);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
