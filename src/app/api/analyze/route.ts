import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scanResults } from "@/lib/db/schema";
import { analyzeRisk } from "@/lib/ai/risk-analysis";

export async function POST(req: NextRequest) {
  const { target, targetType } = await req.json();
  if (!target) {
    return NextResponse.json({ error: "target wajib diisi", code: "MISSING_TARGET" }, { status: 400 });
  }

  try {
    const risk = await analyzeRisk(target, targetType ?? "url");

    const [row] = await db.insert(scanResults).values({
      target,
      targetType: targetType ?? "url",
      technicalRisk: risk.technicalRisk,
      socialRisk: risk.socialRisk,
      shariaRisk: risk.shariaRisk,
      status: "pending",
    }).returning();

    return NextResponse.json(row);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menganalisis target", code: "ANALYZE_FAILED" }, { status: 500 });
  }
}
