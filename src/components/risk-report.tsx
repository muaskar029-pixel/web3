import {
  AlertTriangle,
  CheckCircle2,
  Code2,
  Info,
  MessagesSquare,
  Scale,
  ShieldCheck,
} from "lucide-react";
import {
  type RiskCase,
  type RiskDimension,
  type RiskLevel,
  dateTime,
  riskLabels,
  statusLabels,
  voteLabels,
} from "@/lib/domain";

export function RiskLevelBadge({ level }: { level: RiskLevel }) {
  const Icon =
    level === "low" ? CheckCircle2 : level === "high" ? AlertTriangle : Info;
  return (
    <span className={`badge risk-${level}`}>
      <Icon size={13} />
      {riskLabels[level]}
    </span>
  );
}
export const dimensionInfo = [
  {
    key: "technicalRisk",
    title: "Risiko teknis",
    icon: Code2,
    description: "Kontrak, likuiditas, dan pola transaksi.",
  },
  {
    key: "socialRisk",
    title: "Rekayasa sosial",
    icon: MessagesSquare,
    description: "Identitas palsu dan pola ajakan investasi.",
  },
  {
    key: "shariaRisk",
    title: "Indikator syariah",
    icon: Scale,
    description: "Transparansi, ketidakjelasan, dan spekulasi.",
  },
] as const;

export function RiskScoreCard({
  dimension,
  title,
  icon: Icon,
}: {
  dimension: RiskDimension;
  title: string;
  icon: typeof Code2;
}) {
  return (
    <article className={`risk-card risk-${dimension.level}`}>
      <div className="risk-card-heading">
        <span className="icon-box">
          <Icon size={21} />
        </span>
        <h3>{title}</h3>
      </div>
      <div className="risk-score">
        <strong>{dimension.score}</strong>
        <span>/ 100</span>
        <RiskLevelBadge level={dimension.level} />
      </div>
      <p className="line-clamp-3">{dimension.evidence.join(" ")}</p>
      <span className="risk-quality">
        Sumber: heuristik demo · Kualitas data terbatas
      </span>
    </article>
  );
}
export function RiskScores({ caseItem }: { caseItem: RiskCase }) {
  return (
    <div className="risk-scores">
      {dimensionInfo.map(({ key, title, icon }) => (
        <RiskScoreCard
          key={key}
          dimension={caseItem[key as keyof Pick<RiskCase, "technicalRisk" | "socialRisk" | "shariaRisk">] as RiskDimension}
          title={title}
          icon={icon}
        />
      ))}
    </div>
  );
}

export function EvidenceList({ caseItem }: { caseItem: RiskCase }) {
  return (
    <div className="evidence-list">
      {dimensionInfo.map(({ key, title, icon: Icon }, index) => {
        const dimension = caseItem[key as keyof Pick<RiskCase, "technicalRisk" | "socialRisk" | "shariaRisk">] as RiskDimension;
        return (
          <details key={key} open={index === 0}>
            <summary>
              <span>
                <Icon size={19} />
                {title}
              </span>
              <span className="muted">
                Lihat bukti <span className="disclosure-chevron">⌄</span>
              </span>
            </summary>
            <div className="evidence-body">
              {dimension.evidence.map((evidenceText, i) => (
                <div key={i}>
                  <p>• {evidenceText}</p>
                </div>
              ))}
              {(dimension as any).disclaimer && (
                <div className="mt-2 text-sm text-yellow-500 italic">
                  Disclaimer: {(dimension as any).disclaimer}
                </div>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export function PublicTracker({ item }: { item: RiskCase }) {
  const isResolved = item.status === "resolved";
  const isOnChain = item.status === "on-chain" || isResolved;

  return (
    <section className="panel public-tracker">
      <div className="section-title">
        <h2>Public Tracker</h2>
        <span className="badge neutral">On-chain</span>
      </div>
      <div
        className={`tracker-message ${isResolved ? "risk-low" : isOnChain ? "neutral" : ""}`}
      >
        <ShieldCheck size={25} />
        <div>
          <strong>
            {statusLabels[item.status]}
          </strong>
          <p>
            {isOnChain
              ? `Transaksi tercatat on-chain. Hash: ${short(item.txHash || "")}`
              : "Hasil analisis tersedia. Belum ada konsensus komunitas."}
          </p>
        </div>
      </div>
      <StatusTimeline item={item} />
    </section>
  );
}
export function StatusTimeline({ item }: { item: RiskCase }) {
  const steps = [
    { status: "pending" as const, at: item.createdAt }
  ];
  if (item.status === "on-chain" || item.status === "resolved") {
    steps.push({ status: "on-chain" as const, at: item.updatedAt });
  }
  if (item.status === "resolved") {
    steps.push({ status: "resolved" as const, at: item.updatedAt });
  }

  return (
    <ol className="status-timeline">
      {steps.map((entry, index) => (
          <li key={`${entry.status}-${index}`}>
            <CheckCircle2 size={16} />
            <div>
              <strong>{statusLabels[entry.status]}</strong>
              <time dateTime={entry.at}>{dateTime(entry.at)}</time>
            </div>
          </li>
        ))}
    </ol>
  );
}

export function ShariaNote() {
  return (
    <p className="sharia-note">
      <Scale size={16} />
      Indikator syariah bersifat informatif, bukan fatwa atau penetapan
      halal/haram. Konsultasikan dengan ulama atau lembaga berwenang.
    </p>
  );
}
