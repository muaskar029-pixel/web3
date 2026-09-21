import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scanResults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: NextRequest) {
  const { caseId, status, txHash } = await req.json();
  if (!caseId || !status) {
    return NextResponse.json({ error: "caseId dan status wajib diisi", code: "MISSING_FIELDS" }, { status: 400 });
  }

  const [row] = await db.update(scanResults)
    .set({ status, txHash, updatedAt: new Date() })
    .where(eq(scanResults.id, caseId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: "Case tidak ditemukan", code: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json(row);
}
