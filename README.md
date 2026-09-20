# ShieldChain

Frontend MVP intelijen risiko Web3 untuk pengguna Indonesia. Pengunjung dapat memeriksa tautan, domain, alamat EVM, dan grup investasi; validator dapat membaca evidence, staking, voting, serta menelusuri reward/slashing.

**Seluruh analisis, saldo ETH, transaksi, dan konsensus adalah simulasi lokal.** Tidak ada AI API, RPC, smart contract, autentikasi, atau scanner situs aktif. Skor bukan jaminan keamanan, tuduhan hukum, nasihat investasi, atau fatwa.

## Menjalankan

Gunakan Node.js 22.16+ (disarankan Node.js 24 atau lebih baru) dan pnpm 12.5.1.

```bash
cd /home/.trash/Projects/WEB3/vibecoding
npx --yes pnpm@12.5.1 install --frozen-lockfile
npx --yes pnpm@12.5.1 dev
```

Buka http://localhost:3000. Jika pnpm sudah terpasang, cukup gunakan `pnpm install --frozen-lockfile` dan `pnpm dev`. Tidak memerlukan API key.

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm start
```

Dengan server berjalan pada port 3000:

```bash
pnpm test:e2e
```

Playwright memakai `/usr/bin/google-chrome-stable`. Pada mesin lain set `CHROME_PATH` ke executable Chrome/Chromium, atau sesuaikan `playwright.config.ts`. Screenshot tersimpan di `docs/qa/`; trace kegagalan di `test-results/`.

Gunakan `PLAYWRIGHT_BASE_URL` jika server berada di port lain. Build memakai webpack dan compiler API TypeScript 6 untuk kompatibilitas lingkungan sandbox ini; validasi tipe tetap aktif. ESLint 9 dipertahankan karena plugin React pada konfigurasi Next.js yang terpasang belum kompatibel dengan ESLint 10.

## Demo end-to-end

1. Buka beranda atau `/scan`, masukkan `claim-airdrop.example`, lalu klik **Scan Risiko**.
2. Laporan menampilkan skor teknis 92, sosial 88, dan syariah 95 beserta evidence simulasi. Biarkan tab laporan terbuka.
3. Buka `/validator` di tab kedua dengan origin yang sama. Klik **Connect Wallet**, lalu **Hubungkan wallet demo**. Saldo awal 10 ETH simulasi.
4. Tambahkan stake 0.1 ETH. Buka **Telaah Kasus**, baca bukti, pilih **Terindikasi phishing**, centang konfirmasi membaca, lalu tinjau dan konfirmasi vote.
5. Reward 0.05 ETH tercatat. Public Tracker di tab pertama diperbarui otomatis; `/ledger` menyimpan catatan transaksi.
6. Untuk skenario slashing, buat kasus baru dan pilih **Tidak ditemukan indikasi utama**. Stake dipotong 0.10 ETH. Jika stake di bawah minimum, voting terkunci hingga stake ditambah.

Target lain: `ui.ac.id` menghasilkan 5/4/2; `example.com` menghasilkan 45/50/40. Pencocokan kata hanyalah aturan demo. Kata institusi yang disisipkan pada URL pun dapat memberi skor rendah; tidak ada verifikasi identitas.

## Halaman

| Route                       | Fungsi                                            |
| --------------------------- | ------------------------------------------------- |
| `/`                         | Landing dan scan universal                        |
| `/scan`                     | Form scan terfokus                                |
| `/tracking?case={id}`       | Laporan, evidence, public tracker, bukti tambahan |
| `/validator`                | Mock wallet, staking, statistik, antrean kasus    |
| `/validator/cases/{caseId}` | Evidence dan konfirmasi voting                    |
| `/ledger`                   | Pencarian dan filter transaksi simulasi           |
| `/methodology`              | Metodologi, aturan simulasi, keterbatasan         |

## Stack dan struktur

Next.js App Router, React, TypeScript strict, Tailwind CSS, komponen resmi shadcn berbasis Radix, Lucide, React Hook Form, Zod, next/font lokal, Vitest, Playwright, axe dan Lighthouse. Versi hasil instalasi dikunci pada `pnpm-lock.yaml`.

```text
src/app/              Route, metadata, tema, loading/error/404
src/components/       Shell, feedback, laporan dan komponen shadcn
src/features/         Scan, tracking, validator, ledger
src/hooks/use-store.ts Langganan state lintas tab
src/lib/domain.ts     Schema runtime dan tipe domain
src/lib/risk.ts       Validasi target dan heuristik risiko
src/lib/services.ts   Risk service, wallet dan transaksi simulasi
src/lib/storage.ts    Adapter penyimpanan dan sinkronisasi
src/test/             Pengujian aturan bisnis dan penyimpanan
e2e/                  Pengujian alur browser dan aksesibilitas
docs/                 Arsitektur, alur, desain, integrasi dan QA
public/images/        Aset visual lokal
```

## Batasan data dan integrasi

- State utama tersimpan di `shieldchain_state_v1`. Key `shieldchain_pending_url` dan `shieldchain_vote_result` tetap ditulis untuk kompatibilitas dokumen awal.
- Vote bersifat per kasus, sehingga hasil lama tidak bocor ke laporan baru. Satu write menyimpan saldo, kasus, dan ledger sekaligus.
- Web Locks API mengurutkan perubahan antartab. Gunakan browser modern pada localhost/HTTPS. Ini tidak menyediakan konsensus antarpengguna.
- Semua data lokal bisa diubah lewat developer tools; tidak ada otoritas keamanan di frontend. Jangan mengganti label simulasi tanpa integrasi backend dan kontrak yang benar.
- Tautan laporan hanya bisa dibuka pada browser/origin yang memiliki data. Belum dapat dibagikan lintas perangkat.
- Bukti tambahan belum diverifikasi dan tidak otomatis memengaruhi skor. Skor dan kualitas data bukan probabilitas yang terkalibrasi.
- Pilihan vote menentukan reward/slashing tetap sesuai dokumen hackathon. Aturan ini tidak menilai benar/salah berdasarkan bukti nyata.
- Tidak ada unggahan berkas atau seed phrase. Alamat EVM belum dibedakan sebagai wallet versus kontrak tanpa RPC.

Dokumen proyek asli dipertahankan. Brief utama pada root berhenti di awal bagian 7; master prompt dan empat file alur melengkapi scope.

Lihat [arsitektur](docs/architecture.md), [alur pengguna](docs/user-flow.md), [sistem desain](docs/design-system.md), [integrasi berikutnya](docs/future-integration.md), dan [hasil QA](docs/qa/verification.md).

Fondasi framework dan komponen mengikuti [dokumentasi instalasi Next.js](https://nextjs.org/docs/app/getting-started/installation) dan [shadcn untuk Next.js](https://ui.shadcn.com/docs/installation/next).
