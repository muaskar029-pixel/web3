# Alur pengguna

## Pengunjung

1. Masukkan target atau isi contoh. Validasi format menolak target kosong, URL berprotokol non-HTTP, URL dengan kredensial, markup, dan alamat EVM tidak valid.
2. Simpan kasus dan pending target sebelum redirect. Kegagalan penyimpanan mempertahankan form dan menampilkan error.
3. Tracking menjalankan heuristik dan menyimpan tiga dimensi beserta evidence dan timeline.
4. Pengunjung dapat membuka rincian evidence, menambahkan bukti yang belum diverifikasi, menyalin tautan lokal, atau membuka ledger.

## Validator

1. Connect Wallet membuka dialog yang menjelaskan saldo simulasi. Pengguna mengonfirmasi untuk mengaktifkannya.
2. Stake minimal 0.1 ETH dan tidak melebihi saldo. Nominal dibatasi tiga desimal; error tampil di form.
3. Validator aktif dapat membuka antrean. Detail kasus tetap mengharuskan stake dan pembacaan evidence sebelum vote.
4. Pilih penilaian, centang bahwa bukti sudah dibaca, tinjau konsekuensi, dan konfirmasi.
5. Layanan memeriksa state terkini, memastikan kasus belum pernah divote, lalu menyimpan seluruh hasil sekaligus.
6. Reward/slashing tampil, antrean kasus itu selesai, ledger terisi. Reconnect tidak mengisi ulang saldo.

## Sinkronisasi

- Tab yang melakukan aksi menerima custom event setelah write.
- Tab lain menerima `storage` event dan membaca snapshot terbaru.
- Sumber perubahan disaring berdasarkan key state, bukan seluruh localStorage.
- Tracker mencari kasus berdasarkan ID, tidak berdasarkan hasil vote global.
- Refresh memulihkan data yang sama. Tautan yang tidak memiliki kasus lokal menampilkan empty state, bukan laporan kasus lain.

## Hasil voting demo

Phishing memberi +0.05 ETH ke saldo. Tidak ditemukan indikasi utama memotong stake 0.10 ETH. Validator dengan stake di bawah 0.1 ETH harus menambah stake. Keduanya adalah aturan tetap simulasi, bukan penilaian kebenaran oleh blockchain.
