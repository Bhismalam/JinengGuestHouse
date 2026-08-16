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
- **Backend / Data**: Supabase (Postgres + auto REST API via `@supabase/supabase-js`) — dipakai untuk cek ketersediaan kamar real-time & menyimpan booking. Tidak ada server Node custom; frontend statis memanggil Supabase langsung.
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
├── supabase/
│   └── schema.sql   → skema tabel bookings, RLS, & view booking_availability [NEW]
├── index.html       → halaman utama
├── checkout.html    → halaman checkout
├── main.js          → logika landing page (termasuk cek ketersediaan)
├── checkout.js       → logika halaman checkout (re-check & simpan booking)
├── supabaseClient.js → konfigurasi klien Supabase [NEW]
├── availability.js   → helper cek ketersediaan kamar [NEW]
├── style.css        → stylesheet utama (Tailwind)
├── tailwind.config.js
├── postcss.config.js
├── .env.example     → contoh variabel env Supabase [NEW]
├── package.json
└── package-lock.json
```

## Konfigurasi Supabase
1. Buat project gratis di supabase.com.
2. Jalankan isi `supabase/schema.sql` di Supabase SQL Editor (bikin tabel `bookings`, RLS insert-only untuk publik, dan view `booking_availability` untuk cek ketersediaan tanpa membocorkan data tamu).
3. Copy `.env.example` → `.env`, isi `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` dari dashboard project.
4. Kelola status booking (confirm/cancel) langsung lewat Table Editor Supabase — belum ada panel admin custom.

## Konsep Estetika & Desain
Mengadopsi gaya **Tropical Minimalism** dengan warna dasar earth-tone:
- **Primary** (sage green): `#475647`
- **Secondary** (terakota): `#8e4d2e`
- **Background** (warm sand): `#faf9f6`

## Alur Pengguna (User Flow)
1. **Landing Page**: Pengguna masuk ke website, disajikan pemandangan visual tropical escape (Hero Section) dan info ringkas villa.
2. **Booking Bar (Melayang)**: Pengguna memasukkan tanggal Check-in, Check-out, dan jumlah kamar/kapasitas, lalu menekan "Check Availability" — sistem mengecek ketersediaan real-time ke Supabase (total 2 unit kamar identik) sebelum menampilkan tombol lanjut ke Checkout.
3. **Showcase Suite**: Pengguna menjelajahi detail kamar (The Suite), fitur-fiturnya, harga per malam, dan foto-foto interior.
4. **Elevated Essentials & Location**: Pengguna melihat fasilitas utama serta peta/posisi strategis guesthouse di Bali.
5. **Action**: Tombol "Book Now" dan "Reserve Now" mengarahkan pengguna ke halaman **Checkout** (`checkout.html`).
6. **Checkout & Payment**: Pengguna mengisi data tamu, memilih metode pembayaran (Credit Card, Bank Transfer, E-Wallet), lalu menekan tombol "Confirm and Pay" untuk menyelesaikan pesanan (simulasi/tautan konfirmasi WA).
