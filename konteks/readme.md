# Konteks & Perencanaan Project

Dokumen ini digunakan untuk menyimpan perencanaan project, alur kerja (flow), arsitektur, dan konteks sistem yang akan dibangun.

## Informasi Project
- **Nama**: Jineng GuestHouse
- **Tipe**: Landing page website untuk villa/guesthouse di Bali
- **Lokasi**: Canggu, Bali, Indonesia
- **Referensi Desain Awal**: Template "UMA CANGGU" (tropical minimalism)

## Tech Stack
- **Build Tool**: Vite v5
- **Styling**: Tailwind CSS v3 (di-build, bukan CDN)
- **Bahasa**: HTML5 + Vanilla JavaScript (ES Module)
- **Font**: Libre Caslon Text (headline) + Plus Jakarta Sans (body)
- **Ikon**: Google Material Symbols Outlined

## Struktur File Project
```
Jineng GuestHouse/
├── memory/          → riwayat pekerjaan & keputusan
├── to-do/           → daftar tugas
├── konteks/         → perencanaan & arsitektur (file ini)
├── dist/            → output build produksi
├── node_modules/    → dependensi npm
├── index.html       → halaman utama
├── checkout.html    → halaman checkout [NEW]
├── main.js          → logika landing page
├── checkout.js      → logika halaman checkout [NEW]
├── style.css        → stylesheet utama (Tailwind)
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── package-lock.json
```

## Konsep Estetika & Desain
Mengadopsi gaya **Tropical Minimalism** dengan warna dasar earth-tone:
- **Primary** (sage green): `#475647`
- **Secondary** (terakota): `#8e4d2e`
- **Background** (warm sand): `#faf9f6`

## Alur Pengguna (User Flow)
1. **Landing Page**: Pengguna masuk ke website, disajikan pemandangan visual tropical escape (Hero Section) dan info ringkas villa.
2. **Booking Bar (Melayang)**: Pengguna memasukkan tanggal Check-in, Check-out, dan jumlah kamar/kapasitas.
3. **Showcase Suite**: Pengguna menjelajahi detail kamar (The Suite), fitur-fiturnya, harga per malam, dan foto-foto interior.
4. **Elevated Essentials & Location**: Pengguna melihat fasilitas utama serta peta/posisi strategis guesthouse di Bali.
5. **Action**: Tombol "Book Now" dan "Reserve Now" mengarahkan pengguna ke halaman **Checkout** (`checkout.html`).
6. **Checkout & Payment**: Pengguna mengisi data tamu, memilih metode pembayaran (Credit Card, Bank Transfer, E-Wallet), lalu menekan tombol "Confirm and Pay" untuk menyelesaikan pesanan (simulasi/tautan konfirmasi WA).
