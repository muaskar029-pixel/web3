"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Clipboard,
  Globe2,
  Search,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorState } from "@/components/feedback";
import { scanSchema } from "@/lib/risk";
import { riskService } from "@/lib/services";
import { messageOf } from "@/lib/domain";

const examples = [
  { label: "Website", value: "claim-airdrop.example", icon: Globe2 },
  {
    label: "Wallet",
    value: "0x4B28c6d96F2c802A3F9A52FaE03bC93450129a2F",
    icon: Wallet,
  },
  {
    label: "Grup Telegram",
    value: "https://t.me/investasi_free_demo",
    icon: Users,
  },
];
export function ScanForm() {
  const id = useId();
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ target: string }>({
    resolver: zodResolver(scanSchema),
    defaultValues: { target: "" },
  });
  async function scan(values: { target: string }) {
    setError("");
    try {
      const caseId = await riskService.submit(values.target);
      router.push(`/tracking?case=${caseId}`);
    } catch (error) {
      setError(messageOf(error));
    }
  }
  async function paste() {
    try {
      if (!navigator.clipboard) throw new Error();
      setValue("target", await navigator.clipboard.readText(), {
        shouldValidate: true,
      });
      setError("");
    } catch {
      setError(
        "Clipboard tidak dapat diakses. Tempel manual menggunakan Ctrl+V atau menu perangkat.",
      );
    }
  }
  return (
    <form onSubmit={handleSubmit(scan)} noValidate className="scan-form">
      <label htmlFor={`${id}-target`}>
        Tautan, alamat wallet, atau nama grup
      </label>
      <div className="scan-input-row">
        <div className="scan-input-wrap">
          <Search size={20} className="input-icon" />
          <Input
            id={`${id}-target`}
            {...register("target")}
            placeholder="Tempel tautan atau alamat di sini..."
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-invalid={!!errors.target}
            aria-describedby={`${id}-help ${id}-error`}
          />
          <button
            type="button"
            className="paste-button"
            onClick={paste}
            aria-label="Tempel dari clipboard"
            title="Tempel dari clipboard"
          >
            <Clipboard size={17} />
          </button>
        </div>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Scan Risiko"}
          <ArrowRight size={17} />
        </Button>
      </div>
      <p
        id={`${id}-error`}
        className="field-error"
        role={errors.target ? "alert" : undefined}
      >
        {errors.target?.message}
      </p>
      {error && <ErrorState message={error} />}
      <div className="scan-examples" id={`${id}-help`}>
        <span>Coba contoh:</span>
        {examples.map(({ label, value, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => setValue("target", value, { shouldValidate: true })}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>
    </form>
  );
}
