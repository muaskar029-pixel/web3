"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Coins,
  LockKeyhole,
  Plus,
  ShieldCheck,
  TrendingDown,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WalletButton } from "@/components/app-shell";
import {
  EmptyState,
  ErrorState,
  PageSkeleton,
  useNotify,
} from "@/components/feedback";
import { RiskLevelBadge } from "@/components/risk-report";
import { useStore } from "@/hooks/use-store";
import { dateTime, eth, messageOf, short, type AppState } from "@/lib/domain";
import { blockchainService, MIN_STAKE, stakeSchema } from "@/lib/services";

export function StakeDialog() {
  const { data } = useStore();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const notify = useNotify();
  const id = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ amount: string }>({
    resolver: zodResolver(stakeSchema),
    defaultValues: { amount: "0.1" },
  });
  async function stake({ amount }: { amount: string }) {
    setError("");
    try {
      await blockchainService.stake(amount);
      setOpen(false);
      reset();
      notify("Stake simulasi berhasil. Antrean verifikasi terbuka.");
    } catch (error) {
      setError(messageOf(error));
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isSubmitting) setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button disabled={!data.wallet.connected}>
          <Plus size={16} />
          Stake
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambahkan stake simulasi</DialogTitle>
          <DialogDescription>
            Stake adalah saldo yang dikunci untuk berpartisipasi dalam validasi.
            Tidak ada ETH nyata yang digunakan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(stake)} className="form-stack" noValidate>
          <div className="balance-row">
            <span>Saldo tersedia</span>
            <strong className="mono">{eth(data.wallet.balance)} ETH</strong>
          </div>
          <label htmlFor={`${id}-stake`}>Nominal stake (ETH simulasi)</label>
          <Input
            id={`${id}-stake`}
            inputMode="decimal"
            {...register("amount")}
            aria-invalid={!!errors.amount}
            aria-describedby={`${id}-help ${id}-error`}
          />
          <p id={`${id}-help`} className="muted text-sm">
            Minimum 0.1 ETH. Maksimal 3 angka desimal.
          </p>
          {errors.amount && (
            <p id={`${id}-error`} className="field-error" role="alert">
              {errors.amount.message}
            </p>
          )}
          <div className="notice warning">
            <TrendingDown size={18} />
            <p>
              Dalam skenario ini, pilihan &quot;Tidak ditemukan indikasi
              utama&quot; memotong stake 0.10 ETH. Baca bukti sebelum voting.
            </p>
          </div>
          {error && <ErrorState message={error} />}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Memproses transaksi simulasi..."
              : "Konfirmasi Stake"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ValidatorStats({ data }: { data: AppState }) {
  const done = data.ledger.length;
  const rewards = data.ledger.filter(
    (entry) => entry.outcome === "reward",
  ).length;
  return (
    <div className="validator-stats">
      {[
        {
          label: "Total stake",
          value: `${eth(data.wallet.staked)} ETH`,
          icon: LockKeyhole,
        },
        {
          label: "Akurasi demo",
          value: done
            ? `${Math.round((rewards / done) * 100)}%`
            : "Belum ada vote",
          icon: ShieldCheck,
        },
        {
          label: "Reward simulasi",
          value: `+${eth(data.wallet.rewards)} ETH`,
          icon: Coins,
          kind: "positive",
        },
        {
          label: "Slashing simulasi",
          value: `-${eth(data.wallet.slashed)} ETH`,
          icon: TrendingDown,
          kind: "negative",
        },
      ].map(({ label, value, icon: Icon, kind }) => (
        <div key={label}>
          <span>
            <Icon size={16} />
            {label}
          </span>
          <strong className={kind}>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export function ValidatorScreen() {
  const { data, ready, error } = useStore();
  if (!ready) return <PageSkeleton />;
  const active = data.wallet.connected && data.wallet.staked >= MIN_STAKE;
  const queue = data.cases.filter(
    (item) => item.status === "awaiting_validation",
  );
  return (
    <div className="page-container">
      <div className="page-heading report-heading">
        <div>
          <div className="badge-row">
            <span className="badge simulation">
              Simulasi mekanisme konsensus
            </span>
            {active && (
              <span className="badge risk-low">
                <CheckCircle2 size={13} />
                Validator aktif
              </span>
            )}
          </div>
          <h1>Jaga kepercayaan, bersama.</h1>
          <p>
            Telaah bukti. Berikan penilaian. Bangun informasi yang dapat
            ditelusuri.
          </p>
        </div>
        {data.wallet.connected && <StakeDialog />}
      </div>
      {error && <ErrorState message={error} />}
      {!data.wallet.connected ? (
        <div className="validator-welcome">
          <div className="validator-welcome-copy">
            <span className="large-icon">
              <Users size={36} />
            </span>
            <h2>Sudut pandangmu berarti.</h2>
            <p>
              Validator membantu menilai laporan risiko dengan membaca evidence
              dan memberikan vote. Mulai dengan wallet simulasi dan stake
              minimal 0.1 ETH.
            </p>
            <WalletButton />
            <div className="notice">
              <LockKeyhole size={18} />
              <p>
                Staking memiliki risiko slashing. Pada demo ini, seluruh saldo
                dan transaksi bersifat simulasi.
              </p>
            </div>
          </div>
          <div className="validator-preview">
            <h3>Ruang kerja validator</h3>
            <div className="locked-metrics">
              <div>
                <span>Wallet</span>
                <LockKeyhole size={17} />
              </div>
              <div>
                <span>Antrean verifikasi</span>
                <LockKeyhole size={17} />
              </div>
              <div>
                <span>Riwayat kontribusi</span>
                <LockKeyhole size={17} />
              </div>
            </div>
            <p>Hubungkan wallet simulasi untuk membuka ruang kerja.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="wallet-bar">
            <span>
              <Wallet size={18} />
              <strong className="mono">{short(data.wallet.address!, 6)}</strong>
              <span className="badge simulation">Wallet demo</span>
            </span>
            <span>
              Saldo tersedia{" "}
              <strong className="mono">{eth(data.wallet.balance)} ETH</strong>
            </span>
          </div>
          <ValidatorStats data={data} />
          <p className="stats-note">
            Akurasi demo mengukur kesesuaian dengan skenario tetap, bukan
            ketepatan penilaian nyata. {data.ledger.length} kasus selesai.
          </p>
          <section className="panel queue-panel">
            <div className="section-title">
              <h2>
                Antrean verifikasi{" "}
                <span className="count-badge">{active ? queue.length : 0}</span>
              </h2>
              <Link href="/ledger" className="text-link">
                Public Ledger
                <ArrowUpRight size={15} />
              </Link>
            </div>
            {!active ? (
              <EmptyState
                title="Aktifkan peran validatormu"
                description="Stake minimal 0.1 ETH simulasi untuk membuka antrean kasus dan mulai menelaah bukti."
              >
                <StakeDialog />
              </EmptyState>
            ) : queue.length === 0 ? (
              <EmptyState
                title="Antrean sudah bersih"
                description="Belum ada kasus yang menunggu validasi. Scan target baru untuk menambahkan kasus."
              >
                <Button variant="outline" asChild>
                  <Link href="/scan">
                    Scan Risiko
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </EmptyState>
            ) : (
              <div className="validator-queue">
                {queue.map((item) => (
                  <article key={item.id}>
                    <span className="queue-icon">
                      <ClipboardList size={22} />
                    </span>
                    <div className="queue-target">
                      <strong>{item.target}</strong>
                      <span>
                        {dateTime(item.createdAt)} · ID {short(item.id, 4)}
                      </span>
                    </div>
                    <RiskLevelBadge
                      level={item.assessment!.technicalRisk.level}
                    />
                    <Button variant="outline" asChild>
                      <Link href={`/validator/cases/${item.id}`}>
                        Telaah Kasus
                        <ArrowRight size={15} />
                      </Link>
                    </Button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
