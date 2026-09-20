# Menghubungkan layanan nyata

## Analisis

Ganti implementasi `riskService` dengan API server yang mengembalikan schema assessment, provenance, waktu observasi, bukti dan kualitas data. API key tetap di server. Tambahkan verifikasi domain, perlindungan SSRF saat mengambil URL, pembatasan request, serta kegagalan sumber data yang ditampilkan per dimensi. Jangan mempertahankan skor heuristik sebagai fallback yang tampak nyata.

Gunakan RPC/scanner untuk membedakan EOA dan contract, membaca ownership/mint, kunci likuiditas serta konsentrasi holder. Analisis sosial memerlukan bukti yang diberikan pengguna atau sumber publik dengan izin akses. Kajian syariah perlu referensi resmi yang diverifikasi dan telaah ahli; skor kata kunci tidak cukup.

## Wallet

Implementasikan `WalletAdapter` dengan wagmi/viem, Privy, atau provider EIP-1193. Tambahkan network/chain ID, account change, disconnect, signature rejection, RPC error, dan saldo dari jaringan. `connected` lokal bukan autentikasi; gunakan challenge server dengan nonce jika identitas diperlukan.

## Transaksi

Implementasikan `BlockchainService` pada testnet terlebih dahulu. Kontrak harus memeriksa jumlah stake, otorisasi, satu vote per validator per kasus, quorum, tenggat, finalisasi, reward/slashing, banding dan perlindungan reentrancy. Tunggu receipt serta konfirmasi yang ditentukan chain; hash hanya dianggap nyata setelah dikirim ke jaringan yang ditampilkan.

Ganti integer milliETH demo dengan bigint wei di boundary jaringan. Jangan mengirim saldo lokal ke kontrak sebagai sumber kebenaran. Uji kontrak dan lakukan review keamanan sebelum nilai ekonomi nyata digunakan.

## Penyimpanan dan konsensus

Backend menjadi sumber state kanonis (misalnya PostgreSQL). Gunakan constraint unik untuk vote, transaksi database untuk saldo dan ledger, serta indexer event kontrak untuk status. Realtime dapat memakai SSE/WebSocket. LocalStorage cukup sebagai cache, bukan sumber kebenaran.

Tautan laporan publik membutuhkan ID backend, kebijakan akses, sanitasi evidence, penghapusan data pribadi, moderasi dan mekanisme dispute. Konten laporan komunitas harus tetap terpisah dari observasi on-chain yang sudah diverifikasi.

## Pergantian mode

Ganti label simulasi hanya setelah scan, transaksi, receipt, dan konsensus benar-benar terintegrasi dan diuji. Jangan mencampur data produksi dan data demo dalam satu namespace penyimpanan. Angka confidence harus berasal dari evaluasi terkalibrasi, bukan konstanta demonstrasi.
