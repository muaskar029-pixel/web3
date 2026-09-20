# Rencana implementasi ShieldChain

Sumber: keenam Markdown asli di root, dibaca mulai dari brief utama. Folder awal hanya berisi spesifikasi, tanpa aplikasi atau AGENTS.md. Brief utama terpotong pada bagian 7; scope lengkap mengikuti Master Prompt dan empat dokumen alur.

## Halaman dan alur

`/` dan `/scan` menerima target, menyimpan kasus sebelum navigasi ke `/tracking?case=id`. `/validator` menyediakan mock wallet dan staking. `/validator/cases/[caseId]` memuat evidence sebelum konfirmasi vote. `/ledger` mencatat hasil simulasi dan `/methodology` menjelaskan keterbatasannya.

## Fondasi desain

Greenfield. DESIGN_VARIANCE 4, MOTION_INTENSITY 3, VISUAL_DENSITY 4. Navy dan cyan, Geist dan Geist Mono, status hijau/amber/merah yang selalu disertai teks. Tema sistem dengan toggle manual, panel 16px, input/tombol 10px, badge pill. Aksesibilitas dan keterbacaan mengatur prioritas. Skill design-taste-frontend digunakan pada landing dan metodologi; kebutuhan aplikasi dalam master prompt mengatur dashboard dan ledger.

## Struktur dan tahap

1. `src/app`: routes, metadata, tema, layout; `src/components/ui`: komponen resmi shadcn.
2. `src/features`: scan, risk report, validator, ledger; `src/lib`: domain, risk service, storage, wallet dan blockchain adapter.
3. Simpan state utama dalam satu dokumen tervalidasi; key legacy tetap disinkronkan. Kunci lintas tab mencegah double vote dan kehilangan update.
4. Uji aturan bisnis, sinkronisasi dua tab dan seluruh alur demo; lint, typecheck, build dan inspeksi browser responsif.
5. README, arsitektur, user flow, design system dan panduan integrasi produksi.

Seluruh angka risiko adalah heuristik demonstrasi. Tidak ada pemindaian jaringan, transaksi sungguhan, atau penetapan halal/haram. Laporan disimpan per browser; tautan laporan belum dapat dibuka di perangkat lain tanpa backend.
