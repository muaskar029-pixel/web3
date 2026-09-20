"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "@/hooks/use-store";
import { eth, messageOf, short } from "@/lib/domain";
import { walletAdapter } from "@/lib/services";
import { preferences, STORAGE_EVENT } from "@/lib/storage";
import { ErrorState, useNotify } from "@/components/feedback";
import { cn } from "@/lib/utils";

const links = [
  { href: "/scan", label: "Scan Risiko" },
  { href: "/ledger", label: "Public Ledger" },
  { href: "/validator", label: "Validator" },
  { href: "/methodology", label: "Metodologi" },
];
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="ShieldChain beranda">
      <span className="brand-symbol">
        <ShieldCheck size={23} strokeWidth={1.8} />
      </span>
      <span>
        Shield<span className="brand-light">Chain</span>
      </span>
    </Link>
  );
}

export function WalletButton({ label = "Connect Wallet" }: { label?: string }) {
  const { data, ready } = useStore();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const notify = useNotify();
  async function connect() {
    setBusy(true);
    setError("");
    try {
      if (data.wallet.connected) await walletAdapter.disconnect();
      else await walletAdapter.connect();
      setOpen(false);
      notify(
        data.wallet.connected
          ? "Wallet simulasi diputus. Saldo dan stake tetap tersimpan."
          : "Wallet simulasi terhubung. Tidak ada aset nyata yang digunakan.",
      );
    } catch (error) {
      setError(messageOf(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="wallet-button">
          <Wallet size={16} />
          {ready && data.wallet.connected
            ? short(data.wallet.address!, 4)
            : label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data.wallet.connected
              ? "Wallet simulasi"
              : "Coba dengan wallet simulasi"}
          </DialogTitle>
          <DialogDescription>
            Tidak perlu ekstensi atau aset nyata. Semua saldo dan transaksi
            hanya tersimpan di browser ini.
          </DialogDescription>
        </DialogHeader>
        <div className="wallet-preview">
          <Wallet size={28} />
          <div>
            <strong>
              {data.wallet.connected
                ? short(data.wallet.address!, 6)
                : "Dompet demo ShieldChain"}
            </strong>
            <p>
              {data.wallet.address ? eth(data.wallet.balance) : "10.00"} ETH
              simulasi tersedia
            </p>
          </div>
          <span className="badge simulation">Simulasi</span>
        </div>
        <p className="muted text-sm">
          ShieldChain tidak meminta seed phrase atau private key.
        </p>
        {error && <ErrorState message={error} />}
        <Button onClick={connect} disabled={busy}>
          {busy
            ? "Memproses..."
            : data.wallet.connected
              ? "Putuskan koneksi"
              : "Hubungkan wallet demo"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function subscribeTheme(callback: () => void) {
  const query = matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener("storage", callback);
  query.addEventListener("change", callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener("storage", callback);
    query.removeEventListener("change", callback);
  };
}
function themeSnapshot() {
  const preference = preferences.readTheme();
  return preference === "system"
    ? matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : preference;
}
function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    themeSnapshot,
    () => "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = preferences.readTheme();
  }, [theme]);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        theme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap"
      }
      onClick={() => preferences.setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Lewati ke konten
      </a>
      <div className="nav-container">
        <Brand />
        <nav aria-label="Navigasi utama" className="desktop-nav">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className={cn("nav-link", pathname.startsWith(href) && "active")}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <span className="badge simulation nav-simulation">Mode simulasi</span>
          <ThemeToggle />
          <WalletButton />
          <Button
            className="mobile-menu-button"
            variant="ghost"
            size="icon"
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            aria-label={menu ? "Tutup menu" : "Buka menu"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {menu && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi seluler"
          className="mobile-nav"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenu(false)}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
            >
              {label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Brand />
        <p>
          Lebih paham risiko.
          <br />
          Lebih bijak melangkah.
        </p>
        <Link href="/methodology">
          Metodologi & keterbatasan <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ShieldChain</span>
        <span>
          Prototipe hackathon. Seluruh analisis dan transaksi adalah simulasi.
        </span>
        <span>Dirancang untuk Indonesia</span>
      </div>
    </footer>
  );
}
