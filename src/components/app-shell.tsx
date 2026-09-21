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

import { usePrivy } from "@privy-io/react-auth";

export function WalletButton({ label = "Connect Wallet" }: { label?: string }) {
  const { ready, authenticated, user, login, logout } = usePrivy();
  
  return (
    <Button 
      variant="outline" 
      onClick={authenticated ? logout : login}
      disabled={!ready}
    >
      <Wallet size={16} className="mr-2" />
      {authenticated && user?.wallet?.address 
        ? short(user.wallet.address, 4) 
        : label}
    </Button>
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
