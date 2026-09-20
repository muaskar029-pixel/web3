import type { Metadata } from "next";
import { ValidatorScreen } from "@/features/validator/validator-screen";
export const metadata: Metadata = { title: "Validator Komunitas" };
export default function ValidatorPage() {
  return <ValidatorScreen />;
}
