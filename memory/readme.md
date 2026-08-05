# Memory Project

Dokumen ini digunakan untuk mencatat riwayat pekerjaan, keputusan arsitektur, dan perubahan penting yang telah dilakukan dalam project ini.

## Riwayat Perubahan

### 2026-07-22 — Inisialisasi Project & Landing Page
- **Struktur Pendukung**: Membuat 3 folder utama: `memory/`, `to-do/`, `konteks/`
- **Konsep Desain**: Menerima referensi desain landing page tropis premium (awalnya bernama "UMA CANGGU").
- **Keputusan Teknis**: Memilih menggunakan **Vite + HTML + Tailwind CSS** (agar performa optimal dan loading sangat cepat).
- **Implementasi Halaman Utama**:
  - Membuat `package.json`, `tailwind.config.js`, `postcss.config.js`, `style.css`.
  - Menyusun `index.html` dengan elemen semantik modern untuk **Jineng GuestHouse**.
  - Menyusun `main.js` untuk kontrol scroll navbar dan validasi input tanggal booking.
  - **Perbaikan & Optimasi Desain**:
    - Memindahkan padding `py-6` dari `div` dalam ke tag `<header>` pada navbar agar transisi tinggi navbar saat scroll menjadi halus.
    - Menambahkan animasi `animate-fade-in` kustom beserta keyframes-nya di `tailwind.config.js` agar hero image memudar masuk dengan halus saat pertama kali dibuka.

### 2026-07-23 — Halaman Checkout & Pembayaran Dinamis
- **Pembuatan Halaman Checkout (`checkout.html`)**:
  - Mengimplementasikan formulir Data Tamu, pilihan pembayaran (Credit Card, Bank Transfer, E-Wallet), dan ringkasan harga.
- **Penyusunan Script Interaktif (`checkout.js`)**:
  - Logika toggle form pembayaran (CC / Bank Transfer / E-Wallet QRIS) secara dinamis.
  - Menambahkan auto-format input nomor kartu (spasi tiap 4 digit) dan masa kedaluwarsa (slash `/` otomatis).
  - Integrasi pesan pemesanan otomatis ke WhatsApp admin dan modal overlay resi sukses.
- **Integrasi Alur Halaman**:
  - Mengubah form submit di landing page agar mengalihkan user ke halaman checkout dengan query params data booking (`checkin`, `checkout`, `quantity`).
- **Konfigurasi Build Multi-page**:
  - Membuat file `vite.config.js` untuk menangani bundel multi-page (`index.html` & `checkout.html`).
- **Status Build**: Berhasil dikompilasi dengan lancar. Output produksi di folder `dist/` (HTML: 19.94 kB & 17.50 kB, CSS: 20.45 kB, JS: 0.96 kB & 8.92 kB).

### 2026-07-30 — Integrasi Aset Gambar Real & Pembaruan Konten Informasi
- **Penggantian Foto/Gambar Real**:
  - Mengganti seluruh link placeholder gambar external dengan aset foto asli dari folder `assets/`.
  - **Hero Background**: Menggunakan foto lorong taman tropis dengan jalan setapak batu (`WhatsApp Image 2026-07-27 at 12.03.36.jpeg`).
  - **The Jineng Suite Showcase**: Menggunakan foto kamar mezzanine kasur king & atap kayu Jineng (`...32.jpeg`), tangga kayu mezzanine & dinding bata ekspos (`...33.jpeg`), serta lounge tempat duduk kayu jati (`...34.jpeg`).
  - **Showcase Galeri Pengalaman**: Menambahkan section galeri 3 kartu visual baru yang menampilkan teras depan kamar "RAMA" (`...35.jpeg`), pantry semi-outdoor (`...35 (1).jpeg`), serta aksen interior kayu & bata (`...34 (1).jpeg`).
  - **Location & Signboard**: Menggunakan foto asli plang pintu masuk depan **JINENG GUEST HOUSE D47** (`WhatsApp Image 2026-07-30 at 09.15.21.jpeg`).
  - **Checkout Summary**: Menggunakan thumbnail foto kamar suite mezzanine asli (`...32.jpeg`).
