# To-Do List

Dokumen ini digunakan untuk melacak daftar tugas (tasks) yang harus dibuat, diperbarui, dan diselesaikan dalam project ini.

## Selesai ✅
- [x] Inisialisasi struktur folder project (`memory`, `to-do`, `konteks`)
- [x] Menentukan nama brand → **Jineng GuestHouse D47**
- [x] Menentukan tech stack → **Vite + HTML + Tailwind CSS**
- [x] Menyiapkan konfigurasi project (`package.json`, `tailwind.config.js`, `postcss.config.js`)
- [x] Membuat `index.html` — landing page utama (Navbar, Hero, Booking Form, Suite, Amenities, Experience Gallery, Location, Footer)
- [x] Membuat `style.css` — Tailwind directives + custom style
- [x] Membuat `main.js` — efek scroll navbar, validasi tanggal booking, integrasi WhatsApp
- [x] Implementasi halaman Checkout (`checkout.html` & `checkout.js`)
  - [x] Buat file `checkout.html` terintegrasi dengan brand Jineng GuestHouse
  - [x] Hubungkan tombol "Book Now" dan "Reserve Now" ke halaman checkout
  - [x] Buat script `checkout.js` untuk form pembayaran interaktif (toggle Credit Card / Bank Transfer / E-Wallet)
  - [x] Tambahkan auto-format input kartu kredit & validasi input
- [x] Mengganti foto/gambar dengan aset asli Jineng GuestHouse dari folder `assets/` (Hero, Suite Showcase, Gallery, Signboard D47, Checkout thumbnail)
- [x] Menyesuaikan konten teks (deskripsi mezzanine loft & bata merah, harga $35/malam, alamat Jineng Guest House D47, nomor WA +62 851-1104-4817)
- [x] Perbaikan tampilan gambar thumbnail Order Summary di `checkout.html` (penyesuaian `tailwind.config.js` content path & inline styling pembatas ukuran 80x80px)
- [x] Re-build produksi berhasil (`npm run build`)
- [x] Navbar mobile: tambah hamburger menu (`#mobile-menu-toggle` / `#mobile-menu`) karena link navigasi hilang total di layar kecil
- [x] Perbaikan logo "JINENG GUESTHOUSE" wrap 2 baris di mobile (menutupi hero) & form booking yang terpotong (`overflow-hidden` section hero)
- [x] Fitur cek ketersediaan kamar real-time via Supabase (`supabase/schema.sql`, `supabaseClient.js`, `availability.js`) — homepage cek dulu sebelum lanjut ke checkout, checkout re-check + simpan booking `pending`
- [x] Setup Supabase project (user) — project ref `typlsvicnjwhvxrhvntx`, schema `bookings`/RLS/`booking_availability` sudah dijalankan, `.env` sudah diisi (URL sempat salah placeholder, sudah diperbaiki dari klaim `ref` di anon key)
- [x] Uji end-to-end fitur cek ketersediaan langsung ke Supabase REST API: insert booking berhasil (RLS insert-only), view availability menampilkan tanggal terpakai tanpa data tamu, tabel `bookings` mentah terbukti tidak bisa dibaca publik, logic overlap tanggal akurat
- [x] Tambah `.gitignore` (sebelumnya tidak ada) supaya `.env` tidak iksut ter-push ke GitHub

## Belum Selesai ⏳
- [ ] **Hapus booking percobaan** di Supabase Table Editor → tabel `bookings`, baris dengan `guest_name = "TEST DELETE ME"` (tanggal dummy 2099-01-01 s/d 2099-01-02), dibuat saat pengujian end-to-end
- [ ] Push project ke GitHub (`.env` sudah dipastikan ke-ignore, `.env.example` ikut di-push sebagai referensi)
- [ ] Deploy ke hosting (Vercel / Netlify / cPanel) — perlu isi env var `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` juga di dashboard hosting, bukan cuma lokal
- [ ] (Opsional, nanti) Panel admin kelola booking — untuk saat ini pakai Table Editor Supabase langsung
