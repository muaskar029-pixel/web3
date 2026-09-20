import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/feedback";
export default function NotFound() {
  return (
    <div className="page-container">
      <EmptyState
        title="Halaman tidak ditemukan"
        description="Alamat ini tidak tersedia. Kembali ke beranda untuk memulai pemeriksaan."
      >
        <Button asChild>
          <Link href="/">Kembali ke beranda</Link>
        </Button>
      </EmptyState>
    </div>
  );
}
