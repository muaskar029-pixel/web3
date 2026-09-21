import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer, Navbar } from "@/components/app-shell";
import { NotificationProvider } from "@/components/feedback";
import { THEME_BOOT_SCRIPT } from "@/lib/storage";
import "./globals.css";

const geist = localFont({
  src: "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--font-geist",
  display: "swap",
});
const mono = localFont({
  src: "../../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "ShieldChain | Kenali risiko sebelum berinvestasi",
    template: "%s | ShieldChain",
  },
  description:
    "Periksa indikator risiko tautan, wallet, dan grup investasi. Demo intelijen risiko Web3 berbahasa Indonesia dengan validasi komunitas.",
  robots: { index: false, follow: false },
};
import { Web3Provider } from "@/components/web3-provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className={`${geist.variable} ${mono.variable}`}>
        <Web3Provider>
          <NotificationProvider>
            <Navbar />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </NotificationProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
