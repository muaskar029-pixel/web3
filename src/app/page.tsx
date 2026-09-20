import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Code2,
  Fingerprint,
  Link2,
  LockKeyhole,
  MessagesSquare,
  ScanLine,
  Scale,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/feedback";
import { RiskLevelBadge } from "@/components/risk-report";
import { ScanForm } from "@/features/scan/scan-form";
import { assessRisk } from "@/lib/risk";

export default function Home() {
  const sample = assessRisk("claim-airdrop.example");
  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <span className="eyebrow">
            <ShieldCheck size={14} /> INTELIJEN RISIKO WEB3
          </span>
          <h1>
            Kenali risikonya.
            <br />
            <span>Lindungi asetmu.</span>
          </h1>
          <p className="hero-description">
            Periksa tautan, wallet, dan grup investasi dengan analisis risiko
            berbasis bukti dan validasi komunitas.
          </p>
          <ScanForm />
        </div>
        <div className="hero-art">
          <Image
            src="/images/shield-hero-cutout.webp"
            width={800}
            height={800}
            alt="Perisai kaca dan titanium sebagai ilustrasi perlindungan aset digital"
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 767px) 183px, (max-width: 1279px) calc(40vw - 72px), (max-width: 1440px) calc(44vw - 72px), 513px"
          />
        </div>
      </section>
      <section
        className="trust-strip page-width"
        aria-label="Prinsip ShieldChain"
      >
        <span>
          <Wallet size={18} />
          Scan tanpa menghubungkan wallet
        </span>
        <span>
          <Fingerprint size={18} />
          Bukti di balik setiap indikator
        </span>
        <span>
          <Users size={18} />
          Diperiksa bersama komunitas
        </span>
      </section>
      <div className="page-width">
        <DisclaimerBanner compact />
      </div>
      <section className="dimensions-section page-width" id="dimensi">
        <div className="section-heading">
          <h2>Risiko punya lebih dari satu sisi.</h2>
          <p>Pahami konteksnya melalui tiga dimensi yang saling melengkapi.</p>
        </div>
        <div className="dimensions-layout">
          <div className="dimension-features">
            {[
              {
                icon: Code2,
                title: "Yang tersembunyi di balik kode",
                text: "Indikator teknis membantu memahami transparansi kontrak, kepemilikan token, dan likuiditas.",
              },
              {
                icon: MessagesSquare,
                title: "Yang terlihat meyakinkan",
                text: "Kenali pola impersonasi, tautan tiruan, dan janji keuntungan yang tidak wajar.",
              },
              {
                icon: Scale,
                title: "Yang perlu dipertimbangkan",
                text: "Tinjau transparansi dan spekulasi melalui indikator syariah yang bersifat informatif, bukan fatwa.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="sample-report">
            <div className="sample-report-top">
              <span>
                <ScanLine size={17} /> Contoh hasil analisis
              </span>
              <span className="badge simulation">Simulasi</span>
            </div>
            <div className="sample-target">
              <span className="icon-box">
                <Link2 size={19} />
              </span>
              <div>
                <strong>claim-airdrop.example</strong>
                <span>Contoh target, bukan situs yang diverifikasi</span>
              </div>
            </div>
            <div className="sample-dimensions">
              {[
                { label: "Risiko teknis", risk: sample.technicalRisk },
                { label: "Rekayasa sosial", risk: sample.socialRisk },
                { label: "Indikator syariah", risk: sample.shariaRisk },
              ].map(({ label, risk }) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>
                    {risk.score}
                    <small>/100</small>
                  </strong>
                  <RiskLevelBadge level={risk.level} />
                </div>
              ))}
            </div>
            <div className="sample-footnote">
              <InfoText />
              Skor menunjukkan indikator, bukan kepastian.
            </div>
          </div>
        </div>
      </section>
      <section className="how-section page-width">
        <div className="section-heading">
          <h2>Dari rasa ragu, ke informasi.</h2>
          <p>
            Mulai dari satu tautan. Telusuri bukti sebelum mengambil keputusan.
          </p>
        </div>
        <div className="how-flow">
          {[
            {
              icon: Link2,
              title: "Masukkan target",
              text: "Tautan, alamat wallet, atau nama grup yang ingin diperiksa.",
            },
            {
              icon: ScanLine,
              title: "Pelajari analisis",
              text: "Baca indikator tiga dimensi beserta bukti dan keterbatasannya.",
            },
            {
              icon: Users,
              title: "Ikuti validasi",
              text: "Komunitas menelaah evidence dengan mekanisme staking dan voting.",
            },
            {
              icon: ShieldCheck,
              title: "Putuskan dengan sadar",
              text: "Gunakan informasi yang tersedia untuk menilai langkah selanjutnya.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="community-section page-width">
        <div className="community-art">
          <Image
            src="/images/community-network.webp"
            alt="Tiga blok kaca terhubung sebagai ilustrasi validasi komunitas"
            width={800}
            height={534}
            sizes="(max-width: 767px) 100vw, 45vw"
          />
        </div>
        <div className="community-copy">
          <span className="eyebrow">
            <Blocks size={14} /> TRANSPARANSI BERSAMA
          </span>
          <h2>
            Kepercayaan dibangun.
            <br />
            Bukan sekadar diklaim.
          </h2>
          <p>
            Validator mempertaruhkan stake untuk menelaah bukti. Setiap vote,
            reward, dan slashing dapat ditelusuri melalui public ledger.
          </p>
          <div className="community-note">
            <LockKeyhole size={18} />
            <span>
              Pada MVP ini, mekanisme berjalan sebagai simulasi lokal. Tidak ada
              ETH nyata yang dipertaruhkan.
            </span>
          </div>
          <div className="button-row">
            <Button asChild>
              <Link href="/validator">
                Jadi Validator
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/ledger">
                Public Ledger
                <ArrowUpRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="closing-section page-width">
        <ShieldCheck size={32} />
        <h2>Satu pemeriksaan sebelum satu keputusan.</h2>
        <Button asChild variant="outline">
          <Link href="/scan">
            Scan Risiko
            <ArrowRight size={17} />
          </Link>
        </Button>
      </section>
    </>
  );
}
function InfoText() {
  return <ShieldCheck size={15} />;
}
