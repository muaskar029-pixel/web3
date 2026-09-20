import type { Metadata } from "next";
import { TrackingScreen } from "@/features/tracking/tracking-screen";
export const metadata: Metadata = { title: "Laporan Risiko" };
export default async function TrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ case?: string }>;
}) {
  const query = await searchParams;
  return <TrackingScreen caseId={query.case} />;
}
