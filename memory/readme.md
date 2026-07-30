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
- **Status Build**: Berhasil di-build tanpa error dengan Vite v5. All assets bundled to `dist/assets/`.

