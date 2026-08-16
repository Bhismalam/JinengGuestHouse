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
- [ ] Deploy ke hosting (Vercel / Netlify / cPanel)
- [ ] **Setup Supabase project** (user): buat project di supabase.com, jalankan `supabase/schema.sql`, isi `.env` dari `.env.example`
- [ ] Uji end-to-end fitur cek ketersediaan setelah Supabase dikonfigurasi (lihat langkah verifikasi di `konteks/readme.md`)
- [ ] (Opsional, nanti) Panel admin kelola booking — untuk saat ini pakai Table Editor Supabase langsung
