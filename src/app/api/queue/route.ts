import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scanResults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = await db.select().from(scanResults).where(eq(scanResults.status, "pending"));
  return NextResponse.json(rows);
}
