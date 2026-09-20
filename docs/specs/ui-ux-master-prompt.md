# Master Prompt — UI/UX dan Frontend MVP Hackathon Web3 “ShieldChain”

> Salin seluruh prompt di bawah ini ke Codex pada folder proyek baru. Pastikan file brief PDF dan keempat file alur Markdown tersedia di workspace yang sama.

---

Bertindaklah sebagai **Senior Product Designer, UI/UX Designer, Frontend Architect, dan Next.js Engineer**. Bangun dari nol sebuah frontend MVP hackathon Web3 bernama sementara **ShieldChain**: platform intelijen risiko terdesentralisasi untuk membantu pengguna Indonesia menilai risiko token, smart contract, wallet, situs, serta grup investasi.

Kerjakan langsung di workspace aktif menggunakan **AI Agent Codex**.

---

## 1. Instruksi Wajib Sebelum Implementasi

1. Periksa isi workspace dan seluruh instruksi repository, termasuk `AGENTS.md` jika tersedia.
2. Temukan dan baca dokumentasi berikut sebagai sumber kebenaran:
   - `Brief Project_ Decentralized Crypto Risk Intelligence.pdf`
   - `alur-pengunjung.md`
   - `alur-validator.md`
   - `vaoting-onchain&indikator-rewarding.md`
   - `sinkronasi-status.md`
3. Gunakan isi PDF untuk memahami:
   - masalah pengguna;
   - positioning produk;
   - risiko hukum;
   - konsep analisis risiko;
   - diferensiasi produk;
   - batasan MVP hackathon.
4. Gunakan file `.md` sebagai sumber utama alur interaksi dan state aplikasi.
5. Temukan **Taste Skill** yang sudah terpasang, baca seluruh `SKILL.md`, lalu gunakan skill tersebut untuk:
   - menentukan arah visual;
   - mengevaluasi kualitas desain;
   - menghindari UI generik buatan AI;
   - memperbaiki hierarki, tipografi, warna, spacing, dan interaksi.
6. Jika Taste Skill memberikan instruksi yang lebih spesifik tentang proses desain, ikuti instruksi tersebut selama tidak bertentangan dengan kebutuhan produk.
7. Jangan langsung menulis seluruh aplikasi sebelum membuat rencana singkat berisi:
   - arsitektur halaman;
   - user flow;
   - design tokens;
   - struktur folder;
   - tahapan implementasi.
8. Setelah rencana dibuat, lanjutkan implementasi tanpa menunggu konfirmasi kecuali ada keputusan yang benar-benar menghambat pekerjaan.

---

## 2. Tujuan Produk

ShieldChain membantu pengguna kripto awam di Indonesia memahami risiko sebelum mengirim uang, menghubungkan wallet, atau bergabung dengan investasi.

Sistem tidak boleh memberikan keputusan absolut seperti:

- “100% aman”
- “pasti scam”
- “halal”
- “haram”

Gunakan pendekatan:

- skor risiko berbasis bukti;
- penjelasan yang mudah dipahami;
- pemisahan hasil AI dan hasil komunitas;
- keputusan akhir tetap berada pada pengguna.

Tiga dimensi analisis:

1. **Risiko Teknis**
   - fungsi mint tidak terbatas;
   - ownership belum dilepas;
   - likuiditas tidak terkunci;
   - konsentrasi holder;
   - pola transaksi mencurigakan.

2. **Risiko Rekayasa Sosial**
   - impersonasi akun;
   - typosquatting;
   - situs exchange kloningan;
   - DM agresif;
   - janji keuntungan tidak wajar;
   - tekanan waktu;
   - pola grup investasi palsu.

3. **Indikator Risiko Kepatuhan Syariah**
   - ketidakjelasan atau gharar;
   - spekulasi ekstrem atau maysir;
   - tokenomics tidak transparan;
   - janji keuntungan tidak wajar.

Indikator syariah harus diberi disclaimer bahwa hasil tersebut:

