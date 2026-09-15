# Materi Hackathon — Milestone Pilot

## Pitch 60 detik

Pengelola hibah kecil punya pekerjaan berulang: membaca bukti milestone, meminta revisi, lalu membuka wallet untuk membayar. Kontributor menunggu, sementara alasan pencairan sering terpisah dari transaksinya.

Milestone Pilot menghubungkan langkah-langkah itu. Pengelola lebih dahulu menentukan penerima, nominal, rubric dan tenggat di smart contract. Ketika bukti masuk, agent menilai isi dokumen. Jika belum lengkap, ia meminta revisi. Jika memenuhi mandat, ia mengeksekusi pembayaran dan memeriksa hasilnya sebelum melanjutkan.

AI tidak dapat mengganti penerima atau menambah nominal. Batas itu ditegakkan kontrak. Contoh kami adalah hibah mikro untuk panduan katalog perpustakaan.

Prototipe sudah menjalankan transaksi pada EVM lokal dengan model pengganti yang ditandai jelas. Integrasi Ollama tersedia; pengujian model nyata dan deployment Sepolia masih harus diselesaikan. Kami membuktikan mekanisme otonomi terbatas, bukan mengklaim penilaian AI selalu benar.

Sekitar 130 kata; sesuaikan tempo latihan. Setelah Sepolia+LLM benar-benar terverifikasi, ganti kalimat status dengan bukti aktual dan satu hash yang tersedia.

## Naskah demo 3 menit

**Prasyarat demo target hackathon:** model Ollama benar-benar berjalan, owner/agent/recipient wallet testnet siap, kontrak Sepolia terdeploy dan didanai. Jangan menjalankan narasi “transaksi di testnet publik” pada mode lokal. Jika prasyarat belum terpenuhi, gunakan mode lokal dan sebutkan bahwa output model adalah fixture.

| Waktu | Tampilan/tindakan | Narasi |
|---|---|---|
| 0:00–0:20 | Tunjukkan kriteria panduan katalog dan pihak pengelola/kontributor. | “Setiap revisi dokumen harus diperiksa, lalu admin membuat pembayaran terpisah. Kami menguji apakah dua tahap ini bisa berjalan dalam satu mandat.” |
| 0:20–0:45 | Tampilkan owner, penerima, budget, deadline dan daftar milestone. Pada testnet, register satu milestone memakai wallet owner; dana escrow sudah dideploy sebelumnya. | “Pemilik menetapkan penerima dan nilai 0,001 ETH uji. Agent tidak bisa mengubahnya. Ini persetujuan awal.” |
| 0:45–1:10 | Penerima mengirim dokumen yang hanya menjelaskan pencarian, revisi 1; tunjukkan mode `ollama:...` atau label fixture bila lokal. | “Bukti masuk membangunkan worker. Agent menemukan kriteria lokasi rak dan ketersediaan belum tercakup. Ia meminta revisi tanpa membayar.” |
| 1:10–1:35 | Kirim revisi 2 lengkap; tampilkan JSON action/checks/quote. | “Sekarang dokumen menjelaskan kedua hal. Alasan singkat dan kutipannya bisa diperiksa. Validator menolak properti di luar schema.” |
| 1:35–2:10 | Jangan klik tombol pembayaran. Tunjukkan SUBMITTING/PENDING/CONFIRMING dan hash. | “Signer terpisah mengirim release. Penerima dan nominal diambil dari kontrak, bukan dari teks AI.” |
| 2:10–2:30 | Buka hash **Sepolia** di explorer; tampilkan sukses, event Released dan state paid. Jika lokal, tunjukkan receipt lokal dan sebutkan belum ada explorer publik. | “Agent memeriksa hasil sebelum melanjutkan. Menampilkan hash saja tidak cukup; event dan state juga harus cocok.” |
| 2:30–2:50 | Kirim bukti yang sama lagi; tunjukkan saldo/total tidak naik kedua kali. Uji penerima di luar izin lewat tes signer lokal atau simulasi kontrak terdeploy dengan akun tanpa izin. | “Pemicu berulang tidak membayar dua kali. Permintaan di luar mandat ditolak. Penolakan sebelum broadcast ini tidak menghasilkan hash transaksi baru.” |
| 2:50–3:00 | Tunjukkan tombol revoke dan catatan keterbatasan. | “Agent menafsirkan dokumen; kontrak membatasi pembayaran. Kami belum membuktikan AI kebal kesalahan atau dokumen selalu benar.” |

