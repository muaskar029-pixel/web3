"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const NoticeContext = createContext<(message: string) => void>(() => {});
export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notice, setNotice] = useState("");
  const notify = useCallback((message: string) => setNotice(message), []);
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(""), 6000);
    return () => clearTimeout(timeout);
  }, [notice]);
  return (
    <NoticeContext.Provider value={notify}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {notice && (
          <div className="toast">
            <CheckCircle2 size={20} />
            <span>{notice}</span>
            <button aria-label="Tutup notifikasi" onClick={() => setNotice("")}>
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </NoticeContext.Provider>
  );
}
export const useNotify = () => useContext(NoticeContext);

export function ErrorState({ message }: { message: string }) {
  return (
    <div role="alert" className="notice error">
      <AlertCircle size={18} />
      <span>{message}</span>
    </div>
  );
}
export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("notice disclaimer", compact && "compact")}>
      <Info size={17} />
      <p>
        ShieldChain menyajikan indikator risiko, bukan jaminan keamanan, tuduhan
        hukum, fatwa, atau nasihat investasi.
      </p>
    </div>
  );
}
export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Info size={28} />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}
export function PageSkeleton() {
  return (
    <div
      className="page-container"
      aria-label="Memuat data lokal"
      aria-busy="true"
    >
      <Skeleton className="h-4 w-40 mb-5" />
      <Skeleton className="h-10 w-3/5 mb-8" />
      <div className="grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <Skeleton key={key} className="h-48" />
        ))}
      </div>
      <Skeleton className="h-60 mt-6" />
    </div>
  );
}