- hanya bersifat informatif;
- bukan fatwa;
- bukan penetapan halal atau haram;
- tidak menggantikan konsultasi dengan ulama atau lembaga berwenang.

---

## 3. Target Pengguna

### Pengunjung umum

Pengguna Indonesia yang:

- masih awam mengenai smart contract;
- menerima tautan investasi dari WhatsApp atau Telegram;
- ingin memeriksa situs, wallet, kontrak, atau grup;
- membutuhkan hasil sederhana dalam Bahasa Indonesia.

### Validator komunitas

Pengguna Web3 yang:

- menghubungkan wallet;
- melakukan staking;
- memeriksa evidence;
- memberikan vote;
- menerima reward atau slashing berdasarkan hasil konsensus.

### Juri hackathon

Juri harus dapat memahami dalam waktu singkat:

- masalah yang diselesaikan;
- alasan penggunaan AI;
- alasan penggunaan blockchain;
- alur pengguna end-to-end;
- perbedaan ShieldChain dari scanner smart contract biasa.

---

## 4. Prinsip UI/UX

Buat UI yang terasa seperti produk **risk intelligence dan cybersecurity profesional**, bukan dashboard kripto generik.

### Arah visual

Gunakan karakter visual:

- modern;
- tepercaya;
- tenang;
- transparan;
- data-driven;
- ramah pengguna Indonesia;
- tetap memiliki identitas Web3 tanpa neon berlebihan.

Rekomendasi awal:

- background: deep navy atau near-black;
- surface: navy/charcoal dengan kontras jelas;
- warna utama: cyan atau electric blue yang terkendali;
- hijau: risiko rendah atau transaksi berhasil;
- amber: risiko menengah/perlu perhatian;
- merah: risiko tinggi atau slashing;
- ungu dapat digunakan sangat terbatas sebagai aksen Web3;
- tipografi modern dan sangat terbaca;
- radius medium;
- border halus;
- shadow minimal;
- data visualization sederhana dan bermakna.

Hindari:

- gradient berlebihan;
- efek glow di semua komponen;
- glassmorphism berlebihan;
- animasi dekoratif yang mengganggu;
- terlalu banyak kartu dengan bentuk identik;
- istilah blockchain tanpa penjelasan;
- layout dashboard template yang terasa generik;
- klaim keamanan atau keagamaan yang absolut.

### Prinsip pengalaman pengguna

1. Bahasa utama adalah Bahasa Indonesia.
2. Setiap istilah teknis mempunyai penjelasan singkat atau tooltip.
3. Hasil utama harus dapat dipahami kurang dari 10 detik.
4. Evidence selalu lebih penting daripada label.
5. Pisahkan dengan jelas:
   - hasil analisis AI;
   - laporan komunitas;
   - status konsensus on-chain.
6. Setiap state harus memiliki tampilan:
   - loading;
   - empty;
   - success;
   - warning;
   - error.
7. Aplikasi harus responsif mulai dari mobile hingga desktop.
8. Gunakan animasi ringan hanya untuk:
   - proses pemindaian;
   - perubahan status;
   - feedback transaksi;
   - masuknya data ledger.
9. Hormati `prefers-reduced-motion`.
10. Seluruh elemen interaktif harus dapat digunakan dengan keyboard.

---

## 5. Stack Teknis

Gunakan:

- Next.js versi stabil;
- App Router;
- TypeScript strict;
- Tailwind CSS;
- shadcn/ui untuk komponen dasar yang benar-benar diperlukan;
- Lucide Icons;
- React Hook Form;
- Zod;
- Recharts hanya jika visualisasi data memang diperlukan;
- `next/font`;
- Vitest atau testing tool yang paling sesuai untuk unit test;
- Playwright untuk end-to-end test jika memungkinkan.

Untuk integrasi Web3:

