import type { Metadata } from "next";
import Image from "next/image";
import { ScanForm } from "@/features/scan/scan-form";
import { DisclaimerBanner } from "@/components/feedback";
import { ScanLine } from "lucide-react";
export const metadata: Metadata = { title: "Scan Risiko" };
export default function ScanPage() {
  return (
    <div className="page-container scan-page">
      <div className="page-heading">
        <span className="page-kicker">
          <ScanLine size={17} /> PEMERIKSAAN RISIKO
        </span>
        <h1>Periksa sebelum percaya.</h1>
        <p>
          Masukkan target untuk melihat indikator risiko dan bukti pendukungnya.
        </p>
      </div>
      <div className="scan-page-layout">
        <section className="panel">
          <h2>Apa yang ingin kamu periksa?</h2>
          <p className="muted">
            Mendukung domain, URL, alamat EVM, serta nama grup dengan awalan
            &quot;Grup&quot;.
          </p>
          <ScanForm />
          <DisclaimerBanner compact />
          <p className="local-note">
            Analisis menggunakan aturan demo. Target tidak diakses dan tidak
            dikirim ke layanan pihak ketiga.
          </p>
        </section>
        <Image
          src="/images/shield-hero-cutout.webp"
          alt="Ilustrasi perisai ShieldChain"
          width={420}
          height={420}
          sizes="(max-width: 767px) 1px, 30vw"
        />
      </div>
    </div>
  );
}
