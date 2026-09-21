import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({});

const riskDimensionSchema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER },
    level: { type: Type.STRING, enum: ["low", "medium", "high"] },
    evidence: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["score", "level", "evidence"],
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    technicalRisk: riskDimensionSchema,
    socialRisk: riskDimensionSchema,
    shariaRisk: {
      ...riskDimensionSchema,
      properties: { ...riskDimensionSchema.properties, disclaimer: { type: Type.STRING } },
    },
  },
  required: ["technicalRisk", "socialRisk", "shariaRisk"],
};

export async function analyzeRisk(target: string, targetType: string) {
  const prompt = `Kamu adalah mesin analisis risiko kripto untuk pengguna Indonesia awam.
Analisis target berikut: "${target}" (tipe: ${targetType}).

Nilai 3 dimensi risiko:
1. Risiko Teknis: fungsi mint tidak terbatas, ownership belum dilepas, likuiditas tidak terkunci, konsentrasi holder, pola transaksi mencurigakan.
2. Risiko Rekayasa Sosial: impersonasi, typosquatting, situs kloningan, janji keuntungan tidak wajar, tekanan waktu.
3. Indikator Risiko Kepatuhan Syariah: gharar, maysir, tokenomics tidak transparan — WAJIB sertakan disclaimer bahwa ini bukan fatwa dan bukan penetapan halal/haram.

Jangan pernah menyatakan "100% aman" atau "pasti scam". Gunakan skor 0-100 dan level low/medium/high berbasis bukti yang masuk akal untuk jenis target ini.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      },
    });
    return JSON.parse(response.text!);
  } catch (error) {
    console.error("AI Error:", error);
    // Fallback if AI fails (e.g. rate limit)
    return {
      technicalRisk: { score: 0, level: "medium", evidence: ["Gagal memproses data dengan AI. Silakan coba lagi."] },
      socialRisk: { score: 0, level: "medium", evidence: ["Gagal memproses data dengan AI. Silakan coba lagi."] },
      shariaRisk: { score: 0, level: "medium", evidence: ["Gagal memproses data dengan AI."], disclaimer: "Bukan fatwa halal/haram." },
    };
  }
}
