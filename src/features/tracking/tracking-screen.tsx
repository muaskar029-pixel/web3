"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  FilePlus2,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DisclaimerBanner,
  EmptyState,
  ErrorState,
  PageSkeleton,
  useNotify,
} from "@/components/feedback";
import {
  EvidenceList,
  PublicTracker,
  RiskScores,
  ShariaNote,
} from "@/components/risk-report";
import { useStore } from "@/hooks/use-store";
import {
  dateTime,
  messageOf,
  short,
  statusLabels,
  typeLabels,
} from "@/lib/domain";
import { riskService } from "@/lib/services";

const stages = [
  "Memvalidasi target",
  "Memeriksa indikator teknis",
  "Memeriksa rekayasa sosial",
  "Menghitung indikator syariah",
  "Menyusun evidence",
  "Mengantrekan validasi komunitas",
];
export function AnalysisProgress() {
  return (
    <section
      className="panel analysis-progress"
      role="status"
      aria-live="polite"
    >
      <ScanLine size={36} />
      <h2>Menyusun laporan risikomu</h2>
      <p className="muted">
        Menjalankan heuristik simulasi. Biasanya selesai dalam beberapa detik.
      </p>
      <ol>
        {stages.map((stage) => (
          <li key={stage}>
            <span className="analysis-step" />
            {stage}
          </li>
        ))}
      </ol>
    </section>
  );
}

function EvidenceDialog({ caseId }: { caseId: string }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const notify = useNotify();
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await riskService.addEvidence(caseId, text);
      setText("");
      setOpen(false);
      notify(
        "Bukti tambahan tersimpan sebagai laporan komunitas yang belum diverifikasi.",
      );
    } catch (error) {
      setError(
        messageOf(error).startsWith("[")
          ? "Jelaskan bukti antara 20 dan 2.000 karakter."
          : messageOf(error),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FilePlus2 size={16} />
          Tambah Bukti
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambahkan bukti pendukung</DialogTitle>
          <DialogDescription>
            Jelaskan fakta yang dapat diperiksa. Hindari data pribadi, seed
            phrase, dan tuduhan tanpa bukti. Laporan ini belum diverifikasi.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="form-stack">
          <label htmlFor="evidence-text">Penjelasan bukti</label>
          <textarea
            id="evidence-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={5}
            maxLength={2000}
            aria-describedby="evidence-help"
          />
          <p id="evidence-help" className="muted text-sm">
            20-2.000 karakter. Bukti disimpan pada browser ini.
          </p>
          {error && <ErrorState message={error} />}
          <Button disabled={busy}>
            {busy ? "Menyimpan..." : "Simpan Bukti"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function TrackingScreen({ caseId }: { caseId?: string }) {
  const { data, ready, error: storageError } = useStore();
  const [error, setError] = useState("");
  const notify = useNotify();
  const item = caseId
    ? data.cases.find((entry) => entry.id === caseId)
    : data.cases[0];
  const id = item?.id;
  const status = item?.status;
  useEffect(() => {
    if (!id || !["submitted", "analyzing"].includes(status ?? "")) return;
    let active = true;
    riskService.analyze(id).catch((error) => {
      if (active) setError(messageOf(error));
    });
    return () => {
      active = false;
    };
  }, [id, status]);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        `${location.origin}/tracking?case=${item!.id}`,
      );
      notify(
        "Tautan disalin. Laporan hanya tersedia di browser ini hingga backend terhubung.",
      );
    } catch {
      setError(
        "Tautan tidak dapat disalin. Salin alamat halaman dari browser.",
      );
    }
  }
  if (!ready) return <PageSkeleton />;
  if (storageError)
    return (
      <div className="page-container">
        <ErrorState message={storageError} />
      </div>
    );
  if (!item)
    return (
      <div className="page-container">
        <EmptyState
          title={
            caseId
              ? "Laporan tidak ditemukan di browser ini"
              : "Belum ada target yang diperiksa"
          }
          description="Laporan demo tersimpan lokal. Mulai scan di browser ini untuk membuat laporan baru."
        >
          <Button asChild>
            <Link href="/scan">
              Scan Risiko
              <ArrowRight size={16} />
            </Link>
          </Button>
        </EmptyState>
      </div>
    );
  return (
    <div className="page-container">
      <Link href="/scan" className="back-link">
        <ArrowLeft size={15} />
        Kembali ke scan
      </Link>
      <div className="page-heading report-heading">
        <div>
          <div className="badge-row">
            <span className="badge simulation">Analisis simulasi</span>
            <span className="badge neutral">{statusLabels[item.status]}</span>
          </div>
          <h1>Laporan risiko</h1>
          <p className="target-title">{item.target}</p>
          <div className="metadata-row">
            <span>{typeLabels[item.targetType]}</span>
            <span>{dateTime(item.createdAt)}</span>
            <span className="mono">ID {short(item.id, 4)}</span>
          </div>
        </div>
        <Button variant="outline" onClick={copyLink}>
          <Copy size={15} />
          Salin Tautan
        </Button>
      </div>
      {error && <ErrorState message={error} />}
      {!item.assessment ? (
        <>
          <AnalysisProgress />
          {error && (
            <Button
              onClick={() => {
                setError("");
                void riskService
                  .analyze(item.id)
                  .catch((error) => setError(messageOf(error)));
              }}
            >
              Coba lagi
            </Button>
          )}
        </>
      ) : (
        <>
          <RiskScores assessment={item.assessment} />
          <ShariaNote />
          <div className="report-layout">
            <section className="panel">
              <div className="section-title">
                <h2>Bukti di balik indikator</h2>
                <span className="badge neutral">Data terbatas</span>
              </div>
              <p className="muted section-description">
                Ketiga skor berasal dari pencocokan kata pada target. Belum ada
                pemeriksaan kontrak atau data on-chain.
              </p>
              <EvidenceList assessment={item.assessment} />
              <div className="report-evidence-bottom">
                <EvidenceDialog caseId={item.id} />
                <Link className="text-link" href="/methodology">
                  Cara membaca hasil
                  <ArrowRight size={14} />
                </Link>
              </div>
              {item.reports.length > 0 && (
                <div className="community-reports">
                  <h3>Bukti tambahan komunitas</h3>
                  {item.reports.map((report) => (
                    <article key={report.id}>
                      <span className="badge neutral">Belum diverifikasi</span>
                      <p>{report.text}</p>
                      <time dateTime={report.createdAt}>
                        {dateTime(report.createdAt)}
                      </time>
                    </article>
                  ))}
                </div>
              )}
            </section>
            <div className="report-sidebar">
              <PublicTracker item={item} />
              <div className="notice">
                <CheckCircle2 size={18} />
                <p>
                  Perubahan vote tersinkron otomatis di tab lain pada browser
                  yang sama.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link
                  href={item.vote ? "/ledger" : `/validator/cases/${item.id}`}
                >
                  {item.vote ? "Public Ledger" : "Buka Validasi"}
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
          <DisclaimerBanner />
        </>
      )}
    </div>
  );
}
