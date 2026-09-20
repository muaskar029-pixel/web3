"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Info,
  LockKeyhole,
  Vote as VoteIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DisclaimerBanner,
  EmptyState,
  ErrorState,
  PageSkeleton,
  useNotify,
} from "@/components/feedback";
import { EvidenceList, RiskScores, ShariaNote } from "@/components/risk-report";
import { StakeDialog } from "@/features/validator/validator-screen";
import { WalletButton } from "@/components/app-shell";
import { useStore } from "@/hooks/use-store";
import {
  dateTime,
  eth,
  messageOf,
  short,
  type Vote,
  voteLabels,
} from "@/lib/domain";
import { blockchainService, MIN_STAKE } from "@/lib/services";

export function CaseScreen({ caseId }: { caseId: string }) {
  const { data, ready, error: storageError } = useStore();
  const [choice, setChoice] = useState<Vote | null>(null);
  const [read, setRead] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const notify = useNotify();
  const item = data.cases.find((entry) => entry.id === caseId);
  const transaction = data.ledger.find((entry) => entry.caseId === caseId);
  const active = data.wallet.connected && data.wallet.staked >= MIN_STAKE;
  async function vote() {
    if (!choice) return;
    setBusy(true);
    setError("");
    try {
      await blockchainService.vote(caseId, choice);
      setConfirm(false);
      notify(
        "Vote simulasi tercatat. Tracker dan public ledger sudah diperbarui.",
      );
    } catch (error) {
      setError(messageOf(error));
    } finally {
      setBusy(false);
    }
  }
  async function copyHash() {
    try {
      await navigator.clipboard.writeText(transaction!.hash);
      notify("Hash transaksi simulasi disalin.");
    } catch {
      setError(
        "Hash tidak dapat disalin. Pilih dan salin teks hash secara manual.",
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
          title="Kasus tidak ditemukan"
          description="Kasus demo hanya tersedia pada browser tempat scan dilakukan."
        >
          <Button asChild>
            <Link href="/validator">Kembali ke validator</Link>
          </Button>
        </EmptyState>
      </div>
    );
  return (
    <div className="page-container">
      <Link href="/validator" className="back-link">
        <ArrowLeft size={15} />
        Antrean validator
      </Link>
      <div className="page-heading">
        <div className="badge-row">
          <span className="badge simulation">Kasus simulasi</span>
          <span className="mono muted">ID {short(item.id, 5)}</span>
        </div>
        <h1>Telaah bukti. Berikan penilaian.</h1>
        <p className="target-title">{item.target}</p>
      </div>
      {!item.assessment ? (
        <EmptyState
          title="Analisis belum selesai"
          description="Buka laporan untuk menyelesaikan analisis sebelum memberikan vote."
        >
          <Button asChild>
            <Link href={`/tracking?case=${item.id}`}>
              Buka Laporan
              <ArrowRight size={15} />
            </Link>
          </Button>
        </EmptyState>
      ) : (
        <>
          <RiskScores assessment={item.assessment} />
          <ShariaNote />
          <div className="report-layout">
            <section className="panel">
              <div className="section-title">
                <h2>Bukti analisis</h2>
                <span className="badge neutral">Kualitas data terbatas</span>
              </div>
              <p className="section-description muted">
                Sumber: heuristik simulasi. Belum ada bukti on-chain yang
                diverifikasi.
              </p>
              <EvidenceList assessment={item.assessment} />
              <div className="community-reports">
                <h3>Riwayat laporan komunitas</h3>
                {item.reports.length ? (
                  item.reports.map((report) => (
                    <article key={report.id}>
                      <span className="badge neutral">Belum diverifikasi</span>
                      <p>{report.text}</p>
                      <time>{dateTime(report.createdAt)}</time>
                    </article>
                  ))
                ) : (
                  <p className="muted">
                    Belum ada evidence tambahan dari komunitas.
                  </p>
                )}
              </div>
              <Link className="text-link" href={`/tracking?case=${item.id}`}>
                Buka Laporan
                <ArrowRight size={15} />
              </Link>
            </section>
            <section className="panel vote-panel">
              <div className="section-title">
                <h2>
                  <VoteIcon size={20} />
                  Penilaian validator
                </h2>
              </div>
              {transaction ? (
                <div className="transaction-success">
                  <CheckCircle2 size={34} />
                  <h3>Vote simulasi tercatat</h3>
                  <p>{voteLabels[transaction.vote]}</p>
                  <strong
                    className={transaction.delta > 0 ? "positive" : "negative"}
                  >
                    {transaction.delta > 0 ? "+" : "-"}
                    {eth(Math.abs(transaction.delta))} ETH{" "}
                    {transaction.outcome === "reward" ? "reward" : "slashed"}
                  </strong>
                  <span className="badge simulation">
                    Simulasi mekanisme konsensus
                  </span>
                  <div className="hash-display">
                    <code>{transaction.hash}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyHash}
                      aria-label="Salin hash transaksi"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                  <Button asChild>
                    <Link href="/ledger">
                      Public Ledger
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              ) : !active ? (
                <div className="vote-locked">
                  <LockKeyhole size={30} />
                  <h3>Stake diperlukan untuk vote</h3>
                  <p>
                    Hubungkan wallet dan pertahankan stake minimal 0.1 ETH
                    simulasi.
                  </p>
                  {data.wallet.connected ? <StakeDialog /> : <WalletButton />}
                </div>
              ) : (
                <>
                  <div className="balance-row">
                    <span>Stake aktif</span>
                    <strong className="mono">
                      {eth(data.wallet.staked)} ETH
                    </strong>
                  </div>
                  <fieldset className="vote-options">
                    <legend>Pilih hasil penilaian</legend>
                    {(["Aman", "Phishing"] as const).map((value) => (
                      <label
                        key={value}
                        className={choice === value ? "selected" : ""}
                      >
                        <input
                          type="radio"
                          name="vote"
                          value={value}
                          checked={choice === value}
                          onChange={() => setChoice(value)}
                        />
                        <span>{voteLabels[value]}</span>
                      </label>
                    ))}
                  </fieldset>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={read}
                      onChange={(event) => setRead(event.target.checked)}
                    />
                    Saya telah membaca bukti dan memahami keterbatasan simulasi.
                  </label>
                  <div className="notice warning">
                    <Info size={17} />
                    <p>
                      Skenario tetap: vote phishing mendapat +0.05 ETH; pilihan
                      lainnya terkena slashing 0.10 ETH. Ini tidak membuktikan
                      kebenaran vote.
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    disabled={!choice || !read || busy}
                    onClick={() => setConfirm(true)}
                  >
                    Tinjau Vote
                    <ArrowRight size={16} />
                  </Button>
                </>
              )}
              {error && <ErrorState message={error} />}
            </section>
          </div>
          <DisclaimerBanner />
        </>
      )}
      <Dialog
        open={confirm}
        onOpenChange={(value) => {
          if (!busy) setConfirm(value);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi vote simulasi</DialogTitle>
            <DialogDescription>
              Vote akan dicatat pada kasus ini dan tidak dapat diubah pada demo.
            </DialogDescription>
          </DialogHeader>
          <div className="vote-confirm">
            <span className="muted">Penilaian untuk {item.target}</span>
            <strong>{choice ? voteLabels[choice] : ""}</strong>
            <p className={choice === "Phishing" ? "positive" : "negative"}>
              {choice === "Phishing"
                ? "Reward simulasi +0.05 ETH"
                : "Stake dipotong 0.10 ETH (slashing)"}
            </p>
          </div>
          {error && <ErrorState message={error} />}
          <div className="button-row">
            <Button
              variant="outline"
              onClick={() => setConfirm(false)}
              disabled={busy}
            >
              Kembali
            </Button>
            <Button onClick={vote} disabled={busy}>
              {busy ? "Mencatat vote simulasi..." : "Konfirmasi Vote"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
