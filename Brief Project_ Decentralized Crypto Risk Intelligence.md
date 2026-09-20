## Brief Project: Decentralized Crypto Risk Intelligence

## Sistem Manajemen Risiko Terdesentralisasi untuk Deteksi Penipuan Web3 di Indonesia

## 1. Ringkasan Eksekutif

Ini adalah protokol manajemen risiko terdesentralisasi yang membantu pengguna kripto awam di Indonesia menilai tingkat risiko sebuah token, smart contract, akun, atau grup investasi — sebelum mereka kehilangan uang. Alih-alih memberi label biner "scam" atau "aman", sistem ini menghasilkan skor risiko multi-dimensi (teknis, social-engineering, dan indikator kepatuhan syariah) berbasis data on-chain dan laporan komunitas yang divalidasi lewat mekanisme staking, sehingga keputusan akhir tetap ada di tangan pengguna — bukan diklaim sepihak oleh sistem.

## 2. Latar Belakang & Masalah

## 2.1 Skala masalah secara global

Kerugian akibat rug pull di ekosistem DeFi global mencapai sekitar \$2,8 miliar sepanjang 2025. Bahkan di satu platform saja — PancakeSwap — analisis 20 minggu pertama 2026 menemukan 103.695 kejadian rug pull yang menyedot lebih dari \$569 juta dari investor ritel, rata-rata \$28,5 juta per minggu, nyaris tanpa liputan media.

## 2.2 Skala masalah di Indonesia

Data OJK menunjukkan sejak 2017 hingga Maret 2026, 14.959 entitas keuangan ilegal telah diblokir (pinjol, investasi bodong, gadai ilegal), dengan 10.516 pengaduan baru hanya dalam kuartal pertama 2026. Kasus nyata yang terungkap Bareskrim Polri (platform JYPRX, SYIPC, LEEDSX) menjaring 90 korban dengan kerugian Rp105 miliar, bermula dari iklan kelas belajar saham/kripto di media sosial.

## 2.3 Modus yang menyasar spesifik orang Indonesia

Berbeda dari rug pull "klasik" yang murni soal kode smart contract jahat, korban Indonesia banyak terjebak lewat rekayasa sosial: Impersonasi akun resmi platform investasi di Telegram (username dimodifikasi, DM pribadi menawarkan "grup eksklusif") Situs bursa kripto kloningan yang tampilannya identik dengan exchange asli Grup WhatsApp "belajar saham" yang berujung ajakan masuk skema investasi bodong Korban paling rentan: investor pemula, termasuk lansia yang tergiur "belajar investasi" biasa

## 2.4 Gap yang belum terisi

Tools deteksi scam Web3 yang sudah ada (GoPlus Security, ChainAware, Token Sniffer, De.Fi Scanner, RugCheck) seluruhnya berbahasa Inggris, ditujukan untuk trader teknis yang paham membaca smart contract, dan fokus murni pada analisis kode kontrak on-chain — tidak ada yang menyasar vektor social- engineering (impersonasi akun, kloningan situs) yang justru paling banyak memakan korban di Indonesia.


Selain itu, tidak ada satupun tool yang mempertimbangkan dimensi kepatuhan syariah, padahal Indonesia adalah pasar Muslim terbesar di dunia dengan nilai transaksi kripto tembus Rp426 triliun, dan fatwa DSN-MUI (No. 117/2020, No. 140 & 144/2021) secara eksplisit menyoal unsur gharar (ketidakpastian berlebih) dan maysir (spekulasi menyerupai judi) dalam aset kripto — dua konsep yang secara teknis hampir identik dengan indikator red flag rug pull (kontrak tidak transparan, tokenomics zero-sum, janji

profit tidak wajar).

- 3. Konsep Solusi

## 3.1 Nama kerja & positioning

Risk Intelligence Layer untuk aset dan aktivitas Web3 — bukan "polisi crypto", tapi lapisan informasi yang

membantu pengguna membuat keputusan sendiri secara sadar risiko.

## 3.2 Alur kerja inti

- 1. Input: pengguna paste link (grup Telegram/WhatsApp, situs, wallet address, atau kontrak token) ke sistem.

- 2. AI Risk Assessment: agent AI menganalisis dua kanal sekaligus:

- On-chain signal: kode smart contract (fungsi mint tak terbatas, kepemilikan tidak di-renounce, likuiditas tidak terkunci), pola transaksi wallet (konsentrasi holder, riwayat token sejenis yang pernah rug pull).

- Off-chain signal: kemiripan domain dengan exchange resmi (typosquatting), pola nama akun yang meniru brand, bahasa/pola pesan yang matching template modus penipuan yang sudah terdokumentasi (DM agresif, janji profit tidak wajar, tekanan waktu).

