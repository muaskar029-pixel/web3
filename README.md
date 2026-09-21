# 🛡️ ShieldChain

**ShieldChain** adalah platform MVP intelijen risiko Web3 untuk pengguna Indonesia. Platform ini memungkinkan pengunjung (*Web2*) untuk memeriksa tautan, domain, atau alamat EVM yang mencurigakan menggunakan AI. Di sisi lain, *Validator* (*Web3*) dapat menghubungkan dompet kripto mereka, melakukan *staking*, menganalisis bukti, dan memberikan *vote* konsensus langsung di *blockchain*.

> **Pembaruan Arsitektur:** Proyek ini telah bertransformasi dari simulasi lokal menjadi aplikasi *Full-Stack* yang menggunakan **PostgreSQL (Neon DB)**, **Google Gemini AI**, dan **Smart Contract (Wagmi + Privy)**.

---

## Panduan Memulai (Getting Started)

Panduan ini dibuat agar anggota tim yang baru bergabung bisa langsung menjalankan proyek ini di komputernya masing-masing dengan mudah.

### 1. Persyaratan Sistem (Prerequisites)
Pastikan kamu sudah menginstal perangkat lunak berikut di komputermu:
- **Node.js** (Versi 22.16 ke atas, disarankan versi terbaru).
- **pnpm** (Package manager, disarankan versi 12.5.1).
  *(Jika belum ada `pnpm`, jalankan perintah `npm install -g pnpm` di terminal).*

### 2. Persiapan Environment Variables (`.env.local`)
Proyek ini butuh kunci rahasia agar bisa terhubung ke Database, AI, dan Blockchain. 
1. Buat file baru bernama `.env.local` di folder utama proyek.
2. *Copy-paste* template di bawah ini, dan minta nilainya dari tim (atau *tech lead*):

```env
# Koneksi Database & AI (Backend)
DATABASE_URL=postgresql://...          # Dari dashboard Neon DB / Vercel
GEMINI_API_KEY=...                     # Dari Google AI Studio

# Web3 & Auth (Frontend)
NEXT_PUBLIC_PRIVY_APP_ID=...           # Dari dashboard Privy.io
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...     # Alamat Smart Contract yang sudah di-deploy temanmu
NEXT_PUBLIC_CHAIN_ID=11155111          # ID jaringan testnet (contoh: 11155111 untuk Sepolia)
```

### 3. Instalasi dan Menjalankan Aplikasi
Buka terminalmu, pastikan kamu berada di dalam folder proyek ini, lalu jalankan perintah berikut secara berurutan:

```bash
# 1. Install semua paket (dependencies) proyek
pnpm install

# 2. Update struktur tabel ke database (Wajib dilakukan sekali di awal)
npx drizzle-kit push

# 3. Nyalakan server!
pnpm dev
```

Buka **`http://localhost:3000`** di browsermu. Selamat, proyek ShieldChain sudah berjalan! 🎉

---

## 🏗️ Struktur Folder (Buat Navigasi Tim)

Jangan bingung pas pertama kali buka *codebase*, ini contekan folder-folder pentingnya:

- **`src/app/`** ➡️ Routing halaman (URL). Kalau mau ubah layout atau tambah halaman API baru, di sini tempatnya.
- **`src/components/`** ➡️ Komponen UI yang bisa dipakai ulang (tombol, *navbar*, popup *dialog*).
- **`src/features/`** ➡️ Logika utama halaman (seperti halaman *Scan*, *Validator*, *Ledger*, dan *Tracking*). Fokus pengerjaan UI seringnya di sini.
- **`src/lib/`** ➡️ Tempat mesin di belakang layar (AI, koneksi Database Drizzle, fungsi *Web3/Smart Contract*).
- **`docs/`** ➡️ Kumpulan dokumentasi proyek, desain arsitektur, dan referensi *wireframe*.

---

## 🗺️ Alur Kerja Halaman (Routing)

| URL Halaman                 | Fungsi & Penjelasan Singkat                                      |
| --------------------------- | ---------------------------------------------------------------- |
| `/`                         | Halaman depan (Landing Page) & form pencarian utama.             |
| `/scan`                     | Halaman khusus untuk submit tautan/wallet yang dicurigai.        |
| `/tracking?case={id}`       | Menampilkan hasil laporan AI dan status *real-time* tiket.       |
| `/validator`                | Dasbor rahasia Validator Web3 (Antrean kasus yang butuh di-vote).|
| `/validator/cases/{caseId}` | Halaman Validator untuk membaca bukti dan memencet tombol *Vote*.|
| `/ledger`                   | Buku besar pencatatan transaksi yang transparan.                 |
| `/methodology`              | Penjelasan cara kerja sistem (untuk dibaca pengunjung).          |

---

## 🛠️ Perintah Tambahan untuk Developer (Opsional)

Jika kamu ingin mengecek kualitas kode sebelum melakukan *Push/Commit* ke GitHub, gunakan perintah ini:

```bash
pnpm typecheck   # Mengecek error TypeScript (wajib lolos!)
pnpm lint        # Merapikan dan mengecek standar penulisan kode
pnpm build       # Mensimulasikan build untuk tahap Production (sangat disarankan sebelum pull request)
pnpm test        # Menjalankan unit test
```

*Dokumen proyek asli kini dipindahkan dan dirapikan di dalam folder `docs/specs/` dan `docs/design/`.*