- **Pembaruan Konten Real**:
  - **Kontak WhatsApp**: Memperbarui nomor telepon WhatsApp admin menjadi `+62 851-1104-4817` (`085111044817`).
  - **Alamat**: Mengatur alamat lengkap menjadi `Jineng Guest House D47, Canggu, Bali, Indonesia`.
  - **Tarif Malam**: Menyesuaikan tarif per malam menjadi dari `$35` (Rp 500rb-an) per malam di `index.html` dan `checkout.js`.
  - **Deskripsi & Fasilitas**: Memperbarui penjelasan Jineng Suite sesuai karakteristik asli (mezzanine loft, dinding bata merah ekspos, pantry semi-outdoor, lounge kayu jati, smart TV, Wi-Fi cepat, & AC).
- **Fitur Baru Tambahan**:
  - **Sanctuary Gallery Filter & Lightbox Modal**: Penambahan section galeri interaktif dengan filter kategori (*ALL, BEDROOM & LOFT, KITCHEN & PANTRY, GARDEN & OUTDOOR*) dan fitur Lightbox Modal (klik foto untuk Zoom View full-screen).
  - **Guest Reviews / Testimonials**: Kartu ulasan bintang 5 autentik dari tamu mancanegara & domestik beserta lencana *Verified Stay*.
  - **FAQ Accordion**: 5 pertanyaan umum yang dapat di-expand/collapse secara interaktif untuk menjawab pertanyaan seputar check-in, fasilitas, lokasi, parkir, dan pembayaran.
  - **Optimasi SEO**: Menambahkan meta description, Open Graph (OG) tags social preview, dan Favicon SVG 🌿.
- **Status Build**: Berhasil di-build tanpa error dengan Vite v5. All assets bundled to `dist/assets/`.

### 2026-07-31 — Perbaikan Ukuran Gambar Order Summary Checkout
- **Akar Masalah**: Konfigurasi Tailwind `tailwind.config.js` sebelumnya hanya mendaftarkan `./index.html` dan `./main.js`, sehingga class `w-20` dan `h-20` pada `<img ...>` di `checkout.html` tidak di-generate oleh Tailwind. Hal ini menyebabkan foto kamar dalam ringkasan pesanan (*Order Summary*) melebar memenuhi layar.
- **Solusi & Perbaikan**:
  - Memperbarui `content` di `tailwind.config.js` menjadi `["./*.html", "./*.js"]` agar seluruh halaman HTML & script JS di-scan dan di-compile sempurna oleh Tailwind CSS.
  - Menambahkan pembatasan ukuran eksplisit (`style="width: 80px; height: 80px; min-width: 80px; max-width: 80px; min-height: 80px; max-height: 80px;"`) serta class `shrink-0` pada elemen gambar thumbnail di [checkout.html](file:///c:/Users/bhisma/OneDrive/Desktop/CODINGERS/project%20villa%20fix/Jineng%20GuestHouse/checkout.html).
- **Status Build**: `npm run build` berhasil dijalankan ulang, stylesheet produksi diperbarui (29.48 kB) dengan tampilan gambar yang kini rapi dan proporsional.

### 2026-07-31 — Redesain Estetika Modal Konfirmasi Booking ("Booking Confirmed!")
- **Akar Masalah**:
  1. Ikon SVG WhatsApp pada tombol konfirmasi di [checkout.js](file:///c:/Users/bhisma/OneDrive/Desktop/CODINGERS/project%20villa%20fix/Jineng%20GuestHouse/checkout.js) tidak memiliki batasan dimensi eksplisit sehingga melebar raksasa memenuhi layar dan menutupi teks tombol.
  2. Modal overlay tidak memiliki pembatas tinggi maksimal (`max-h-[90vh] overflow-y-auto`), sehingga tampilan terpotong secara vertikal pada layar laptop/desktop.
- **Solusi & Perbaikan**:
  - Menambahkan styling inline tegas pada SVG WhatsApp (`width: 20px; height: 20px; flex-shrink: 0`) agar ukurannya presisi dan selalu proporsional.
  - Memperbarui layout modal dengan desain tropis modern: sudut membulat halus (`rounded-3xl`), padding responsif (`p-6 sm:p-8`), scrollbar bawaan jika konten tinggi (`max-h-[90vh] overflow-y-auto`), dan badge sukses `check_circle` beraksen Sage Green.
  - Menata ulang kotak detail pesanan (*Sanctuary, Check-in, Check-out, Duration, Payment Method, Total Amount*) serta kotak instruksi pembayaran agar tampak mewah dan rapi.
- **Status Build**: `npm run build` berhasil di-generate (Vite v5).



