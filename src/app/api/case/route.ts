import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scanResults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const [caseItem] = await db.select().from(scanResults).where(eq(scanResults.id, id));
  if (!caseItem) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(caseItem);
}