- buat abstraction layer yang siap dihubungkan ke Privy, wagmi, viem, atau MetaMask;
- untuk MVP awal, gunakan mock wallet dan mock transaction;
- jangan menyimpan private key atau secret di frontend;
- jangan membuat smart contract palsu seolah-olah sudah live;
- beri label yang jelas pada data simulasi.

Gunakan package manager yang sudah digunakan repository. Jika proyek benar-benar kosong, prioritaskan `pnpm`.

---

## 6. Arsitektur Aplikasi

Gunakan struktur berbasis domain/feature agar mudah dikembangkan.

Struktur yang disarankan:

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── scan/
│   │   │   └── page.tsx
│   │   ├── tracking/
│   │   │   └── page.tsx
│   │   └── ledger/
│   │       └── page.tsx
│   ├── validator/
│   │   ├── page.tsx
│   │   └── cases/
│   │       └── [caseId]/
│   │           └── page.tsx
│   ├── methodology/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── layout/
│   ├── feedback/
│   └── shared/
├── features/
│   ├── scan/
│   │   ├── components/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── types.ts
│   ├── risk-assessment/
│   ├── tracking/
│   ├── wallet/
│   ├── staking/
│   ├── validation/
│   └── ledger/
├── hooks/
├── lib/
│   ├── storage/
│   ├── web3/
│   ├── risk/
│   ├── utils/
│   └── constants/
├── config/
├── mocks/
├── types/
└── test/
docs/
├── architecture.md
├── user-flow.md
├── design-system.md
└── future-integration.md
```

Struktur boleh disesuaikan jika ada pilihan yang lebih sederhana dan profesional. Jangan membuat abstraction, folder, atau dependency yang belum mempunyai kegunaan nyata.

### Aturan arsitektur

- Komponen presentasional tidak mengakses `localStorage` secara langsung.
- Semua akses penyimpanan melalui storage adapter.
- Semua koneksi wallet melalui wallet adapter.
- Semua analisis risiko melalui risk assessment service.
- Semua transaksi blockchain melalui blockchain service interface.
- Data mock dan data production harus mudah diganti.
- Jangan mencampurkan business logic dengan komponen UI.
- Gunakan Server Component secara default.
- Gunakan Client Component hanya untuk interaksi yang membutuhkannya.
- Hindari global state library jika React Context atau state lokal sudah cukup.

---

## 7. Halaman dan User Flow

### 7.1 Landing Page `/`

Buat landing page yang langsung menjelaskan manfaat produk.

Bagian minimal:

1. Navbar
   - logo ShieldChain;
   - Scan Risiko;
   - Public Ledger;
   - Validator;
   - Metodologi;
   - tombol Connect Wallet.

2. Hero
   - headline yang berfokus pada perlindungan pengguna;
   - deskripsi singkat;
   - scan input menjadi elemen utama;
   - trust indicators;
   - disclaimer bahwa hasil adalah indikator risiko, bukan jaminan mutlak.

3. Universal Scan Input
   - menerima URL;
   - domain;
   - wallet address;
   - smart contract address;
   - nama atau tautan grup WhatsApp/Telegram;
   - tampilkan contoh input;
   - validasi input kosong dan format dasar;
   - sediakan tombol paste jika browser mendukungnya.

4. Cara kerja
   - masukkan target;
   - AI menganalisis;
   - komunitas memvalidasi;
   - pengguna melihat evidence dan konsensus.

5. Tiga dimensi risiko
   - teknis;
   - rekayasa sosial;
   - indikator syariah.

6. Transparansi komunitas
   - staking;
   - voting;
   - reward;
   - slashing;
   - audit trail.

7. CTA terakhir.

Jangan membuat landing page terlalu panjang. Fokus pada demo hackathon.

---

### 7.2 Proses Scan

Saat pengguna mengirim input:

1. Validasi input.
2. Simpan ke:
   - `shieldchain_pending_url`
3. Buat objek kasus dengan ID unik.
4. Ubah status menjadi:
   - `submitted`
   - `analyzing`
   - `awaiting_validation`
5. Arahkan pengguna ke `/tracking` atau `/tracking?case={id}`.
6. Tampilkan progress analisis yang masuk akal:
   - memvalidasi target;
   - memeriksa indikator teknis;
   - memeriksa rekayasa sosial;
   - menghitung indikator syariah;
   - menyusun evidence;
   - mengirim ke antrean komunitas.

Jangan menggunakan loading palsu yang terlalu lama. Demo harus tetap terasa cepat.

---

### 7.3 Heuristik MVP

Implementasikan mock risk engine berdasarkan dokumen:

```text
Jika input mengandung:
gov, edu, komdigi, ui.ac.id

