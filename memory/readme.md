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

### 2026-08-05 — Perbaikan Gambar & Tampilan Modal di Checkout
- Thumbnail Order Summary di `checkout.html` diubah dari pembatasan 80x80px kaku (inline style) menjadi `w-24 h-24` yang lebih rapi.
- Modal "Booking Confirmed!" dirombak ulang: kotak detail pesanan & instruksi pembayaran (Bank Transfer/QRIS) dibuat lebih informatif dengan ikon, termasuk detail rekening bank (BCA/Mandiri) langsung di instruksi transfer.
- **Status Build**: `npm run build` berhasil (Vite v5).

### 2026-08-06 — Perbaikan Link Google Maps & Redesain Struktur index.html
- Memperbaiki link/embed Google Maps di section Location.
- Merapikan ulang format indentasi & struktur `index.html` (doctype lowercase, atribut multi-baris) tanpa mengubah konten/fungsi.
- **Status Build**: `npm run build` berhasil (Vite v5).

### 2026-08-09 — Smooth Scroll Navbar & Perbaikan Lightbox Galeri
- Menambahkan smooth scroll kustom di `main.js` untuk semua link anchor (`a[href^="#"]`), dengan offset dinamis mengikuti tinggi navbar (`#main-nav`) supaya section tidak tertutup navbar saat di-scroll ke.
- Menambahkan `scroll-mt-*` di tiap section (`#suite`, `#gallery`, `#amenities`, dst.) agar anchor scroll mendarat pas di bawah navbar.
- Merombak transisi lightbox galeri (fade + scale animasi CSS transition, bukan `animate-fade-in` Tailwind) agar buka/tutup lebih halus.
- **Status Build**: `npm run build` berhasil (Vite v5).

### 2026-08-16 — Perbaikan Responsif Mobile & Fitur Cek Ketersediaan Kamar Real-Time
- **Navbar Mobile**: Menambahkan tombol hamburger (`#mobile-menu-toggle`) & panel dropdown (`#mobile-menu`) di `index.html` karena sebelumnya link navigasi (`hidden md:flex`) hilang total tanpa pengganti di layar mobile.
- **Perbaikan Logo Wrap**: Logo "JINENG GUESTHOUSE" memakai `text-headline-md` (32px) tanpa `whitespace-nowrap` sehingga wrap 2 baris di layar sempit, membuat tinggi header melebihi asumsi `pt-[100px]` pada `<main>` dan menutupi hero + form booking. Diperbaiki dengan ukuran font responsif (`text-lg sm:text-2xl md:text-headline-md`) + `whitespace-nowrap`.
- **Perbaikan Form Booking Terpotong**: Section hero punya `overflow-hidden`, sedangkan form booking mengambang keluar section (`-bottom-8`) sehingga tombol "Check Availability" ter-clip. `overflow-hidden` dihapus dari section (gambar background tetap aman karena punya div `overflow-hidden` terpisah).
- **Fitur Baru — Cek Ketersediaan Kamar Real-Time (Supabase)**:
  - Sebelumnya "Check Availability" hanya validasi tanggal lalu langsung redirect ke checkout — tidak ada pengecekan inventori sama sekali.
  - Menambahkan Supabase (Postgres + `@supabase/supabase-js`) sebagai backend: tabel `bookings`, RLS insert-only untuk publik, dan view `booking_availability` (tanpa data tamu) untuk query publik. Skema di `supabase/schema.sql`.
  - Model kamar: 2 unit identik total. "1 Room (Jineng Suite)" = 1 unit, "Entire Property" = 2 unit.
  - `availability.js` menghitung overlap tanggal vs kapasitas 2 unit. Homepage (`main.js`) menampilkan hasil inline (tersedia → tombol lanjut ke checkout; penuh → pesan alternatif) alih-alih redirect langsung.
  - `checkout.js` melakukan re-check ketersediaan (guard race condition) + insert booking `status='pending'` ke Supabase sebelum modal sukses ditampilkan — sehingga tanggal langsung terkunci begitu checkout selesai.
  - `supabaseClient.js` sengaja tidak throw saat `.env` belum diisi (pakai stub client) — supaya seluruh `main.js` tidak ikut rusak jika Supabase belum dikonfigurasi.
  - Admin mengelola status booking (confirm/cancel) langsung dari Supabase Table Editor — belum ada panel admin custom.
- **Status Build**: `npm run build` berhasil (Vite v5). Fitur availability belum bisa diuji end-to-end sampai user membuat project Supabase & mengisi `.env` (lihat `.env.example` dan `supabase/schema.sql`).

### 2026-08-16 — Setup Supabase Selesai & Verifikasi End-to-End
- User membuat project Supabase (ref `typlsvicnjwhvxrhvntx`) dan menjalankan `supabase/schema.sql` lewat SQL Editor.
- **Bug ditemukan saat setup**: `.env` awalnya hanya diisi `VITE_SUPABASE_ANON_KEY`, sementara `VITE_SUPABASE_URL` masih placeholder `your-project-ref.supabase.co` — diperbaiki dengan decode klaim `ref` dari JWT anon key (data publik di dalam key itu sendiri, bukan rahasia) untuk mendapatkan URL project yang benar.
- **Verifikasi langsung ke Supabase REST API** (tanpa browser, karena tidak ada chromium-cli/Playwright di environment ini):
  - Query `booking_availability` sebelum ada data → kosong, konfirmasi schema ter-apply.
  - Insert booking test (tanggal dummy `2099-01-01`–`2099-01-02`, `guest_name: "TEST DELETE ME"`) via anon key → berhasil (201), konfirmasi RLS insert-only bekerja.
  - View `booking_availability` langsung menampilkan booking baru tanpa data tamu; query langsung ke tabel `bookings` mentah mengembalikan array kosong untuk anon → konfirmasi data tamu (nama/email/telepon) tidak bisa dibaca publik.
  - Query overlap tanggal (logic yang sama dengan `availability.js`) diuji manual: tanggal bertabrakan → terdeteksi 1 unit terpakai; tanggal tidak bertabrakan → kosong/tersedia penuh. Akurat.
  - `npm run build` setelah `.env` terisi benar → chunk `availability.js` kembali penuh ~221KB (sebelumnya di-tree-shake jadi ~1.4KB saat `.env` kosong), konfirmasi Supabase client ter-bundle dengan benar.
- **Belum dibereskan**: baris booking percobaan (`TEST DELETE ME`) masih ada di tabel `bookings` — anon key tidak punya izin SELECT/DELETE (RLS), jadi harus dihapus manual oleh user lewat Table Editor.
- **Diskusi push ke GitHub**: `.env` sudah otomatis aman berkat `.gitignore` yang dibuat sebelumnya (dan belum pernah ter-commit di riwayat manapun) — user diarahkan untuk tetap `git status` sebelum commit dan pastikan `.gitignore` ikut ter-push.
