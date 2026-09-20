"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Blocks,
  CheckCircle2,
  Copy,
  Search,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EmptyState,
  ErrorState,
  PageSkeleton,
  useNotify,
} from "@/components/feedback";
import { useStore } from "@/hooks/use-store";
import {
  dateTime,
  eth,
  short,
  type LedgerEntry,
  voteLabels,
} from "@/lib/domain";

function Outcome({ entry }: { entry: LedgerEntry }) {
  return (
    <span
      className={`badge ${entry.outcome === "reward" ? "risk-low" : "risk-high"}`}
    >
      {entry.outcome === "reward" ? (
        <CheckCircle2 size={13} />
      ) : (
        <TrendingDown size={13} />
      )}
      {entry.delta > 0 ? "+" : "-"}
      {eth(Math.abs(entry.delta))} ETH
    </span>
  );
}
export function LedgerScreen() {
  const { data, ready, error } = useStore();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [copyError, setCopyError] = useState("");
  const notify = useNotify();
  const entries = data.ledger.filter(
    (entry) =>
      (filter === "all" || entry.outcome === filter) &&
      [entry.target, entry.hash, entry.caseId, entry.validator].some((value) =>
        value.toLowerCase().includes(query.trim().toLowerCase()),
      ),
  );
  async function copy(hash: string) {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(hash);
      notify("Hash transaksi simulasi disalin.");
    } catch {
      setCopyError("Clipboard tidak tersedia. Salin hash dari detail kasus.");
    }
  }
  if (!ready) return <PageSkeleton />;
  return (
    <div className="page-container">
      <div className="page-heading">
        <span className="page-kicker">
          <Blocks size={17} /> JEJAK VALIDASI
        </span>
        <h1>Setiap penilaian, tercatat.</h1>
        <p>
          Telusuri vote, reward, dan slashing komunitas dalam satu public
          ledger.
        </p>
      </div>
      <div className="ledger-info">
        <span className="badge simulation">Ledger simulasi</span>
        <p>
          {data.ledger.length} transaksi tersimpan di browser ini. Belum
          terhubung ke blockchain atau penjelajah transaksi.
        </p>
      </div>
      {(error || copyError) && <ErrorState message={error || copyError} />}
      <section className="panel ledger-panel">
        <div className="ledger-controls">
          <div className="ledger-search">
            <label htmlFor="ledger-search">Cari transaksi</label>
            <div className="search-field">
              <Search size={17} />
              <Input
                id="ledger-search"
                placeholder="Cari target, ID kasus, atau hash..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="ledger-filter">
            <label htmlFor="ledger-status">Hasil simulasi</label>
            <select
              id="ledger-status"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="all">Semua hasil</option>
              <option value="reward">Reward</option>
              <option value="slashed">Slashed</option>
            </select>
          </div>
        </div>
        {entries.length ? (
          <>
            <div className="ledger-table-wrap">
              <table>
                <caption className="sr-only">
                  Riwayat vote dan transaksi simulasi ShieldChain
                </caption>
                <thead>
                  <tr>
                    <th>Target / Kasus</th>
                    <th>Penilaian</th>
                    <th>Validator / Transaksi</th>
                    <th>Reward / Slashing</th>
                    <th>Waktu</th>
                    <th>
                      <span className="sr-only">Detail</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <strong className="ledger-target" title={entry.target}>
                          {short(entry.target, 14)}
                        </strong>
                        <span className="mono">{short(entry.caseId, 4)}</span>
                      </td>
                      <td>{voteLabels[entry.vote]}</td>
                      <td>
                        <span className="mono">
                          {short(entry.validator, 4)}
                        </span>
                        <button
                          className="copy-hash"
                          onClick={() => copy(entry.hash)}
                          aria-label={`Salin hash kasus ${entry.caseId}`}
                        >
                          <code>{short(entry.hash, 5)}</code>
                          <Copy size={12} />
                        </button>
                      </td>
                      <td>
                        <Outcome entry={entry} />
                        <span className="outcome-label">
                          {entry.outcome === "reward"
                            ? "Valid / Reward"
                            : "Salah / Slashed"}{" "}
                          (simulasi)
                        </span>
                      </td>
                      <td>
                        <time dateTime={entry.createdAt}>
                          {dateTime(entry.createdAt)}
                        </time>
                      </td>
                      <td>
                        <Link
                          aria-label={`Detail kasus ${entry.target}`}
                          href={`/validator/cases/${entry.caseId}`}
                          className="icon-link"
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ledger-mobile">
              {entries.map((entry) => (
                <article key={entry.id}>
                  <div className="section-title">
                    <strong>{entry.target}</strong>
                    <Outcome entry={entry} />
                  </div>
                  <p>{voteLabels[entry.vote]}</p>
                  <div className="metadata-row">
                    <span className="mono">
                      Validator {short(entry.validator, 4)}
                    </span>
                    <time>{dateTime(entry.createdAt)}</time>
                  </div>
                  <div className="section-title">
                    <button
                      className="copy-hash"
                      onClick={() => copy(entry.hash)}
                      aria-label={`Salin hash kasus ${entry.caseId}`}
                    >
                      <code>{short(entry.hash, 6)}</code>
                      <Copy size={13} />
                    </button>
                    <Link
                      className="text-link"
                      href={`/validator/cases/${entry.caseId}`}
                    >
                      Detail
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title={
              data.ledger.length
                ? "Tidak ada transaksi yang cocok"
                : "Jejak pertama dimulai darimu"
            }
            description={
              data.ledger.length
                ? "Coba kata pencarian atau filter lain."
                : "Setelah validator memberikan vote, catatan transaksi simulasi akan muncul di sini."
            }
          >
            {data.ledger.length ? (
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
              >
                Hapus Filter
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/validator">
                  Jadi Validator
                  <ArrowUpRight size={15} />
                </Link>
              </Button>
            )}
          </EmptyState>
        )}
      </section>
    </div>
  );
}
