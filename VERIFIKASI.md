# Hasil Verifikasi Milestone Pilot

Tanggal pelaksanaan: 15 September 2026. Jaringan: **EVM lokal chain 31337**, bukan Sepolia.

## Ringkasan

- Kompilasi Solidity 0.8.30 / target Shanghai berhasil.
- **20 dari 20 tes inti lulus**; 0 gagal, 0 dilewati; sekitar 21,7 detik. Lihat `tests.tap`.
- Uji browser menjalankan mandat, revision request, payout, dan penolakan scope melalui UI serta signer child process.
- Browser: 0 JavaScript page error, tidak ada overflow horizontal pada lebar 390 px, POST tanpa session token ditolak HTTP 403.
- Screenshot desktop 1400×1100 dan mobile 390×844 dilihat untuk memeriksa tata letak.
- **Model dalam semua bukti ini adalah fixture/test double. Bukan inferensi LLM.** Adapter Ollama diuji memakai HTTP stub.
- **Belum ada deployment atau transaksi testnet publik.**

## Transaksi yang benar-benar dihasilkan

Dua run independen dengan kunci dan chain lokal baru; alamat berbeda adalah hal yang disengaja.

| Bukti | Run tes inti | Run browser |
|---|---|---|
| Kontrak | `0xC96405c572BBa9d30647f252F9Fd9bC75dc07Ec8` | `0x8E4F0901cceCdBC80Bc87D0C8B58a8D33970a9Cc` |
| Hash pembayaran | `0xbed36a01a0cffba616fd3ec1439c3a1401b2a29d6b6ce2bd220a2cd8a7601bde` | `0x40a8cfcf07c4903d9f2619c5d494aa9f0c52929774cac2cd75bd519cfd911d8a` |
| Block | 4 | 4 |
| Nilai | 0,001 ETH uji | 0,001 ETH uji |
| Gas digunakan | 89324 | 89324 |
| Status | CONFIRMED lokal | CONFIRMED lokal |

Hash tersebut **tidak dapat dicari di explorer Sepolia**. Chain sementara tes sudah dihentikan; rekaman receipt/event disertakan untuk inspeksi dan kode memungkinkan reproduksi dengan hash baru.

Transaksi revert yang benar-benar ditambang dalam tes: `0xa10588d791745178a734896a3720d0204c0e0db481ecbadb253d3e81f9c9d0cd`. Status verifier: **REVERTED**, tanpa payout. File `local-transactions.json` berisi hash dan alasan keputusan tanpa private key.

## Hal yang terbukti dan tidak terbukti

Terbukti pada skenario lokal: pengamatan bukti dan pemilihan action melalui fixture; batas penerima/nominal/rubric; signature; pause/revoke/expiry; gas budget; idempotensi; antrean pending; receipt/event/state; restart journal; deteksi reorg; penolakan schema AI yang memperluas mandat.

Tidak terbukti: penilaian semantik LLM akurat, ketahanan terhadap semua prompt injection, performa model pada laptop pengguna, wallet browser testnet, RPC publik, finalitas publik, keamanan produksi atau keberterimaan pengguna.

## Reproduksi

```bash
npm ci
npm run compile
npm test
npm run demo
```

Mode model nyata dan deployment Sepolia dijelaskan di README. Uji browser opsional melalui `scripts/browser-smoke.mjs` membutuhkan Playwright/Chromium yang diinstal terpisah. Semua data contoh adalah sintetis.