- 3. Community Verification Layer (on-chain): pengguna lain bisa menambahkan laporan dengan menaruh stake kecil. Laporan yang dikonfirmasi valid oleh voting komunitas memberi reward ke reporter; laporan yang terbukti fitnah/salah kena slash stake-nya — mekanisme ini menjaga kualitas data dan mencegah manipulasi (baik spam report maupun serangan balas dendam kompetitor).

- 4. Output: kartu skor risiko tiga dimensi (bukan label tunggal):

- Risiko Teknis (Low/Medium/High) — red flag kode kontrak

- 🗣️ Risiko Rekayasa Sosial (Low/Medium/High) — indikasi impersonasi/kloningan

- DSN-MUI, bukan klaim halal/haram otoritatif Indikator Kepatuhan Syariah (opsional) — checklist berbasis kriteria gharar/maysir dari fatwa

## 3.3 Kenapa blockchain (bukan database biasa)

- Tidak butuh izin otoritas tunggal: laporan komunitas bisa langsung aktif tanpa menunggu proses birokrasi resmi yang sering telat (OJK butuh waktu verifikasi sebelum resmi memblokir entitas, sementara korban sudah berjatuhan duluan).

- Sumber kebenaran bersama tanpa gatekeeper: exchange, wallet provider, dan komunitas bisa semua query skor risiko yang sama tanpa harus percaya pada satu perusahaan swasta yang mengontrol datanya secara sepihak (dan berpotensi diam-diam diubah/dihapus kalau ada tekanan pihak yang dilaporkan).

Insentif ekonomi yang di enforce otomatis: staking/slashing membuat "kejujuran laporan" punya


- Insentif ekonomi yang di-enforce otomatis: staking/slashing membuat kejujuran laporan punya konsekuensi finansial nyata, sesuatu yang sulit dicapai sistem terpusat biasa.

- 4. Kenapa Ini Cocok untuk Pengguna Awam

## Masalah pengguna awam Solusi dalam desain

Gak paham baca smart contract

Tools yang ada berbahasa Inggris & jargon berat

Takut kena tuduh sepihak / gak mau Skor berlapis dengan bukti pendukung, bukan label "SCAM"

dituduh tanpa bukti

Modus yang menyasar mereka justru Deteksi khusus vektor social-engineering yang gak dicover bukan soal kode, tapi soal akun/grup tools teknis lain palsu

Ingin berinvestasi sesuai prinsip syariah tapi bingung kriterianya

Proses pelaporan/verifikasi resmi lambat

- 5. Diferensiasi vs Kompetitor

GoPlus/ChainAware/dll (existing) Inggris, teknis

Bahasa

Fokus deteksi

Output

Basis data Tim internal/algoritma

tertutup

Konteks lokal

AI melakukan analisis teknis di belakang layar, hasil ditampilkan sebagai skor sederhana (Low/Medium/High), bukan output teknis

Antarmuka penuh Bahasa Indonesia, bahasa sehari-hari

mutlak — mengurangi risiko fitnah dan tetap memberi ruang keputusan ke pengguna

Kode smart contract

Skor tunggal / red flag list

Tidak ada

Indikator kepatuhan syariah berbasis kriteria resmi DSN-MUI yang sudah dipublikasikan, disajikan sebagai informasi tambahan, bukan fatwa pengganti ulama

Community-driven, real-time, tidak bergantung pada birokrasi

## Project ini

Bahasa Indonesia, awam-friendly

Kode kontrak + social-engineering (impersonasi, kloningan situs)

Skor multi-dimensi (teknis, sosial, syariah) Komunitas dengan insentif stake-slash, auditable publik

Mengacu pola modus penipuan spesifik Indonesia & kriteria fatwa DSN-MUI


- 6. Risiko & Mitigasi

- Risiko hukum (UU ITE): penyajian sebagai "skor risiko dengan bukti", bukan tuduhan "scam" langsung, untuk menghindari potensi gugatan pencemaran nama baik.

- Overclaim otoritas keagamaan: indikator syariah eksplisit dirujuk ke nomor fatwa DSN-MUI resmi, dengan disclaimer jelas bahwa ini bukan pengganti konsultasi ulama.

- Manipulasi laporan komunitas: mitigasi lewat mekanisme staking/slashing dan pemisahan skor berdasarkan sumber (on-chain vs community-report) agar transparan mana yang terverifikasi otomatis vs klaim komunitas.

- False negative (verdict AI salah): sistem tetap harus jujur bahwa blockchain menjamin transparansi pencatatan, bukan kebenaran mutlak — keputusan akhir tetap tanggung jawab pengguna.

## 7. Scope MVP yang Realistis untuk Hackathon

Prioritas 1 (harus jalan end-to-end): input link/wallet → AI scan on-chain dasar (mint function liquidity
