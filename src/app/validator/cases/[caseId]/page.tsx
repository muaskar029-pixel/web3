import type { Metadata } from "next";
import { CaseScreen } from "@/features/validator/case-screen";
export const metadata: Metadata = { title: "Telaah Kasus" };
export default async function ValidatorCasePage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  return <CaseScreen caseId={caseId} />;
}
