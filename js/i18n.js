/**
 * DIAMOND CLEAN - Internationalization (i18n) Engine
 * Supports seamless bilingual switching: Bahasa Indonesia ('id') and English ('en')
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'diamond_lang';
  const DEFAULT_LANG = 'id';

  const translations = {
    // --------------------------------------------------------------------------
    // COMMON & NAVIGATION
    // --------------------------------------------------------------------------
    id: {
      // Navbar
      nav_home: 'Beranda',
      nav_about: 'Tentang Kami',
      nav_solutions: 'Katalog Produk',
      nav_industries: 'Sektor Industri',
      nav_sustainability: 'Sertifikasi',
      nav_contact: 'Hubungi Kami',
      nav_consultation: 'Konsultasi',

      // Brand taglines
      logo_tagline: 'SOLUSI KEBERSIHAN HOREKA 5L',
      footer_tagline: 'Penyedia chemical dan sabun pembersih 5L terpercaya untuk Hotel, Restoran, Café, Laundry, dan Car Wash di seluruh Indonesia.',
      footer_nav_title: 'Navigasi Cepat',
      footer_catalog_title: 'Katalog 8 Produk',
      footer_contact_title: 'Kontak Supplier',
      footer_rights: 'Hak cipta dilindungi undang-undang.',
      footer_cert: 'Sertifikasi Halal',
      footer_about: 'Tentang Kami',
      footer_contact: 'Hubungi Kami',
      wa_floating_label: 'Chat WhatsApp dengan Diamond Clean',

      // Hero Section (Home)
      hero_badge: 'SUPPLIER SABUN 5L LANGSUNG PABRIK',
      hero_title_prefix: 'Solusi Kebersihan HOREKA & ',
      hero_title_highlight: 'Supplier Sabun 5L',
      hero_desc: 'Mitra utama Hotel, Restoran, Café, Laundry & Car Wash. Pasokan chemical konsentrat kemasan 5L berdaya bersih tinggi, hemat biaya & bersertifikat Halal Indonesia.',
      hero_cta_consult: 'Konsultasi Kebutuhan Usaha',
      hero_cta_catalog: 'Lihat Katalog 8 Produk',

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
      video_chapter_3_badge: '100% HALAL INDONESIA',

      // Stats Banner
      stat_liters: 'Liter Terdistribusi',
      stat_partners: 'Mitra Usaha HOREKA',
      stat_halal: 'Halal Indonesia & Higienis',
      stat_active: 'Karakter Bersih Maksimal',

      // Value Propositions / Why Choose Us
      why_badge: 'KEUNGGULAN DIAMOND CLEAN 5L',
      why_title: 'Solusi Pasokan Tangan Pertama',
      why_desc: 'Kami memahami bahwa efisiensi biaya operasional dan konsistensi mutu adalah kunci keberhasilan bisnis hospitality dan jasa Anda.',
      why_card1_title: 'Formulasi Konsentrat Tinggi',
      why_card1_desc: 'Daya angkat noda dan lemak superior. Pemakaian jauh lebih hemat per porsi pencucian dibandingkan sabun biasa di pasaran.',
      why_card2_title: 'Kemasan 5L Standar Industri',
      why_card2_desc: 'Dirancang kokoh dan ergonomis. Mengurangi limbah plastik sekali pakai serta mempermudah penyimpanan stok gudang usaha Anda.',
      why_card3_title: '100% Halal & Aman Digunakan',
      why_card3_desc: 'Diproduksi dengan bahan bebas najis dan alkohol berbahaya. Aman bagi kulit staf Anda serta memenuhi standar audit sertifikasi.',
      why_card4_title: 'Stabilitas Pasokan & Pengiriman Cepat',
      why_card4_desc: 'Kapasitas produksi harian terjamin. Pengiriman tepat waktu siap mendukung operasional tanpa risiko kehabisan stok sabun.',

      // Product Catalog Section
      prod_badge: 'KATALOG UTAMA',
      prod_heading: '8 Lini Produk Pembersih Diamond Clean',
      prod_subheading: 'Formulasi khusus kemasan 5L ekonomis untuk kebutuhan higienis dapur, kamar mandi, laundry kiloan, perawatan mobil, hingga sanitasi ruangan.',
      prod_btn_order: 'Pesan Sekarang',
      prod_btn_wa: 'Pesan via WhatsApp',
      spec_packaging_label: 'Kemasan:',
      spec_packaging_val: '5L Netto (Halal)',

      // Product 1 - Cuci Piring
      prod_1_name: 'Sabun Cuci Piring',
      prod_1_desc: 'Formula ekstra kental ekstrak Jeruk Nipis. Cepat angkat lemak membandel dan bau amis seketika, busa melimpah, lembut di tangan tanpa rasa panas.',
      prod_1_spec1_label: 'Aroma:',
      prod_1_spec1_val: 'Jeruk Nipis Segar',
      prod_1_spec2_label: 'Daya Angkat Lemak:',
      prod_1_spec2_val: 'Seketika (Instant Cut)',

      // Product 2 - Cuci Tangan
      prod_2_name: 'Sabun Cuci Tangan',
      prod_2_desc: 'Sabun cuci tangan lembut busa melimpah dengan formula antibakterial efektif. Pilihan aroma segar Mint & Strawberry, jaga kebersihan higienis tangan.',
      prod_2_spec1_label: 'Antibakterial:',
      prod_2_spec1_val: 'Membunuh 99.9% Kuman',
      prod_2_spec2_label: 'Karakter Busa:',
      prod_2_spec2_val: 'Busa Melimpah Lembut',

      // Product 3 - Pembersih Lantai
      prod_3_name: 'Pembersih Lantai',
      prod_3_desc: 'Pembersih lantai antibakterial aroma Apel Segar. Cepat kering tanpa rasa lengket, bunuh kuman penyebab bau, lantai bersih mengkilap tahan lama.',
      prod_3_spec1_label: 'Aroma:',
      prod_3_spec1_val: 'Apel Segar Mewah',
      prod_3_spec2_label: 'Hasil Permukaan:',
      prod_3_spec2_val: 'Kilap & Tidak Lengket',

      // Product 4 - Sabun Mandi
      prod_4_name: 'Sabun Mandi (Body Wash)',
      prod_4_desc: 'Sabun mandi cair lembut busa melimpah dengan formula pelembab alami. Membersihkan kotoran secara mendalam, wangi segar mewah, tidak membuat kulit kering.',
      prod_4_spec1_label: 'Aroma:',
      prod_4_spec1_val: 'Floral Fresh Mewah',
      prod_4_spec2_label: 'Kelembaban:',
      prod_4_spec2_val: 'Moisturizing & Lembut',

      // Product 5 - Pembersih Kaca & Meja
      prod_5_name: 'Pembersih Kaca & Meja',
      prod_5_desc: 'Cairan pembersih kaca, meja & stainless steel Extra Buah Apel. Formula streak-free kilap seketika tanpa noda bercak dan anti debu.',
      prod_5_spec1_label: 'Aroma:',
      prod_5_spec1_val: 'Extra Buah Apel',
      prod_5_spec2_label: 'Aplikasi:',
      prod_5_spec2_val: 'Kaca, Meja & Stainless',

      // Product 6 - Shampo Mobil
      prod_6_name: 'Shampo Mobil Touchless',
      prod_6_desc: 'Formula cuci tanpa sentuh (touchless). Bersihkan kotoran, debu & lumpur cepat, pH balance lembut aman untuk cat & wax, hasil kilap mengkilap.',
      prod_6_spec1_label: 'Formula:',
      prod_6_spec1_val: 'Touchless Active Foam',
      prod_6_spec2_label: 'Keseimbangan pH:',
      prod_6_spec2_val: 'pH 7.0 Netral Aman Cat',

      // Product 7 - Detergen Cair
      prod_7_name: 'Detergen Cair Laundry',
      prod_7_desc: 'Formula konsentrat aroma Dony segar & mewah tahan lama. Busa melimpah mudah bilas, angkat noda efektif, rawat warna pakaian tetap cerah.',
      prod_7_spec1_label: 'Aroma:',
      prod_7_spec1_val: 'Dony Segar Mewah',
      prod_7_spec2_label: 'Daya Cuci:',
      prod_7_spec2_val: 'Konsentrat Busa Cepat Bilas',

      // Product 8 - Parfum Laundry
      prod_8_name: 'Parfum Laundry Premium',
      prod_8_desc: 'Pewangi pakaian bibit wangi grade A. Tahan berminggu-minggu tanpa noda kuning di serat sprei/pakaian. Varian: Dony, Sakura, Snappy & Custom.',
      prod_8_spec1_label: 'Daya Tahan:',
      prod_8_spec1_val: 'Tahan Berhari-hari',
      prod_8_spec2_label: 'Karakter Serat:',
      prod_8_spec2_val: 'Anti Noda Kuning di Pakaian',

      // Form Calculator / WhatsApp
      form_badge: 'PERHITUNGAN MUDAH & CEPAT',
      form_title: 'Kalkulator & Permintaan Penawaran Pasokan 5L',
      form_desc: 'Isi data singkat usaha Anda di bawah ini. Sistem kami akan langsung menyiapkan format draf pemesanan resmi via WhatsApp tim marketing kami.',
      form_label_name: 'Nama Lengkap / PIC:',
      form_placeholder_name: 'Contoh: Bpk. Hendra Wijaya',
      form_label_company: 'Nama Usaha / Perusahaan:',
      form_placeholder_company: 'Contoh: Grand Emerald Hotel & Resto',
      form_label_sector: 'Sektor Usaha:',
      form_sector_select: 'Pilih Sektor Usaha',
      form_sector_hotel: 'Hotel & Penginapan',
      form_sector_resto: 'Restoran, Kafe & Catering',
      form_sector_laundry: 'Laundry Kiloan & Komersial',
      form_sector_carwash: 'Car Wash & Salon Mobil',
      form_sector_hospital: 'Klinik, RS & Kesehatan',
      form_sector_office: 'Gedung, Kantor & Pabrik',
      form_sector_other: 'Lainnya / Reseller',
      form_label_product: 'Kebutuhan Produk Utama:',
      form_product_select: 'Pilih Produk Kebutuhan',
      form_label_qty: 'Perkiraan Kebutuhan (Jerigen 5L / Bulan):',
      form_placeholder_qty: 'Contoh: 30 Jerigen / Bulan',
      form_label_notes: 'Catatan Khusus / Permintaan Sampel:',
      form_placeholder_notes: 'Tuliskan kebutuhan khusus, permintaan sampel gratis, atau jadwal pengiriman yang diinginkan...',
      form_btn_submit: 'Kirim Permintaan Penawaran Resmi via WhatsApp',

      // CTA Banner
      cta_badge: 'SOLUSI MITRA HOREKA INDONESIA',
      cta_title: 'Siap Mengoptimalkan Biaya Kebersihan Usaha Anda?',
      cta_desc: 'Dapatkan konsultasi gratis, penawaran harga grosir tangan pertama, dan sampel produk langsung dari Diamond Clean.',
      cta_btn_consult: 'Konsultasi Gratis Sekarang',
      cta_btn_catalog: 'Katalog & Rekomendasi Takaran',

      // Page: About Us
      about_hero_badge: 'PROFIL PERUSAHAAN',
      about_hero_title: 'Tentang Diamond Clean Indonesia',
      about_hero_desc: 'Produsen & supplier terpercaya produk chemical pembersih konsentrat 5L berkualitas tinggi untuk mitra usaha hospitality, laundry, dan otomotif.',
      about_vision_title: 'Visi Perusahaan',
      about_vision_desc: 'Menjadi penyedia produk kimia pembersih dan sabun industri 5L nomor satu di Indonesia yang dikenal atas mutu tak tertandingi, efisiensi biaya, dan integritas halal.',
      about_mission_title: 'Misi Perusahaan',
      about_mission_desc: 'Menyediakan formulasi konsentrat pembersih higienis yang aman, ramah lingkungan, serta memberikan kepastian pasokan berkesinambungan bagi seluruh mitra usaha.',

      // Page: Solutions / Product Catalogue
      solutions_hero_badge: 'KATALOG LENGKAP 5L',
      solutions_hero_title: 'Solusi Lengkap Chemical & Sabun 5L',
      solutions_hero_desc: 'Formulasi konsentrat berkualitas tinggi dengan standar mutu higienis untuk efisiensi operasional usaha Anda.',
      solutions_dosage_title: 'Rekomendasi Takaran & Karakteristik Produk',
      solutions_dosage_desc: 'Gunakan panduan berikut untuk mendapatkan hasil pembersihan maksimal dengan biaya paling hemat per pemakaian.',

      // Page: Industries
      industries_hero_badge: 'SEKTOR INDUSTRI',
      industries_hero_title: 'Solusi Kebersihan Khusus Setiap Industri',
      industries_hero_desc: 'Setiap bidang usaha memiliki tantangan kebersihan unik. Diamond Clean menghadirkan formulasi spesifik untuk Hotel, Restoran, Laundry, hingga Car Wash.',

      // Page: Certifications / Sustainability
      sustain_hero_badge: 'MUTU & SERTIFIKASI',
      sustain_hero_title: 'Komitmen Mutu Higienis & Sertifikasi Halal',
      sustain_hero_desc: 'Keamanan, kepatuhan syariah, serta tanggung jawab lingkungan merupakan fondasi utama dalam setiap tetes produk Diamond Clean.',

      // Page: Contact Us
      contact_hero_badge: 'HUBUNGI SUPPLIER',
      contact_hero_title: 'Konsultasi & Layanan Pasokan Diamond Clean',
      contact_hero_desc: 'Hubungi tim marketing kami untuk konsultasi kebutuhan sabun 5L, permintaan sampel gratis, dan penawaran harga grosir terbaik.'
    },

    // --------------------------------------------------------------------------
    // ENGLISH TRANSLATIONS
    // --------------------------------------------------------------------------
    en: {
      // Navbar
      nav_home: 'Home',
      nav_about: 'About Us',
      nav_solutions: 'Product Catalogue',
      nav_industries: 'Industries',
      nav_sustainability: 'Certifications',
      nav_contact: 'Contact Us',
      nav_consultation: 'Consultation',

      // Brand taglines
      logo_tagline: 'HORECA CLEANING SOLUTIONS 5L',
      footer_tagline: 'Trusted 5L cleaning chemical and soap manufacturer & supplier for Hotels, Restaurants, Cafés, Laundries, and Car Washes across Indonesia.',
      footer_nav_title: 'Quick Navigation',
      footer_catalog_title: '8 Products Catalogue',
      footer_contact_title: 'Supplier Contact',
      footer_rights: 'All rights reserved.',
      footer_cert: 'Certifications',
      footer_about: 'About Us',
      footer_contact: 'Contact Us',
      wa_floating_label: 'Chat on WhatsApp with Diamond Clean',

      // Hero Section (Home)
      hero_badge: 'DIRECT FACTORY 5L BULK SOAP SUPPLIER',
      hero_title_prefix: 'HORECA Cleaning Solutions & ',
      hero_title_highlight: '5L Bulk Soap Supplier',
      hero_desc: 'Primary supplier for Hotels, Restaurants, Cafés, Laundries & Car Washes. High-concentrate 5L bulk chemicals with superior cleaning power, cost efficiency & Indonesian Halal Certification.',
      hero_cta_consult: 'Consult Business Needs',
      hero_cta_catalog: 'View 8 Products Catalog',

      // Video Section (Home)
      video_badge: 'OFFICIAL VIDEO SHOWCASE',
      video_title: 'Diamond Clean Operational Profile & Performance',
      video_subheading: 'Watch how our 5L packaging standards, concentrate efficiency, and hygienic quality commitments are manufactured to power your daily business operations.',
      video_tab_1: '1. Profile & 5L Packaging',
      video_tab_2: '2. Performance & Foam Testing',
      video_tab_3: '3. Halal Hygiene Standards',
      video_chapter_1_title: 'Diamond Clean — Chemical Supply Profile & Industrial 5L Packaging',
      video_chapter_1_desc: 'Discover our commitment to delivering high-performance concentrate cleaning formulations with cost-saving 5L bulk packaging for business partners.',
      video_chapter_1_badge: 'PRODUCTION & 5L SUPPLY',
      video_chapter_2_title: 'Formulation Performance: Rich Foam & Instant Grease Cutting',
      video_chapter_2_desc: 'Demonstration of instant grease removal on dishwashing liquid and snow foam power on car shampoo with balanced, gentle pH.',
      video_chapter_2_badge: 'LAB TESTING & PERFORMANCE',
      video_chapter_3_title: 'Hygienic Quality Standards & Indonesian Halal Compliance',
      video_chapter_3_desc: 'All Diamond Clean soap formulation lines are guaranteed free from impurities and harmful alcohols, ensuring absolute safety for hotels, restaurants, and cafes.',
      video_chapter_3_badge: '100% INDONESIAN HALAL',

      // Stats Banner
      stat_liters: 'Liters Distributed',
      stat_partners: 'HORECA Business Partners',
      stat_halal: 'Halal Indonesia & Hygienic',
      stat_active: 'Maximum Clean Finish',

      // Value Propositions / Why Choose Us
      why_badge: 'DIAMOND CLEAN 5L ADVANTAGES',
      why_title: 'Direct First-Hand Supply Solutions',
      why_desc: 'We understand that operational cost efficiency and consistent quality are the pillars of success for your hospitality and service operations.',
      why_card1_title: 'High-Concentrate Formulation',
      why_card1_desc: 'Superior grease and stain removal power. Significantly more economical per wash portion compared to ordinary commercial soaps.',
      why_card2_title: '5L Industrial Standard Canister',
      why_card2_desc: 'Engineered sturdy and ergonomic. Minimizes single-use plastic waste while simplifying inventory warehouse storage for your facility.',
      why_card3_title: '100% Halal & Safe to Handle',
      why_card3_desc: 'Formulated with safe, alcohol-free and pure ingredients. Gentle on staff hands and fully compliant with stringent health & halal audits.',
      why_card4_title: 'Supply Reliability & Punctual Delivery',
      why_card4_desc: 'Guaranteed daily production scale. Timely dispatch ready to safeguard your daily operations against sudden stock shortages.',

      // Product Catalog Section
      prod_badge: 'PRIMARY CATALOGUE',
      prod_heading: '8 Diamond Clean Cleaning Formulations',
      prod_subheading: 'Specialized 5L bulk formulas designed for commercial kitchens, guest bathrooms, industrial laundries, auto detailing, and facility sanitation.',
      prod_btn_order: 'Order Now',
      prod_btn_wa: 'Order via WhatsApp',
      spec_packaging_label: 'Packaging:',
      spec_packaging_val: '5L Net Volume (Halal)',

      // Product 1 - Dishwashing
      prod_1_name: 'Dishwashing Liquid',
      prod_1_desc: 'Extra-thick Lime extract formula. Swiftly dissolves stubborn grease and odor instantly, rich suds, skin-gentle with zero irritation.',
      prod_1_spec1_label: 'Scent:',
      prod_1_spec1_val: 'Fresh Lime Extract',
      prod_1_spec2_label: 'Degreasing Power:',
      prod_1_spec2_val: 'Instant Cut Action',

      // Product 2 - Hand Soap
      prod_2_name: 'Antibacterial Hand Soap',
      prod_2_desc: 'Gentle rich-lather hand soap with active antibacterial defense. Fresh Mint & Strawberry aroma options to maintain hand hygiene.',
      prod_2_spec1_label: 'Antibacterial:',
      prod_2_spec1_val: 'Kills 99.9% of Bacteria',
      prod_2_spec2_label: 'Foam Character:',
      prod_2_spec2_val: 'Silky Rich Lather',

      // Product 3 - Floor Cleaner
      prod_3_name: 'Floor Cleaner & Sanitizer',
      prod_3_desc: 'Antibacterial floor detergent with Fresh Apple fragrance. Fast-drying, non-sticky, eliminates odor-causing bacteria, glossy clean finish.',
      prod_3_spec1_label: 'Scent:',
      prod_3_spec1_val: 'Fresh Crisp Apple',
      prod_3_spec2_label: 'Surface Finish:',
      prod_3_spec2_val: 'Glossy & Non-Sticky',

      // Product 4 - Body Wash
      prod_4_name: 'Liquid Body Wash',
      prod_4_desc: 'Gentle liquid body wash with rich foam and natural moisturizing formula. Deeply cleanses impurities, luxurious fresh scent, non-drying.',
      prod_4_spec1_label: 'Scent:',
      prod_4_spec1_val: 'Luxurious Fresh Floral',
      prod_4_spec2_label: 'Moisture:',
      prod_4_spec2_val: 'Hydrating & Gentle',

      // Product 5 - Glass Cleaner
      prod_5_name: 'Glass & Surface Cleaner',
      prod_5_desc: 'Streak-free cleaner for glass, tabletops & stainless steel with Apple aroma. Instant shine without water spots or dust accumulation.',
      prod_5_spec1_label: 'Scent:',
      prod_5_spec1_val: 'Crisp Apple Fresh',
      prod_5_spec2_label: 'Application:',
      prod_5_spec2_val: 'Glass, Tables & Stainless',

      // Product 6 - Car Shampoo
      prod_6_name: 'Touchless Car Shampoo',
      prod_6_desc: 'Touchless wash formulation. Quickly dissolves mud, dust & road grime, balanced neutral pH safe for clear coats & wax, high gloss finish.',
      prod_6_spec1_label: 'Formula:',
      prod_6_spec1_val: 'Touchless Active Foam',
      prod_6_spec2_label: 'pH Balance:',
      prod_6_spec2_val: 'pH 7.0 Neutral Coat Safe',

      // Product 7 - Laundry Detergent
      prod_7_name: 'Commercial Laundry Detergent',
      prod_7_desc: 'Concentrated formula with lasting luxurious Dony scent. Rich suds, fast rinse, removes tough stains effectively while keeping fabric colors vibrant.',
      prod_7_spec1_label: 'Scent:',
      prod_7_spec1_val: 'Luxurious Dony Fresh',
      prod_7_spec2_label: 'Washing Power:',
      prod_7_spec2_val: 'High Concentrate Fast Rinse',

      // Product 8 - Laundry Perfume
      prod_8_name: 'Premium Laundry Perfume',
      prod_8_desc: 'Grade-A apparel perfume essence. Freshness endures for weeks without yellow spots on linens or garments. Options: Dony, Sakura, Snappy & Custom.',
      prod_8_spec1_label: 'Durability:',
      prod_8_spec1_val: 'Lasts for Weeks',
      prod_8_spec2_label: 'Fabric Care:',
      prod_8_spec2_val: 'Zero Yellow Staining',

      // Form Calculator / WhatsApp
      form_badge: 'QUICK & EASY CALCULATOR',
      form_title: '5L Bulk Supply Calculator & Quotation Request',
      form_desc: 'Submit your business details below. Our system will generate a pre-formatted official order draft directly to our marketing WhatsApp desk.',
      form_label_name: 'Full Name / Contact Person:',
      form_placeholder_name: 'e.g. Mr. Hendra Wijaya',
      form_label_company: 'Business / Company Name:',
      form_placeholder_company: 'e.g. Grand Emerald Hotel & Resort',
      form_label_sector: 'Industry Sector:',
      form_sector_select: 'Select Business Sector',
      form_sector_hotel: 'Hotel & Hospitality',
      form_sector_resto: 'Restaurant, Cafe & Catering',
      form_sector_laundry: 'Commercial & Retail Laundry',
      form_sector_carwash: 'Car Wash & Detailing Studio',
      form_sector_hospital: 'Clinic, Hospital & Healthcare',
      form_sector_office: 'Office Building & Manufacturing',
      form_sector_other: 'Other / Distributor',
      form_label_product: 'Primary Product Needed:',
      form_product_select: 'Select Required Product',
      form_label_qty: 'Estimated Volume (5L Cans / Month):',
      form_placeholder_qty: 'e.g. 30 Cans / Month',
      form_label_notes: 'Special Requests / Sample Inquiry:',
      form_placeholder_notes: 'Specify any special requirements, free sample requests, or target delivery schedules...',
      form_btn_submit: 'Send Official Quotation Request via WhatsApp',

      // CTA Banner
      cta_badge: 'INDONESIAN HORECA PARTNER',
      cta_title: 'Ready to Optimize Your Facility Cleaning Costs?',
      cta_desc: 'Get free expert consultation, direct first-hand wholesale pricing, and product trial samples straight from Diamond Clean.',
      cta_btn_consult: 'Free Consultation Now',
      cta_btn_catalog: 'Dosage Guide & Catalog',

      // Page: About Us
      about_hero_badge: 'COMPANY PROFILE',
      about_hero_title: 'About Diamond Clean Indonesia',
      about_hero_desc: 'Trusted manufacturer & distributor of high-concentrate 5L cleaning chemical solutions for hospitality, commercial laundry, and automotive partners.',
      about_vision_title: 'Our Vision',
      about_vision_desc: 'To be the leading industrial 5L cleaning chemical and bulk soap provider in Indonesia, recognized for unmatched quality, cost efficiency, and halal integrity.',
      about_mission_title: 'Our Mission',
      about_mission_desc: 'To manufacture safe, biodegradable concentrate cleaning formulations while providing dependable, continuous supply chains for all business partners.',

      // Page: Solutions / Product Catalogue
      solutions_hero_badge: 'FULL 5L CATALOGUE',
      solutions_hero_title: 'Complete 5L Bulk Chemical & Soap Solutions',
      solutions_hero_desc: 'High-grade concentrate formulations adhering to hygienic standards to maximize operational and budgetary efficiency.',
      solutions_dosage_title: 'Recommended Dosage & Product Characteristics',
      solutions_dosage_desc: 'Use the reference guide below to achieve optimal cleaning results with the lowest cost per washing portion.',

      // Page: Industries
      industries_hero_badge: 'INDUSTRY SECTORS',
      industries_hero_title: 'Tailored Cleaning Formulations for Every Sector',
      industries_hero_desc: 'Every commercial sector has unique hygiene challenges. Diamond Clean delivers specialized formulas for Hotels, Restaurants, Laundries, and Auto Centers.',

      // Page: Certifications / Sustainability
      sustain_hero_badge: 'QUALITY & COMPLIANCE',
      sustain_hero_title: 'Hygienic Standards & Halal Certification',
      sustain_hero_desc: 'Safety, religious compliance, and ecological responsibility form the core foundation of every single drop of Diamond Clean formulations.',

      // Page: Contact Us
      contact_hero_badge: 'REACH OUR DESK',
      contact_hero_title: 'Consultation & Supply Services',
      contact_hero_desc: 'Contact our marketing team for 5L soap inquiries, complimentary trial samples, and the best direct manufacturer wholesale quotes.'
    }
  };

  /**
   * Get current language ('id' or 'en')
   */
  function getCurrentLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'id') return stored;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  /**
   * Translate all DOM elements tagged with data-i18n, data-i18n-placeholder, etc.
   */
  function applyTranslations(lang) {
    const dict = translations[lang] || translations[DEFAULT_LANG];
    if (!dict) return;

    // 1. Text / HTML elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.getAttribute('data-i18n-html') === 'true') {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 2. Placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // 3. Update HTML lang attribute
    document.documentElement.lang = lang;

    // 4. Update language toggle button states
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

    // 5. Dispatch event for dynamic widgets (video player, WA quote)
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { lang, dict }
    }));
  }

  /**
   * Public function to switch language
   */
  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'id') lang = DEFAULT_LANG;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyTranslations(lang);
  }

  // Expose global i18n object
  window.DiamondI18n = {
    get: getCurrentLanguage,
    set: setLanguage,
    translations: translations,
    apply: applyTranslations
  };

  // Immediate init on DOMContentLoaded or if DOM is already loaded
  function init() {
    const initialLang = getCurrentLanguage();
    applyTranslations(initialLang);

    // Global event delegation for any .lang-btn clicks
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
