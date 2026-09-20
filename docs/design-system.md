# Sistem desain

Reading this as: aplikasi intelijen risiko untuk pengguna Indonesia, dengan visual cybersecurity yang tenang, menggunakan shadcn, Tailwind dan tipografi Geist.

Greenfield. `DESIGN_VARIANCE: 4`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 4`. Desain landing mengikuti design-taste-frontend; layar aplikasi mengikuti kebutuhan kerja dalam master prompt. Ikon Lucide dipilih karena diminta eksplisit oleh master prompt.

## Tokens

Sumber utama: `src/app/globals.css`.

| Token      | Gelap     | Terang    |
| ---------- | --------- | --------- |
| Background | `#0a111b` | `#f5f8fa` |
| Surface    | `#101b28` | `#fcfdfe` |
| Text       | `#edf3f8` | `#172b39` |
| Muted      | `#a3b2c3` | `#506574` |
| Primary    | `#67d0e4` | `#096a83` |
| Border     | `#233345` | `#d4dfe6` |

Cyan adalah aksen brand. Hijau, amber, dan merah hanya mengomunikasikan status dengan teks/ikon pendamping. Seluruh halaman mengikuti satu tema; preferensi sistem menjadi default, toggle disimpan melalui adapter.

Geist dipakai untuk narasi dan antarmuka; Geist Mono untuk alamat, hash, dan skor. Font disertakan lewat dependency lokal dan `next/font/local`; tidak membutuhkan akses Google Fonts saat build.

Panel 16px, tombol/input 10px, badge berbentuk pill. Skala ini berlaku untuk semua halaman. Layout maksimum 1280px; gutter desktop 48px, tablet 32px, mobile 16px. Breakpoint utama 768/1024/1280/1536.

Layer CSS: navigasi 20, dialog 50, toast 60. Tidak ada z-index dekoratif.

## Aksesibilitas dan interaksi

- Label form terlihat, helper dan error berkaitan dengan input.
- Dialog resmi shadcn/Radix menyediakan focus trap, Escape dan pengembalian fokus.
- Semua kontrol dapat diakses keyboard; skip link menuju `main`.
- Feedback melalui inline error dan live region. Risiko tidak bergantung pada warna saja.
- Motion hanya untuk feedback tombol, dialog dan indikator analisis; `prefers-reduced-motion` mematikan animasi.
- Ledger beralih dari tabel ke kartu pada mobile. Grid multipanel menjadi satu kolom.
- Skor risiko di layar aplikasi memakai tiga panel sejajar untuk perbandingan, mengikuti kebutuhan produk. Landing memakai daftar penjelasan dan komponen hasil nyata sebagai contoh, bukan dashboard dekoratif.

## Aset

Aset dibuat dengan tool imagegen bawaan, lalu dikonversi secara mekanis menjadi WebP lokal untuk mengurangi ukuran. Prompt lengkap ada di `assets.md`.

- `public/images/shield-hero-cutout.webp`: ilustrasi hero perisai kaca/titanium dengan latar transparan agar konsisten di dua tema.
- `public/images/community-network.webp`: jaringan blok kaca untuk bagian validasi komunitas.

Tidak ada klaim mitra, logo pelanggan, testimoni, atau statistik penggunaan yang dibuat-buat.