Maka:
risiko teknis = 5
risiko sosial = 4
risiko syariah = 2
status = risiko rendah / sumber terverifikasi
```

```text
Jika input mengandung:
airdrop, claim, login, free, nekopoi

Maka:
risiko teknis = 92
risiko sosial = 88
risiko syariah = 95
status = risiko tinggi / indikasi phishing
```

```text
Selain itu:

risiko teknis = 45
risiko sosial = 50
risiko syariah = 40
status = perlu diwaspadai
```

Buat risk engine sebagai service terpisah agar nantinya dapat diganti dengan API AI nyata.

Gunakan klasifikasi:

- 0–29: rendah;
- 30–69: menengah;
- 70–100: tinggi.

Berikan evidence yang berbeda untuk setiap kategori. Jangan hanya menampilkan angka.

---

### 7.4 Tracking dan Risk Report `/tracking`

Halaman tracking harus menjadi layar demo utama.

Tampilkan:

1. Target yang diperiksa.
2. Waktu scan.
3. Status kasus.
4. Ringkasan risiko.
5. Tiga kartu/skala risiko:
   - teknis;
   - rekayasa sosial;
   - indikator risiko kepatuhan syariah.
6. Evidence per kategori.
7. Confidence atau kualitas data, bukan klaim kepastian.
8. Sumber informasi:
   - AI/off-chain;
   - on-chain;
   - laporan komunitas.
9. Public Tracker.
10. Timeline status.
11. CTA:
    - lihat detail;
    - salin tautan laporan;
    - laporkan evidence tambahan;
    - buka public ledger.

Status awal Public Tracker:

```text
Sedang dalam antrean validasi komunitas
```

Jika terdapat nilai dalam:

```text
shieldchain_vote_result
```

tampilkan:

```text
Hasil voting komunitas: {HASIL}
```

Gunakan warna status secara semantik, tetapi jangan bergantung pada warna saja. Tambahkan ikon dan teks.

Sinkronkan perubahan antartab menggunakan:

- `storage` event;
- custom browser event untuk tab yang sama;
- storage adapter yang kelak dapat diganti dengan realtime backend.

---

### 7.5 Validator Dashboard `/validator`

State sebelum wallet terhubung:

- penjelasan singkat peran validator;
- tombol Connect Wallet;
- manfaat dan risiko staking;
- data validator masih terkunci;
- jangan menampilkan seolah-olah wallet nyata sudah tersambung.

Setelah Connect Wallet:

```text
wallet_connected = true
validator_address = "0x4B...9a2F"
wallet_balance = 10 ETH
```

Perbarui navbar dan aktifkan tombol `+ Stake`.

Modal staking harus memiliki:

- nominal stake;
- saldo tersedia;
- minimum stake;
- estimasi risiko;
- konfirmasi;
- error state;
- status transaksi.

Aturan staking:

```text
Minimum stake = 0.1 ETH
```

Validasi:

- kurang dari 0.1 ETH → tampilkan error minimum staking;
- melebihi saldo → tampilkan error saldo tidak cukup;
- nilai invalid, kosong, negatif, NaN → tampilkan error sesuai konteks.

Setelah staking berhasil:

- kurangi mock balance;
- tambah total staked;
- ubah validator menjadi aktif;
- buka antrean verifikasi;
- tampilkan target dari `shieldchain_pending_url`;
- tampilkan evidence AI;
- tampilkan statistik:
  - total stake;
  - akurasi;
  - reward;
  - slashing;
  - kasus selesai.

---

### 7.6 Detail Kasus Validator `/validator/cases/[caseId]`

Susun layar agar validator membaca evidence sebelum voting.

Tampilkan:

- identitas target;
- status scan;
- skor tiga dimensi;
- daftar evidence;
- sumber evidence;
- tingkat confidence;
- riwayat laporan;
- stake validator;
- konsekuensi reward/slashing;
- disclaimer keputusan komunitas.

Pilihan vote yang ditampilkan kepada pengguna:

- **Tidak ditemukan indikasi utama**
- **Terindikasi phishing**

Untuk kompatibilitas dengan alur dokumen, nilai internal dapat dipetakan menjadi:

```text
Aman
Phishing
```

Sebelum vote:

- validator harus aktif;
- validator harus sudah staking;
- tampilkan confirmation dialog;
- jangan mengirim vote hanya dengan satu klik tanpa konfirmasi.

Setelah vote:

1. Buat mock transaction hash.
2. Simpan hasil pada:
   - `shieldchain_vote_result`
3. Tampilkan transaction status.
4. Masukkan transaksi ke public ledger.
5. Tampilkan toast keberhasilan.
6. Ubah queue menjadi selesai.
7. Hapus:
   - `shieldchain_pending_url`
8. Jangan menghapus hasil kasus dan ledger.

---

### 7.7 Reward dan Slashing

Untuk mengikuti simulasi dokumen:

```text
Jika vote = Phishing:
reward = +0.05 ETH
status = Valid / Reward
warna = hijau
```

```text
Jika vote = Aman:
slashing = -0.10 ETH
status = Salah / Slashed
warna = merah
```

Karena ini simulasi hackathon, beri label jelas:

```text
Simulasi mekanisme konsensus
```

Jangan menyatakan hasil ini sebagai konsensus blockchain nyata sebelum smart contract benar-benar terhubung.

---

### 7.8 Public Ledger `/ledger`

Buat tabel atau daftar responsif yang berisi:

- case ID;
- target yang dipersingkat;
- validator yang dipersingkat;
- vote;
- transaction hash;
- reward/slashing;
- waktu;
- status;
- link menuju detail kasus.

Tambahkan:

- filter status;
- pencarian target atau transaction hash;
- empty state;
- skeleton loading;
- mobile card view;
- tombol menyalin transaction hash;
- badge “Simulasi” untuk data mock.

Jangan membuat tabel terlalu padat.

---

### 7.9 Metodologi `/methodology`

Jelaskan secara singkat:

- cara skor dihitung;
- arti setiap dimensi;
- perbedaan AI assessment dan community consensus;
- mengapa blockchain digunakan;
- keterbatasan AI;
- disclaimer hukum;
- disclaimer indikator syariah;
- arti data simulasi pada MVP.

Halaman ini meningkatkan kredibilitas demo.

---

## 8. State Model

Gunakan model status yang konsisten:

```ts
type CaseStatus =
  | "submitted"
  | "analyzing"
  | "awaiting_validation"
  | "voting"
  | "consensus_reached"
  | "failed";
