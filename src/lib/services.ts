import { z } from "zod";
import {
  type AppState,
  type Vote,
  voteSchema,
} from "./domain";
import { assessRisk, createCase, reportSchema } from "./risk";
import { storage } from "./storage";

export const MIN_STAKE = 100; // All simulated ETH amounts are integer milliETH.
export const MOCK_ADDRESS = "0x4B28c6d96F2c802A3F9A52FaE03bC93450129a2F";
const pause = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function stakeUnits(value: string): number {
  const normalized = value.trim().replace(",", ".");
  if (!/^\d+(\.\d{1,3})?$/.test(normalized))
    throw new Error(
      "Masukkan nominal positif dengan maksimal 3 angka desimal.",
    );
  const amount = Math.round(Number(normalized) * 1000);
  if (!Number.isSafeInteger(amount)) throw new Error("Nominal tidak valid.");
  if (amount < MIN_STAKE) throw new Error("Minimal staking adalah 0.1 ETH.");
  return amount;
}
export const stakeSchema = z.object({
  amount: z.string().superRefine((value, ctx) => {
    try {
      stakeUnits(value);
    } catch (error) {
      ctx.addIssue({ code: "custom", message: (error as Error).message });
    }
  }),
});

export function applyStake(state: AppState, amount: number): AppState {
  if (!state.wallet.connected)
    throw new Error("Hubungkan wallet simulasi terlebih dahulu.");
  if (!Number.isSafeInteger(amount) || amount < MIN_STAKE)
    throw new Error("Minimal staking adalah 0.1 ETH.");
  if (amount > state.wallet.balance)
    throw new Error("Saldo dompet tidak mencukupi.");
  return {
    ...state,
    wallet: {
      ...state.wallet,
      balance: state.wallet.balance - amount,
      staked: state.wallet.staked + amount,
    },
  };
}

function transition(state: AppState, id: string, status: any): AppState {
  const now = new Date().toISOString();
  return {
    ...state,
    cases: state.cases.map((item) =>
      item.id !== id || item.status === status
        ? item
        : {
            ...item,
            status,
            updatedAt: now,
            timeline: [...item.timeline, { status, at: now }],
          },
    ),
  };
}

export function applyVote(
  state: AppState,
  caseId: string,
  choice: Vote,
  hash: string,
  now = new Date().toISOString(),
): AppState {
  voteSchema.parse(choice);
  if (
    !state.wallet.connected ||
    !state.wallet.address ||
    state.wallet.staked < MIN_STAKE
  )
    throw new Error(
      "Anda harus melakukan staking minimal 0.1 ETH terlebih dahulu.",
    );
  const item = state.cases.find((entry) => entry.id === caseId);
  if (
    !item ||
    item.status !== "awaiting_validation" ||
    !item.assessment ||
    item.vote ||
    state.ledger.some((entry) => entry.caseId === caseId)
  )
    throw new Error(
      "Kasus tidak tersedia untuk voting atau sudah diselesaikan.",
    );
  const reward = choice === "Phishing";
  const delta = reward ? 50 : -100;
  return {
    ...state,
    wallet: {
      ...state.wallet,
      balance: state.wallet.balance + (reward ? 50 : 0),
      staked: state.wallet.staked - (reward ? 0 : 100),
      rewards: state.wallet.rewards + (reward ? 50 : 0),
      slashed: state.wallet.slashed + (reward ? 0 : 100),
    },
    cases: state.cases.map((entry) =>
      entry.id === caseId
        ? {
            ...entry,
            status: "consensus_reached",
            communityStatus: "completed",
            vote: choice,
            updatedAt: now,
            timeline: [
              ...entry.timeline,
              { status: "voting", at: now },
              { status: "consensus_reached", at: now },
            ],
          }
        : entry,
    ),
    ledger: [
      {
        id: crypto.randomUUID(),
        caseId,
        target: item.target,
        validator: state.wallet.address,
        vote: choice,
        hash,
        delta,
        createdAt: now,
        outcome: reward ? "reward" : "slashed",
      },
      ...state.ledger,
    ],
    pendingCaseId: state.pendingCaseId === caseId ? null : state.pendingCaseId,
    lastVoteCaseId: caseId,
  };
}


export interface WalletAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
export const walletAdapter: WalletAdapter = {
  async connect() {
    await pause(250);
    await storage.update((state) => ({
      ...state,
      wallet: {
        ...state.wallet,
        connected: true,
        address: state.wallet.address ?? MOCK_ADDRESS,
        balance: state.wallet.address ? state.wallet.balance : 10000,
      },
    }));
  },
  async disconnect() {
    await storage.update((state) => ({
      ...state,
      wallet: { ...state.wallet, connected: false },
    }));
  },
};

export interface BlockchainService {
  stake(amount: string): Promise<void>;
  vote(caseId: string, choice: Vote): Promise<string>;
}
export const blockchainService: BlockchainService = {
  async stake(value) {
    const amount = stakeUnits(value);
    await pause(500);
    await storage.update((state) => applyStake(state, amount));
  },
  async vote(id, choice) {
    await pause(650);
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const hash = `0x${Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("")}`;
    await storage.update((state) => applyVote(state, id, choice, hash));
    return hash;
  },
};
