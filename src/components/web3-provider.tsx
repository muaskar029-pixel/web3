"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || "mock"}
          config={{
            loginMethods: ["wallet"],
            appearance: { theme: "dark" },
          }}
        >
          {children}
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