```

Contoh domain model:

```ts
type RiskLevel = "low" | "medium" | "high";

interface RiskDimension {
  score: number;
  level: RiskLevel;
  summary: string;
  evidence: RiskEvidence[];
  confidence: number;
}

interface RiskCase {
  id: string;
  target: string;
  targetType: "url" | "domain" | "wallet" | "contract" | "group";
  status: CaseStatus;
  technicalRisk: RiskDimension;
  socialRisk: RiskDimension;
  shariaRisk: RiskDimension;
  communityStatus: "queued" | "voting" | "completed";
  createdAt: string;
  updatedAt: string;
}
```

Model boleh dikembangkan selama tetap sederhana dan konsisten.

---

## 9. Design System

Buat design tokens terpusat untuk:

- colors;
- typography;
- spacing;
- radius;
- shadows;
- motion;
- breakpoints;
- status semantics.

Komponen reusable minimal:

- AppShell;
- Navbar;
- MobileNavigation;
- ScanForm;
- RiskScoreCard;
- RiskLevelBadge;
- EvidenceList;
- AnalysisProgress;
- StatusTimeline;
- PublicTracker;
- WalletButton;
- StakeDialog;
- ValidatorQueue;
- VotePanel;
- TransactionStatus;
- LedgerTable;
- DisclaimerBanner;
- EmptyState;
- ErrorState;
- Skeleton.

Gunakan satu pola visual yang konsisten. Jangan membuat variasi komponen tanpa kebutuhan.

---

## 10. Copywriting

Gunakan Bahasa Indonesia yang:

- sederhana;
- tidak menghakimi;
- tidak terlalu teknis;
- tidak memberikan jaminan palsu;
- mudah dipahami investor pemula.

Contoh headline:

```text
Periksa risikonya sebelum aset Anda menjadi korban berikutnya.
```

Contoh subheadline:

```text
Analisis tautan, wallet, kontrak, dan grup investasi menggunakan sinyal AI, data on-chain, serta validasi komunitas.
```

Contoh disclaimer:

```text
ShieldChain menyajikan indikator risiko berdasarkan data yang tersedia. Hasil analisis bukan jaminan keamanan, tuduhan hukum, fatwa, atau nasihat investasi.
```

Contoh status:

```text
Belum ada konsensus komunitas
```

Lebih baik daripada:

```text
Belum terbukti aman
```

---

## 11. Future-Proofing

Siapkan arsitektur agar nantinya dapat ditambahkan:

- autentikasi pengguna;
- Privy atau MetaMask nyata;
- smart contract staking;
- smart contract voting;
- koneksi testnet;
- AI risk API;
- URL reputation API;
- smart contract scanner;
- holder concentration analyzer;
- database PostgreSQL;
- realtime updates;
- decentralized storage;
- report submission;
- dispute dan appeal;
- validator reputation;
- multi-chain support;
- versi Bahasa Inggris;
- notifikasi;
- shareable public report;
- admin moderation.

Jangan implementasikan semua fitur tersebut sekarang. Buat boundary/interface dan dokumentasi integrasinya saja jika belum dibutuhkan MVP.

---

## 12. Keamanan dan Etika

Pastikan implementasi:

- tidak memasukkan secret ke client bundle;
- tidak meminta seed phrase;
- tidak mensimulasikan permintaan seed phrase;
- tidak mengklaim transaksi mock sebagai transaksi blockchain nyata;
- melakukan sanitasi input;
- tidak merender HTML mentah dari input pengguna;
- memvalidasi URL dan wallet address;
- tidak menggunakan kata “scam” sebagai keputusan hukum final;
- menyebut output sebagai indikator risiko;
- membedakan data AI, komunitas, dan blockchain;
- menjelaskan bahwa transparansi blockchain tidak menjamin kebenaran mutlak.

---

## 13. Dokumentasi

Buat dokumentasi ringkas:

### `README.md`

Berisi:

- deskripsi proyek;
- masalah yang diselesaikan;
- fitur MVP;
- stack;
- instalasi;
- menjalankan development server;
- testing;
- build;
- struktur proyek;
- status integrasi Web3;
- keterbatasan simulasi.

### `docs/architecture.md`

Berisi:

- domain utama;
- data flow;
- storage adapter;
- wallet adapter;
- blockchain adapter;
- risk assessment service;
- jalur migrasi dari mock menuju production.

### `docs/user-flow.md`

Berisi:

- visitor scan flow;
- validator staking flow;
- voting flow;
- tracking synchronization flow.

### `docs/design-system.md`

Berisi:

- color tokens;
- typography;
- spacing;
- status semantics;
- aturan penggunaan komponen.

---

## 14. Testing dan Quality Assurance

Tambahkan test untuk alur kritis:

1. Input kosong ditolak.
2. Input disimpan sebelum redirect.
3. Heuristik risiko menghasilkan skor yang benar.
4. Minimum stake 0.1 ETH.
5. Stake melebihi saldo ditolak.
6. Validator tanpa staking tidak dapat vote.
7. Vote disimpan ke `shieldchain_vote_result`.
8. Tracking berubah setelah vote.
9. Reward/slashing masuk ke ledger.
10. Pending URL dihapus setelah vote.
11. Data ledger tetap tersimpan.
12. UI dapat digunakan pada mobile.

Lakukan verifikasi akhir:

- typecheck;
- lint;
- unit test;
- production build;
- cek console error;
- cek broken route;
- cek tampilan mobile, tablet, dan desktop;
- cek keyboard navigation;
- cek contrast;
- cek reduced motion;
- cek hydration error;
- cek empty/loading/error state.

Jika browser automation tersedia, ambil screenshot halaman utama pada ukuran:

- mobile;
- tablet;
- desktop.

Gunakan screenshot tersebut untuk melakukan satu putaran evaluasi desain berdasarkan Taste Skill, lalu perbaiki masalah visual yang ditemukan.

---

## 15. Urutan Implementasi

Kerjakan bertahap:

### Tahap 1 — Fondasi

- inisialisasi Next.js;
- konfigurasi TypeScript;
- Tailwind;
- font;
- design tokens;
- layout;
- struktur folder.

### Tahap 2 — Visitor Flow

- landing page;
- scan form;
- risk engine;
- tracking;
- risk report;
- public tracker.

### Tahap 3 — Validator Flow

- mock wallet;
- staking;
- validator queue;
- evidence;
- voting;
- reward/slashing.

### Tahap 4 — Sinkronisasi

- storage adapter;
- sinkronisasi tab;
- timeline;
- ledger.

### Tahap 5 — Polish

- responsivitas;
- accessibility;
- motion;
- loading/error/empty states;
- dokumentasi;
- testing;
- visual review dengan Taste Skill.

Setelah setiap tahap, jalankan pemeriksaan yang relevan. Jangan menunggu hingga akhir untuk menemukan error arsitektur.

---

## 16. Definition of Done

Proyek dianggap selesai apabila:

- aplikasi Next.js berhasil dijalankan;
- build production berhasil;
- pengguna dapat memasukkan target;
- sistem menampilkan hasil tiga dimensi;
- kasus masuk ke antrean komunitas;
- validator dapat connect mock wallet;
- validator dapat staking minimal 0.1 ETH;
- validator dapat membuka evidence;
- validator dapat vote;
- reward/slashing tampil;
- public tracker diperbarui;
- public ledger mencatat transaksi;
- semua data mock diberi label simulasi;
- UI responsif dan accessible;
- tidak ada error TypeScript, lint, hydration, atau console yang signifikan;
- struktur folder mudah dipahami;
- dokumentasi tersedia;
- desain telah dievaluasi menggunakan Taste Skill.

---

## 17. Format Laporan Akhir

Setelah implementasi selesai, laporkan secara ringkas:

1. Apa yang berhasil dibangun.
2. Route yang tersedia.
3. Struktur arsitektur utama.
4. Bagian yang masih berupa simulasi.
5. Hasil test, lint, typecheck, dan build.
6. Keputusan desain penting dari Taste Skill.
7. File utama yang perlu saya periksa.
8. Langkah berikutnya untuk menghubungkan smart contract dan AI API.

Jangan hanya menghasilkan mockup statis. Hasil akhir harus berupa frontend interaktif yang menjalankan seluruh alur MVP dari scan sampai voting dan sinkronisasi status.
