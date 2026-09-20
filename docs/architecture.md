# Arsitektur ShieldChain

## Batas tanggung jawab

Server Components memuat shell halaman dan konten statis. Client Components hanya mengelola form, wallet, transaksi, filter, tema, dan langganan state. UI tidak membaca localStorage langsung; seluruh penyimpanan melalui `src/lib/storage.ts`.

- `domain.ts`: Zod memvalidasi bentuk state persisten, enum status, angka nonnegatif dan skor 0-100. Tipe TypeScript diturunkan dari schema.
- `risk.ts`: validasi input, klasifikasi target, heuristik dan pembuatan kasus. Target hanya diproses sebagai teks; tidak di-fetch atau dirender sebagai HTML.
- `services.ts`: `riskService`, `WalletAdapter`, `BlockchainService`. Adapter simulasi dipakai UI; reducer `applyStake` dan `applyVote` dapat diuji terpisah.
- `storage.ts`: snapshot, write, migrasi batas versi, event browser dan penguncian antartab. Data rusak tidak ditimpa diam-diam.
- `use-store.ts`: `useSyncExternalStore` dengan snapshot SSR stabil mencegah hydration mismatch. Listener dibersihkan saat unmount.

## Data flow

```text
ScanForm -> riskService.submit -> createCase -> storage.update -> redirect
Tracking -> riskService.analyze -> assessment + timeline -> store subscribers
Wallet/Stake/Vote UI -> adapters -> validation + reducer -> storage.update
storage.update -> Web Lock -> one authoritative localStorage write
               -> legacy key mirrors -> custom event / browser storage event
               -> tracker + validator queue + ledger
```

## Konsistensi dan saldo

ETH simulasi disimpan sebagai integer milliETH (1 ETH = 1.000 unit), bukan pecahan floating point. Minimum stake 100 unit, reward 50, slashing 100. Validasi jumlah dan saldo terjadi di layanan dan reducer, bukan hanya form.

Write ke state utama bersifat atomik di localStorage. Web Lock `shieldchain-state` membaca state terbaru saat lock dimiliki, lalu menerapkan satu perubahan. Karena itu dua tab tidak dapat memberi reward dua kali atau menimpa update satu sama lain pada browser yang sama. Server/kontrak harus mengambil alih jaminan ini untuk penggunaan nyata.

`pendingCaseId` hanya menunjuk target terbaru, tetapi seluruh kasus yang menunggu tetap berada dalam antrean. Menyelesaikan kasus lama tidak menghapus pending scan lain. `lastVoteCaseId` hanya dipakai untuk mirror legacy; tracker selalu membaca vote pada kasusnya sendiri.

## State kasus

`submitted -> analyzing -> awaiting_validation -> voting -> consensus_reached`.

Tahap analisis adalah operasi heuristik singkat yang dapat dilanjutkan setelah refresh. Vote memakai status pending di UI dan menulis event `voting` serta `consensus_reached` bersama ledger, sehingga refresh tidak meninggalkan transaksi separuh selesai. `failed` tersedia untuk kegagalan layanan analisis di integrasi selanjutnya. Kesalahan penyimpanan ditampilkan inline.

## Batas simulasi

Semua tab origin yang sama berbagi satu mock wallet. Tidak ada autentikasi atau keamanan ekonomi. Devtools dapat mengubah state. Penyimpanan yang dihapus tidak dapat dipulihkan tanpa cadangan. Legacy keys tidak otoritatif dan tidak boleh digunakan untuk mengambil keputusan.

Migrasi produksi dijelaskan pada `future-integration.md`.
