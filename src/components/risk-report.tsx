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
  type Assessment,
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
      <p>{dimension.summary}</p>
      <span className="risk-quality">
        Sumber: heuristik demo · Kualitas data terbatas
      </span>
    </article>
  );
}
export function RiskScores({ assessment }: { assessment: Assessment }) {
  return (
    <div className="risk-scores">
      {dimensionInfo.map(({ key, title, icon }) => (
        <RiskScoreCard
          key={key}
          dimension={assessment[key]}
          title={title}
          icon={icon}
        />
      ))}
    </div>
  );
}

export function EvidenceList({ assessment }: { assessment: Assessment }) {
  return (
    <div className="evidence-list">
      {dimensionInfo.map(({ key, title, icon: Icon }, index) => (
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
            {assessment[key].evidence.map((evidence) => (
              <div key={evidence.title}>
                <div className="evidence-title">
                  <strong>{evidence.title}</strong>
                  <span className="badge neutral">Heuristik demo</span>
                </div>
                <p>{evidence.detail}</p>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

export function PublicTracker({ item }: { item: RiskCase }) {
  return (
    <section className="panel public-tracker">
      <div className="section-title">
        <h2>Public Tracker</h2>
        <span className="badge simulation">Simulasi</span>
      </div>
      <div
        className={`tracker-message ${item.vote === "Phishing" ? "risk-high" : item.vote ? "risk-low" : ""}`}
      >
        <ShieldCheck size={25} />
        <div>
          <strong>
            {item.vote
              ? `Hasil voting komunitas: ${voteLabels[item.vote]}`
              : "Sedang dalam antrean validasi komunitas"}
          </strong>
          <p>
            {item.vote
              ? "Satu vote pada skenario demo. Belum merupakan konsensus blockchain nyata."
              : "Hasil analisis tersedia. Belum ada konsensus komunitas."}
          </p>
        </div>
      </div>
      <StatusTimeline item={item} />
    </section>
  );
}
export function StatusTimeline({ item }: { item: RiskCase }) {
  return (
    <ol className="status-timeline">
      {item.timeline
        .filter((entry) => entry.status !== "voting")
        .map((entry, index) => (
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