Jika konfirmasi testnet lebih lama dari slot demo, jelaskan status pending dan tampilkan receipt run terdahulu yang diberi waktu/label jelas. Jangan berpura-pura receipt sebelumnya berasal dari transaksi yang sedang pending. Model pada laptop kecil dapat memperpanjang waktu; ukur sebelum rekaman.

## Ringkasan untuk formulir submission

**Nama:** Milestone Pilot  
**Tagline:** Bukti kerja menjadi pembayaran, dalam batas mandat.  
**Track:** AI Agent yang mengambil keputusan dan mengeksekusi tindakan on-chain.

Milestone Pilot adalah prototipe agent untuk memeriksa dokumen milestone hibah mikro dan menjalankan pencairan escrow. Pengelola menetapkan rubric, penerima, nominal dan batas waktu terlebih dahulu. Agent membaca bukti bertanda tangan, meminta revisi jika belum cukup, atau mengeksekusi release ketika penilaian dan kebijakan terpenuhi. Hasil diperiksa melalui receipt, event, dan status kontrak sebelum pekerjaan berikutnya.

LLM bekerja off-chain dan tidak menerima private key. Proses signer terpisah hanya menerima request release untuk kontrak yang ditetapkan. Kontrak mencegah perubahan penerima, pelampauan anggaran dan pembayaran ganda. Pemilik dapat menjeda atau mencabut mandat.

Stack: Solidity, ethers, Node.js, SQLite, Ajv, Ollama; EVM lokal untuk pengujian dan target deployment Ethereum Sepolia. Frontend menampilkan mandat, bukti, alasan keputusan dan transaksi.

**Status yang jujur saat paket ini dibuat:** transaksi dan pengujian kontrak berjalan pada EVM lokal; keputusan memakai fixture eksplisit. Adapter Ollama serta script deployment tersedia, tetapi inferensi model nyata dan transaksi publik Sepolia belum diverifikasi. Bukti hash lokal disertakan dengan label jaringan. Produk bersifat hibrida, bukan sepenuhnya terdesentralisasi.

**Repositori publik:** belum dibuat. **Alamat testnet:** belum tersedia. **Demo publik:** belum dipublikasikan. Isi kolom-kolom ini hanya setelah tindakan terkait benar-benar selesai.

## Lima pertanyaan kritis juri

**1. Mengapa perlu AI? Bukankah checklist sudah cukup?**  
Checklist cukup untuk keberadaan file atau status build. Kami membatasi AI pada kesesuaian isi dokumen naratif dengan rubric. Manfaatnya belum terbukti sampai dibandingkan dengan baseline aturan dan label reviewer manusia. Fixture pengujian bukan bukti kebutuhan AI.

**2. Mengapa blockchain, bukan database?**  
Database cukup untuk review. Blockchain dipakai karena dana berasal dari aset on-chain dan pihak ingin pembatasan escrow yang dapat mereka periksa. Jika target pengguna hanya membayar lewat bank dan menerima kontrol satu admin, versi database lebih masuk akal.

**3. Apa yang terjadi jika AI tertipu atau dokumennya palsu?**  
Validasi schema, provenance tanda tangan, kutipan dan batas kontrak mempersempit risiko, tetapi tidak membuktikan kebenaran. Agent tetap dapat salah membayar milestone yang sudah diotorisasi. Karena itu contoh kami hanya menilai dokumen sebagai hasil pekerjaan, menggunakan aset uji dan nominal kecil; bukan verifikasi dampak di dunia nyata.

**4. Seberapa otonom dan terdesentralisasi proyek ini?**  
Setelah mandat awal, agent bisa meminta revisi, mengirim release, memeriksa receipt dan melanjutkan tanpa persetujuan pembayaran lagi. Namun model, scheduler, database dan signer terpusat pada host operator. Pemisahan proses bukan jaminan terhadap kompromi host. Kontraknya saja yang menegakkan batas on-chain.

**5. Apa bukti bahwa ini bukan sekadar dashboard dengan transaksi mock?**  
Kontrak dikompilasi dan dieksekusi pada EVM lokal; tes memeriksa saldo penerima, event, paid state, replay, pembatasan akses, pending, transaksi revert dan reorg. Respons model dalam tes memang double yang diberi label. Untuk memenuhi demo AI+testnet penuh, kami masih harus menjalankan model nyata dan menyertakan receipt Sepolia yang dapat diperiksa publik.
