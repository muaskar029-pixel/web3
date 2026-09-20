# Verifikasi ShieldChain

Tanggal pemeriksaan: 20 September 2026. Target lokal: build production pada `http://localhost:3001`.

## Pemeriksaan otomatis

| Pemeriksaan                        | Hasil                                                         |
| ---------------------------------- | ------------------------------------------------------------- |
| `npm run test`                     | Lulus, 44 tes Vitest                                          |
| `npm run test:e2e`                 | Lulus, 3 skenario Playwright                                  |
| `npm run typecheck`                | Lulus                                                         |
| `npm run lint`                     | Lulus tanpa temuan                                            |
| `npm run build`                    | Lulus dengan webpack dan 9 route                              |
| Playwright axe WCAG 2A, 2AA, 2.1AA | Lulus pada desktop, tablet, mobile, tema terang dan gelap     |
| Lighthouse mobile                  | Performance 95, Accessibility 100, Best Practices 100, SEO 63 |

Playwright juga memeriksa skip link, keyboard navigation, dialog, error/empty state, tidak ada horizontal overflow, tidak ada page error, sinkronisasi dua tab, persistensi saldo, reward, slashing, dan ledger. Screenshot hasil pemeriksaan tersimpan di folder ini.

## Lighthouse

Audit final memakai Lighthouse 13.5.0 dengan Chrome headless pada emulasi mobile. Hasil yang relevan:

- First Contentful Paint: 1.1 s
- Largest Contentful Paint: 3.0 s pada satu pengukuran simulasi throttled
- Cumulative Layout Shift: 0
- Total Blocking Time: 60 ms
- Tidak ada error console atau aset jaringan yang gagal

LCP dapat berubah antar pengukuran karena CPU dan jaringan disimulasikan. Hero memakai aset WebP lokal, `loading="eager"`, `fetchPriority="high"`, ukuran intrinsik, dan `sizes` responsif. Jika target produksi membutuhkan LCP konsisten di bawah 2.5 s, langkah berikutnya adalah menguji CDN/hosting nyata dan mengukur ulang dengan profil perangkat pengguna.

Skor SEO 63 sengaja dipengaruhi `noindex, nofollow` pada metadata root. Prototipe lokal dan laporan simulasi belum boleh masuk indeks publik. Hapus directive tersebut hanya ketika konten, kebijakan privasi, dan layanan backend siap dipublikasikan.

## Pre-flight desain

- Design read: aplikasi intelijen risiko untuk pengguna Indonesia, dengan bahasa cybersecurity yang tenang dan trust-first.
- Dial: `DESIGN_VARIANCE 4`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 4`.
- Tema terang dan gelap diuji sebagai satu tema halaman, tanpa section yang berganti konteks.
- Tipografi memakai Geist dan Geist Mono lokal. Aksen cyan dikunci pada seluruh produk; warna hijau, amber, dan merah hanya untuk status dengan teks pendamping.
- Hero memakai komposisi split dan dua aset imagegen lokal. Tidak ada fake screenshot, logo pelanggan, testimonial, statistik penggunaan, atau klaim keamanan yang dibuat-buat.
- Shape system konsisten: panel 16px, kontrol 10px, badge pill. Motion dibatasi pada feedback dan state transition serta mengikuti reduced motion.
- Tidak ada em-dash atau decorative scroll cue pada copy aplikasi.

## Batasan yang disengaja

Semua analisis, saldo ETH, wallet, voting, reward, slashing, transaksi, dan public ledger adalah simulasi lokal per browser. Tidak ada AI API, RPC, smart contract, autentikasi, fetch situs, konsensus antarpengguna, atau fatwa. Detail jalur migrasi produksi ada di [future-integration.md](../future-integration.md).
