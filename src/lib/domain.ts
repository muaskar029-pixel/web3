import { z } from "zod";

export const caseStatuses = [
  "submitted",
  "analyzing",
  "awaiting_validation",
  "voting",
  "consensus_reached",
  "failed",
] as const;
export const voteSchema = z.enum(["Aman", "Phishing"]);
export type Vote = z.infer<typeof voteSchema>;
export type CaseStatus = (typeof caseStatuses)[number];
export type RiskLevel = "low" | "medium" | "high";

const evidenceSchema = z.object({
  title: z.string(),
  detail: z.string(),
  source: z.enum(["heuristic", "community"]),
  severity: z.enum(["low", "medium", "high"]),
});
const dimensionSchema = z.object({
  score: z.number().int().min(0).max(100),
  level: z.enum(["low", "medium", "high"]),
  summary: z.string(),
  evidence: z.array(evidenceSchema),
  confidence: z.number().min(0).max(100),
});
export const assessmentSchema = z.object({
  technicalRisk: dimensionSchema,
  socialRisk: dimensionSchema,
  shariaRisk: dimensionSchema,
});
export type Assessment = z.infer<typeof assessmentSchema>;
export type RiskDimension = z.infer<typeof dimensionSchema>;
export type RiskEvidence = z.infer<typeof evidenceSchema>;

export const caseSchema = z.object({
  id: z.string(),
  target: z.string(),
  targetType: z.enum(["url", "domain", "wallet", "contract", "group"]),
  status: z.enum(caseStatuses),
  communityStatus: z.enum(["queued", "voting", "completed"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  assessment: assessmentSchema.nullable(),
  vote: voteSchema.nullable(),
  timeline: z.array(z.object({ status: z.enum(caseStatuses), at: z.string() })),
  reports: z.array(
    z.object({ id: z.string(), text: z.string(), createdAt: z.string() }),
  ),
});
export type RiskCase = z.infer<typeof caseSchema>;

export const ledgerEntrySchema = z.object({
  id: z.string(),
  caseId: z.string(),
  target: z.string(),
  validator: z.string(),
  vote: voteSchema,
  hash: z.string(),
  delta: z.number().int(),
  createdAt: z.string(),
  outcome: z.enum(["reward", "slashed"]),
});
export type LedgerEntry = z.infer<typeof ledgerEntrySchema>;

const units = z.number().int().nonnegative();
export const stateSchema = z.object({
  version: z.literal(1),
  cases: z.array(caseSchema),
  ledger: z.array(ledgerEntrySchema),
  wallet: z.object({
    connected: z.boolean(),
    address: z.string().nullable(),
    balance: units,
    staked: units,
    rewards: units,
    slashed: units,
  }),
  pendingCaseId: z.string().nullable(),
  lastVoteCaseId: z.string().nullable(),
});
export type AppState = z.infer<typeof stateSchema>;
export const initialState: AppState = {
  version: 1,
  cases: [],
  ledger: [],
  wallet: {
    connected: false,
    address: null,
    balance: 0,
    staked: 0,
    rewards: 0,
    slashed: 0,
  },
  pendingCaseId: null,
  lastVoteCaseId: null,
};

export const statusLabels: Record<CaseStatus, string> = {
  submitted: "Target diterima",
  analyzing: "Analisis berlangsung",
  awaiting_validation: "Menunggu validasi",
  voting: "Voting berlangsung",
  consensus_reached: "Voting selesai",
  failed: "Analisis gagal",
};
export const voteLabels: Record<Vote, string> = {
  Aman: "Tidak ditemukan indikasi utama",
  Phishing: "Terindikasi phishing",
};
export const riskLabels: Record<RiskLevel, string> = {
  low: "Risiko rendah",
  medium: "Risiko menengah",
  high: "Risiko tinggi",
};
export const typeLabels: Record<RiskCase["targetType"], string> = {
  url: "Tautan situs",
  domain: "Domain",
  wallet: "Alamat EVM",
  contract: "Smart contract",
  group: "Grup investasi",
};
export const short = (value: string, length = 8) =>
  value.length > length * 2 + 3
    ? `${value.slice(0, length)}...${value.slice(-length)}`
    : value;
export const eth = (value: number) =>
  (value / 1000).toLocaleString("en-US", {
    maximumFractionDigits: 3,
    minimumFractionDigits: 2,
  });
export const dateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
export const messageOf = (error: unknown) =>
  error instanceof Error
    ? error.message
    : "Terjadi kesalahan. Silakan coba kembali.";
