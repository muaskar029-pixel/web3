import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Code2,
  Database,
  Scale,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/feedback";
export const metadata: Metadata = { title: "Metodologi & Keterbatasan" };

export default function MethodologyPage() {
  return (
    <div className="page-container methodology-page">
      <div className="page-heading">
        <span className="page-kicker">
          <BookOpen size={17} /> METODOLOGI
        </span>
        <h1>Pahami bagaimana penilaian dibuat.</h1>
        <p>
          Bukti, sumber data, dan keterbatasan harus sama jelasnya dengan skor.
        </p>
      </div>
      <div className="notice warning">
        <Bot size={20} />
        <p>
          <strong>Ini adalah prototipe simulasi.</strong> Belum ada model AI,
          scanner kontrak, ataupun smart contract yang terhubung. Tidak ada
          pemindaian situs target.
        </p>
      </div>
      <section className="method-section">
        <h2>Tiga dimensi, konteks yang berbeda.</h2>
        <div className="method-dimensions">
          <article>
            <Code2 size={23} />
            <h3>Risiko teknis</h3>
            <p>
              Pada integrasi nyata: fungsi mint, ownership, kunci likuiditas,
              konsentrasi holder, dan pola transaksi. Pada demo: skor mengikuti
              kecocokan kata.
            </p>
          </article>
          <article>
            <Users size={23} />
            <h3>Rekayasa sosial</h3>
            <p>
              Pada integrasi nyata: impersonasi, domain tiruan, tekanan waktu,
              dan janji keuntungan. Demo tidak membaca chat atau isi grup.
            </p>
          </article>
          <article>
            <Scale size={23} />
            <h3>Indikator syariah</h3>
            <p>
              Informasi tentang ketidakjelasan (gharar), spekulasi menyerupai
              judi (maysir), dan transparansi. Bukan fatwa atau penetapan
              halal/haram; perlu telaah ahli.
            </p>
          </article>
        </div>
      </section>
      <section className="method-section">
        <h2>Bagaimana skor demo dihitung?</h2>
        <p>
          Aturan dijalankan berurutan dengan pencocokan kata tanpa membedakan
          huruf besar dan kecil.
        </p>
        <div className="method-rules">
          <article>
            <span className="badge risk-low">0-29 · Rendah</span>
            <h3>Pola institusi</h3>
            <p>
              <code>gov, edu, komdigi, ui.ac.id</code>
            </p>
            <p>
              Teknis 5, sosial 4, syariah 2. Kecocokan kata tidak membuktikan
              afiliasi atau memverifikasi sumber.
            </p>
          </article>
          <article>
            <span className="badge risk-high">70-100 · Tinggi</span>
            <h3>Pola skenario phishing</h3>
            <p>
              <code>airdrop, claim, login, free, nekopoi</code>
            </p>
            <p>
              Teknis 92, sosial 88, syariah 95. Pemicu ini tidak membuktikan
              tindakan penipuan.
            </p>
          </article>
          <article>
            <span className="badge risk-medium">30-69 · Menengah</span>
            <h3>Target lainnya</h3>
            <p>
              Teknis 45, sosial 50, syariah 40. Data belum cukup; skor bukan
              pemeriksaan independen.
            </p>
          </article>
        </div>
        <p className="method-caution">
          Batasan penting: kata institusi diprioritaskan sesuai spesifikasi
          demo, termasuk jika muncul pada path atau nama grup. Penyerang dapat
          meniru kata tersebut. Heuristik ini tidak layak digunakan untuk
          keputusan investasi.
        </p>
      </section>
      <section className="method-section">
        <h2>Bedakan analisis, laporan, dan konsensus.</h2>
        <dl className="source-list">
          <div>
            <dt>
              <Bot size={19} />
              Analisis otomatis
            </dt>
            <dd>
              Skor dan evidence dari layanan analisis. Pada MVP ini, sumbernya
              heuristik lokal dan kualitas datanya terbatas, bukan confidence AI
              terkalibrasi.
            </dd>
          </div>
          <div>
            <dt>
              <Users size={19} />
              Laporan komunitas
            </dt>
            <dd>
              Bukti tambahan dari pengguna, dengan label belum diverifikasi.
              Laporan tidak otomatis mengubah skor.
            </dd>
          </div>
          <div>
            <dt>
              <Database size={19} />
              Konsensus & pencatatan
            </dt>
            <dd>
              Produksi akan memakai konsensus dan transaksi on-chain. Demo
              menyelesaikan kasus setelah satu vote dan mencatatnya di browser,
              bukan blockchain.
            </dd>
          </div>
        </dl>
      </section>
      <section className="method-section">
        <h2>Mengapa staking dan blockchain?</h2>
        <p>
          Stake memberi konsekuensi pada validasi. Blockchain dapat menyediakan
          catatan yang dapat diaudit tanpa bergantung pada satu pengelola.
          Transparansi pencatatan tidak menjamin kebenaran bukti atau keputusan.
        </p>
        <details className="method-disclosure">
          <summary>Lihat aturan reward dan slashing simulasi</summary>
          <p>
            Minimum stake 0.1 ETH. Pilihan &quot;Terindikasi phishing&quot;
            mendapatkan reward tetap 0.05 ETH. Pilihan &quot;Tidak ditemukan
            indikasi utama&quot; memotong stake 0.10 ETH. Mekanisme tetap ini
            mengikuti skenario hackathon dan tidak membuktikan ketepatan vote.
            Setelah stake kurang dari minimum, validator harus menambah stake
            untuk voting kembali.
          </p>
        </details>
      </section>
      <section className="method-section">
        <h2>Data tetap berada di browsermu.</h2>
        <p>
          Kasus, bukti, wallet, dan ledger disimpan di localStorage. Tab pada
          origin yang sama tersinkron otomatis. Tautan laporan belum dapat
          dibuka pada perangkat lain. Data dapat hilang jika penyimpanan browser
          dibersihkan.
        </p>
        <p>
          Hash transaksi dihasilkan untuk simulasi dan tidak memiliki tautan
          block explorer. Untuk layanan nyata, diperlukan backend, model
          analisis, quorum validator, mekanisme banding, dan smart contract yang
          diuji serta diaudit.
        </p>
      </section>
      <DisclaimerBanner />
      <Button asChild>
        <Link href="/scan">
          Scan Risiko
          <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  );
}
