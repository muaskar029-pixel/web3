import type { Metadata } from "next";
import { LedgerScreen } from "@/features/ledger/ledger-screen";
export const metadata: Metadata = { title: "Public Ledger" };
export default function LedgerPage() {
  return <LedgerScreen />;
}
