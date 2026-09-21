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

const stages = [
  "Memvalidasi target",
  "Memeriksa indikator teknis",
  "Memeriksa rekayasa sosial",
  "Menghitung indikator syariah",
  "Menyusun evidence",
  "Mengantrekan validasi komunitas",
];


export function TrackingScreen({ caseId }: { caseId?: string }) {
  const { data, ready, error: storageError } = useStore();
  const [error, setError] = useState("");
  const [apiItem, setApiItem] = useState<any>(null);
  const notify = useNotify();
  const baseItem = caseId
    ? data.cases.find((entry) => entry.id === caseId)
    : data.cases[0];
  const item = apiItem || baseItem;
  const id = item?.id;
  const status = item?.status;

  useEffect(() => {
    if (!id) return;
    const fetchCase = () => {
      fetch(`/api/case?id=${id}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => { if (data) setApiItem(data); })
        .catch(console.error);
    };
    fetchCase();
    const interval = setInterval(fetchCase, 3000);
    return () => clearInterval(interval);
  }, [id]);

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
      <RiskScores caseItem={item} />
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
              <EvidenceList caseItem={item} />
              <div className="report-evidence-bottom">
                <Link className="text-link" href="/methodology">
                  Cara membaca hasil
                  <ArrowRight size={14} />
                </Link>
              </div>
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
                  href={item.status === "on-chain" || item.status === "resolved" ? "/ledger" : `/validator/cases/${item.id}`}
                >
                  {item.status === "on-chain" || item.status === "resolved" ? "Public Ledger" : "Buka Validasi"}
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
          <DisclaimerBanner />
    </div>
  );
}
