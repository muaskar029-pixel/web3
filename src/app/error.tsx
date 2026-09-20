"use client";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/feedback";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-container">
      <h1>Halaman belum dapat dimuat.</h1>
      <ErrorState message="Terjadi kesalahan saat memuat halaman. Data yang tersimpan tidak dihapus." />
      <Button onClick={reset}>Coba lagi</Button>
    </div>
  );
}
