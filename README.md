# Diamond Clean — Enterprise B2B Website & Company Profile

Website company profile berstandar enterprise untuk **Diamond Clean** — supplier resmi chemical pembersih dan sabun konsentrat tinggi (kemasan 5L & curah 20L) untuk sektor **Hotel, Restoran, Café, Laundry, Car Wash, dan Fasilitas Komersial**.

Dibangun mengadopsi arsitektur sistem desain dan tata letak berkelas tinggi seperti **Bumigas**, dengan fitur pembeda utama: **Video Showcase Section interaktif di halaman Beranda (HOME)**.

---

## 🌟 Fitur Utama Website

1. **Arsitektur Enterprise Bumigas**:
   - `css/style.css`: Token warna, tipografi (`Poppins` & `Inter`), reset modern, dan smooth scroll.
   - `css/components.css`: Navigasi transparan ke solid saat scroll (`header.scrolled`), mobile drawer menu, button variants, glassmorphism cards, dan 60fps smooth accordion FAQ.
   - `css/pages.css`: Hero section sinematik, tata letak Video Showcase, grid simetris 8 produk (4 atas, 4 bawah), alur distribusi 5 tahap, dan responsif lintas perangkat.
   - `js/main.js`: Scroll reveal, animated counter stats (500+, 7, 100%, 35%), FAQ accordion, controller video kustom, dan WhatsApp quotation builder.

2. **✨ Video Showcase Section di Beranda (HOME)**:
   - Pemutar video HTML5 responsif 16:9 dengan kontrol play/pause kustom, tombol audio mute/unmute, dan overlay judul.
   - **3 Tab Penggantian Topik Video**:
     1. *Profil & Kemasan 5L*
     2. *Uji Kinerja & Busa Pembersih*
     3. *Standar Higienitas Halal*
   - Dilengkapi file video demo lokal di `assets/videos/demo-video.mp4` yang langsung aktif tanpa ketergantungan internet.

3. **8 Lini Produk Diamond Clean**:
   - **Sabun Cuci Piring**: Konsentrat jeruk nipis ampuh angkat lemak & bau amis.
   - **Sabun Cuci Tangan**: Hand soap higienis antibakteri dengan pelembab alami.
   - **Sabun Mandi (Body Wash)**: Body wash higienis pelembab alami pH 6.5 untuk hotel & spa.
   - **Pembersih Lantai**: Kilau kesat, cepat kering, aroma wangi tahan 12 jam.
   - **Pembersih Kaca dan Meja**: Streak-free cepat kering, angkat noda minyak & debu.
   - **Shampo Mobil**: Snow foam melimpah, pH netral 7.0 aman cat & coating.
   - **Detergen Cair Laundry**: Low suds hemat air ramah mesin cuci front/top load.
   - **Parfum Laundry**: Bibit wangi grade A tahan 14-21 hari di pakaian.

4. **Sertifikasi & Kepatuhan Resmi**:
   - Tampilan resmi logo **Halal Indonesia**.
   - Formula ramah lingkungan (surfaktan biodegradable).
   - Panduan takaran rasio pengenceran hemat biaya hingga 35%.

5. **Integrasi WhatsApp Langsung**:
   - Hotline Resmi: **`0882007907237`** (`https://wa.me/62882007907237`).
   - Seluruh produk dan formulir konsultasi otomatis menyusun template pesan ke WhatsApp.

---

## 📁 Struktur Berkas

```
Diamond-clean-CP/
├── index.html          # Beranda (Hero, Video Showcase, Why Choose, 8 Produk 4x2 Grid, Alur B2B, FAQ, Kontak)
├── about.html          # Profil Perusahaan (Visi, Misi, Komitmen Higienis, 8 Lini Statistik)
├── solutions.html      # Katalog Lengkap 8 Produk Sabun 5L, Spesifikasi & Tabel Pengenceran
├── industries.html     # Solusi Sektor Usaha (Hotel, Resto, Café, Laundry, Car Wash, Pabrik)
├── sustainability.html # Standar Mutu, Sertifikasi Halal Indonesia & Eco-Friendly
├── contact.html        # Kontak Langsung, Hotline WhatsApp & Generator Pesan B2B
├── product.html        # Redirect ke solutions.html (Backwards Compatibility)
├── assets/
│   ├── images/         # Logo resmi (color & white SVG), Halal logo, dan banner flyer
│   └── videos/         # Berkas video demo HTML5 (demo-video.mp4)
├── css/
│   ├── style.css       # Token warna, tipografi, resets, layout
│   ├── components.css  # Komponen UI enterprise, video player, accordion, navbar
│   └── pages.css       # Layout halaman, hero, video section, product cards
├── js/
│   └── main.js         # Interaktivitas JS, smooth transitions, video controller, counters
└── README.md           # Panduan & Dokumentasi
```

---

## 🚀 Cara Menjalankan Secara Lokal

Website ini 100% statis murni tanpa ketergantungan node_modules atau build tools:
1. Klik dua kali (double click) pada file `index.html` untuk membuka di browser apapun.
2. Atau jalankan via web server lokal (PowerShell):
   ```powershell
   cd "c:\Users\Hizkia Ariel Wijono\.gemini\antigravity\scratch\Diamond-clean-CP"
   python -m http.server 8080
   ```
   Buka peramban di `http://localhost:8080`.

---
*Dikembangkan dengan Arsitektur Enterprise B2B*
