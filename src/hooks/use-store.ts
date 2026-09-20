"use client";

import { useMemo, useSyncExternalStore } from "react";
import { storage, viewSnapshot } from "@/lib/storage";

export function useStore() {
  const raw = useSyncExternalStore(
    storage.subscribe,
    storage.snapshot,
    storage.serverSnapshot,
  );
  return useMemo(() => viewSnapshot(raw), [raw]);
}
