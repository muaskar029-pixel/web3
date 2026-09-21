import { z } from "zod";
import type { RiskCase, RiskDimension, RiskLevel } from "./domain";

export function identifyTarget(value: string): RiskCase["targetType"] {
  if (/^0x[a-fA-F0-9]{40}$/.test(value)) return "wallet";
  if (/^0x/i.test(value))
    throw new Error(
      "Alamat EVM harus terdiri dari 0x dan 40 karakter heksadesimal.",
    );
  if (/[<>\u0000-\u001f\u007f]/.test(value))
    throw new Error("Input mengandung karakter yang tidak didukung.");
  if (/\s/.test(value)) {
    if (!/^(grup|group|telegram|whatsapp|wa)\s+\S.{1,}$/i.test(value))
      throw new Error(
        "Untuk nama grup, gunakan awalan 'Grup', misalnya Grup Belajar Investasi.",
      );
    return "group";
  }
  if (/^@\w{5,}$/.test(value)) return "group";
  if (/^[a-z][a-z\d+.-]*:/i.test(value) && !/^https?:\/\//i.test(value))
    throw new Error("Gunakan tautan http atau https.");
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    throw new Error(
      "Masukkan domain, tautan, nama grup, atau alamat EVM yang valid.",
    );
  }
  if (
    url.username ||
    url.password ||
    !url.hostname.includes(".") ||
    !/^(?=.{1,253}$)(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z\d-]{2,63}$/i.test(
      url.hostname,
    )
  )
    throw new Error("Format domain tidak valid atau mengandung kredensial.");
  if (["t.me", "telegram.me", "chat.whatsapp.com"].includes(url.hostname))
    return "group";
  return /^https?:\/\//i.test(value) ? "url" : "domain";
}

export const targetSchema = z
  .string()
  .trim()
  .min(1, "Tautan atau grup tidak boleh kosong.")
  .max(2048, "Input terlalu panjang (maksimal 2.048 karakter).")
  .superRefine((value, ctx) => {
    if (!value) return;
    try {
      identifyTarget(value);
    } catch (error) {
      ctx.addIssue({ code: "custom", message: (error as Error).message });
    }
  });
export const scanSchema = z.object({ target: targetSchema });
export const reportSchema = z
  .string()
  .trim()
  .min(20, "Jelaskan bukti minimal 20 karakter.")
  .max(2000, "Bukti maksimal 2.000 karakter.");
export const riskLevel = (score: number): RiskLevel =>
  score < 30 ? "low" : score < 70 ? "medium" : "high";

// ponytail: keyword-only demo, replace this service with verified signals before real risk use.
export function assessRisk(target: string): Pick<RiskCase, "technicalRisk" | "socialRisk" | "shariaRisk"> {
  const input = target.toLowerCase();
  const institutional = ["gov", "edu", "komdigi", "ui.ac.id"].find((word) =>
    input.includes(word),
  );
  const suspicious = ["airdrop", "claim", "login", "free", "nekopoi"].find(
    (word) => input.includes(word),
  );
  const scores = institutional
    ? [5, 4, 2]
    : suspicious
      ? [92, 88, 95]
      : [45, 50, 40];
  const hint = institutional
    ? `Kata '${institutional}' ditemukan. Kecocokan kata tidak memverifikasi identitas atau keamanan domain.`
    : suspicious
      ? `Kata '${suspicious}' ditemukan. Pola ini digunakan dalam skenario phishing demo, tetapi bukan bukti penipuan.`
      : "Target tidak cocok dengan daftar kata pada demo. Data tambahan diperlukan untuk penilaian yang bermakna.";
  function dimension(
    score: number,
    summary: string,
    title: string,
    detail: string,
  ): RiskDimension {
    return {
      score,
      level: riskLevel(score),
      summary,
      confidence: 20,
      evidence: [
        { title, detail, severity: riskLevel(score), source: "heuristic" },
      ],
    };
  }
  return {
    technicalRisk: dimension(
      scores[0],
      institutional
        ? "Sedikit pemicu pada skenario demo."
        : suspicious
          ? "Pola target perlu diperiksa lebih lanjut."
          : "Belum cukup data untuk menilai kontrak.",
      "Pemeriksaan pola target",
      `${hint} Kode kontrak, ownership, dan likuiditas belum diperiksa.`,
    ),
    socialRisk: dimension(
      scores[1],
      institutional
        ? "Identitas sumber masih perlu diverifikasi."
        : suspicious
          ? "Ada pola ajakan yang perlu diwaspadai."
          : "Periksa identitas pengelola dan sumber tautan.",
      "Indikator rekayasa sosial",
      `${hint} Pesan pribadi dan isi grup tidak diakses oleh demo.`,
    ),
    shariaRisk: dimension(
      scores[2],
      institutional
        ? "Indikator demo rendah; akad belum ditelaah."
        : suspicious
          ? "Transparansi dan pola keuntungan perlu ditelaah."
          : "Informasi akad dan tokenomics belum tersedia.",
      "Transparansi informasi",
      "Nilai ini mengikuti skenario demo, bukan kajian akad. Perlu data tentang gharar (ketidakjelasan) dan maysir (spekulasi menyerupai judi).",
    ),
  };
}

export function createCase(
  input: string,
  now = new Date().toISOString(),
): RiskCase {
  const target = targetSchema.parse(input);
  return {
    id: crypto.randomUUID(),
    target,
    targetType: identifyTarget(target),
    status: "pending",
    createdAt: now,
    updatedAt: now,
    technicalRisk: { score: 0, level: "low", evidence: [] },
    socialRisk: { score: 0, level: "low", evidence: [] },
    shariaRisk: { score: 0, level: "low", evidence: [], disclaimer: "" },
    txHash: null,
  };
}
