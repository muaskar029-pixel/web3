import { initialState, stateSchema, type AppState } from "./domain";

export const STORAGE_KEY = "shieldchain_state_v1";
export const STORAGE_EVENT = "shieldchain:change";
export const PENDING_KEY = "shieldchain_pending_url";
export const VOTE_KEY = "shieldchain_vote_result";
export const THEME_BOOT_SCRIPT =
  "try{document.documentElement.dataset.theme=localStorage.getItem('shieldchain_theme')||'system'}catch{}";
const EMPTY = JSON.stringify(initialState);
export const SERVER_SNAPSHOT = "__server__";
const UNAVAILABLE = "__unavailable__";

export function decodeState(raw: string | null): AppState {
  if (raw === null) return structuredClone(initialState);
  try {
    return stateSchema.parse(JSON.parse(raw));
  } catch {
    throw new Error(
      "Data lokal tidak dapat dibaca. Data tidak ditimpa; ekspor penyimpanan browser sebelum memulihkan data.",
    );
  }
}

export const storage = {
  read(): AppState {
    try {
      return decodeState(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      if (error instanceof DOMException)
        throw new Error(
          "Penyimpanan browser tidak tersedia. Izinkan penyimpanan lokal agar demo dapat digunakan.",
        );
      throw error;
    }
  },
  write(state: AppState) {
    const valid = stateSchema.parse(state);
    // One authoritative write commits case, wallet, and ledger together. Legacy keys are mirrors only.
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
    } catch {
      throw new Error(
        "Data gagal disimpan. Periksa kapasitas dan izin penyimpanan browser, lalu coba kembali.",
      );
    }
    try {
      const pending = valid.cases.find(
        (item) => item.id === valid.pendingCaseId,
      );
      const voted = valid.cases.find(
        (item) => item.id === valid.lastVoteCaseId,
      );
      if (pending) localStorage.setItem(PENDING_KEY, pending.target);
      else localStorage.removeItem(PENDING_KEY);
      if (voted?.vote) localStorage.setItem(VOTE_KEY, voted.vote);
      else localStorage.removeItem(VOTE_KEY);
    } catch {
      /* The authoritative state is already committed; mirrors are non-authoritative. */
    }
    window.dispatchEvent(new Event(STORAGE_EVENT));
  },
  snapshot(): string {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? EMPTY;
    } catch {
      return UNAVAILABLE;
    }
  },
  serverSnapshot: () => SERVER_SNAPSHOT,
  subscribe(callback: () => void) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) callback();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(STORAGE_EVENT, callback);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STORAGE_EVENT, callback);
    };
  },
  async update(transform: (state: AppState) => AppState): Promise<void> {
    if (!navigator.locks)
      throw new Error(
        "Browser ini belum mendukung penyimpanan antartab yang aman. Gunakan Chrome, Firefox, atau Safari terbaru melalui localhost/HTTPS.",
      );
    // ponytail: one browser-wide lock; move concurrency control to the backend for multi-user use.
    await navigator.locks.request("shieldchain-state", () =>
      storage.write(transform(storage.read())),
    );
  },
};

export function viewSnapshot(raw: string) {
  if (raw === SERVER_SNAPSHOT)
    return { data: initialState, ready: false, error: "" };
  if (raw === UNAVAILABLE)
    return {
      data: initialState,
      ready: true,
      error:
        "Penyimpanan browser tidak tersedia. Izinkan penyimpanan lokal untuk menjalankan demo.",
    };
  try {
    return { data: decodeState(raw), ready: true, error: "" };
  } catch (error) {
    return { data: initialState, ready: true, error: (error as Error).message };
  }
}

export const preferences = {
  readTheme() {
    try {
      return localStorage.getItem("shieldchain_theme") ?? "system";
    } catch {
      return "system";
    }
  },
  setTheme(theme: "light" | "dark" | "system") {
    try {
      localStorage.setItem("shieldchain_theme", theme);
    } catch {
      /* Theme remains usable for the current session. */
    }
    document.documentElement.dataset.theme = theme;
    window.dispatchEvent(new Event(STORAGE_EVENT));
  },
};
