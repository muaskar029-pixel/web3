import { beforeEach, describe, expect, it } from "vitest";
import { initialState, type AppState } from "../lib/domain";
import {
  assessRisk,
  createCase,
  identifyTarget,
  riskLevel,
  targetSchema,
} from "../lib/risk";
import {
  applyStake,
  applyVote,
  blockchainService,
  riskService,
  stakeUnits,
  walletAdapter,
} from "../lib/services";
import {
  decodeState,
  PENDING_KEY,
  storage,
  STORAGE_KEY,
  VOTE_KEY,
} from "../lib/storage";

beforeEach(() => {
  localStorage.clear();
  let queue = Promise.resolve();
  Object.defineProperty(navigator, "locks", {
    configurable: true,
    value: {
      request: (_name: string, callback: () => void) => {
        const next = queue.then(callback);
        queue = next.catch(() => {});
        return next;
      },
    },
  });
});
function connected(staked = 100): AppState {
  const item = createCase("claim.example");
  item.assessment = assessRisk(item.target);
  item.status = "awaiting_validation";
  return {
    ...structuredClone(initialState),
    cases: [item],
    pendingCaseId: item.id,
    wallet: {
      connected: true,
      address: "0x4B28c6d96F2c802A3F9A52FaE03bC93450129a2F",
      balance: 9900,
      staked,
      rewards: 0,
      slashed: 0,
    },
  };
}

describe("target and risk assessment", () => {
  it.each([
    "",
    "   ",
    "javascript:alert(1)",
    "data:text/html,hi",
    "https://user:pass@example.com",
    "<script>x</script>",
    "0x1234",
    "https://invalid",
    "word",
    "not a valid target",
    "https://-broken.example",
  ])("rejects invalid input %s", (input) => {
    expect(targetSchema.safeParse(input).success).toBe(false);
  });
  it.each([
    ["example.com", "domain"],
    ["https://example.com/path", "url"],
    ["https://t.me/community", "group"],
    ["Grup Belajar Investasi", "group"],
    ["0x4B28c6d96F2c802A3F9A52FaE03bC93450129a2F", "wallet"],
  ])("identifies %s", (input, type) => {
    expect(identifyTarget(input)).toBe(type);
  });
  it.each([
    ["https://ui.ac.id", [5, 4, 2]],
    ["CLAIM-airdrop.example", [92, 88, 95]],
    ["example.com", [45, 50, 40]],
  ])("returns documented scores for %s", (target, scores) => {
    const assessment = assessRisk(target);
    expect([
      assessment.technicalRisk.score,
      assessment.socialRisk.score,
      assessment.shariaRisk.score,
    ]).toEqual(scores);
    expect(assessment.technicalRisk.evidence[0].source).toBe("heuristic");
  });
  it("documents keyword precedence without claiming source verification", () => {
    const assessment = assessRisk("https://claim.example/gov");
    expect(assessment.technicalRisk.score).toBe(5);
    expect(assessment.technicalRisk.evidence[0].detail).toContain(
      "tidak memverifikasi",
    );
  });
  it("classifies exact boundaries", () => {
    expect([0, 29, 30, 69, 70, 100].map(riskLevel)).toEqual([
      "low",
      "low",
      "medium",
      "medium",
      "high",
      "high",
    ]);
  });
  it("persists input and case before returning the redirect ID", async () => {
    const id = await riskService.submit(" example.com ");
    expect(localStorage.getItem(PENDING_KEY)).toBe("example.com");
    expect(storage.read().cases[0].id).toBe(id);
    expect(storage.read().cases[0].status).toBe("submitted");
  });
  it("completes scan and retains the status history", async () => {
    const id = await riskService.submit("example.com");
    await riskService.analyze(id);
    const item = storage.read().cases[0];
    expect(item.assessment?.technicalRisk.score).toBe(45);
    expect(item.timeline.map((entry) => entry.status)).toEqual([
      "submitted",
      "analyzing",
      "awaiting_validation",
    ]);
  });
});

describe("wallet, stake, vote and ledger", () => {
  it.each(["", " ", "NaN", "Infinity", "-1", "0", "0.09", "0.1009", "1e5"])(
    "rejects stake %s",
    (amount) => {
      expect(() => stakeUnits(amount)).toThrow();
    },
  );
  it("accepts the exact minimum, comma decimals and exact balance", () => {
    expect(stakeUnits("0.1")).toBe(100);
    expect(stakeUnits("0,125")).toBe(125);
    const state = connected();
    expect(applyStake(state, state.wallet.balance).wallet.balance).toBe(0);
  });
  it("rejects excess balance and disconnected wallets", () => {
    const state = connected();
    expect(() => applyStake(state, 10000)).toThrow("Saldo");
    state.wallet.connected = false;
    expect(() => applyStake(state, 100)).toThrow("Hubungkan");
  });
  it("never refills a returning wallet", async () => {
    await walletAdapter.connect();
    await blockchainService.stake("0.1");
    await walletAdapter.disconnect();
    await walletAdapter.connect();
    expect(storage.read().wallet.balance).toBe(9900);
    expect(storage.read().wallet.staked).toBe(100);
  });
  it("blocks votes without sufficient stake", () => {
    const state = connected(0);
    expect(() =>
      applyVote(state, state.cases[0].id, "Phishing", "0x01"),
    ).toThrow("staking");
  });
  it("rejects invalid vote values at the boundary", () => {
    const state = connected();
    expect(() =>
      applyVote(state, state.cases[0].id, "other" as never, "0x01"),
    ).toThrow();
  });
  it("rewards, persists the vote, synchronizes tracker and clears pending", async () => {
    const state = connected();
    storage.write(state);
    const hash = await blockchainService.vote(state.cases[0].id, "Phishing");
    const next = storage.read();
    expect(hash).toMatch(/^0x[a-f0-9]{64}$/);
    expect(localStorage.getItem(VOTE_KEY)).toBe("Phishing");
    expect(localStorage.getItem(PENDING_KEY)).toBeNull();
    expect(next.cases[0].status).toBe("consensus_reached");
    expect(next.cases[0].vote).toBe("Phishing");
    expect(next.wallet.balance).toBe(9950);
    expect(next.ledger[0].delta).toBe(50);
    expect(decodeState(localStorage.getItem(STORAGE_KEY)).ledger).toHaveLength(
      1,
    );
  });
  it("slashes stake without allowing a negative balance or repeated vote", () => {
    const state = connected();
    const next = applyVote(state, state.cases[0].id, "Aman", "0x01");
    expect(next.wallet.staked).toBe(0);
    expect(next.wallet.slashed).toBe(100);
    expect(next.wallet.balance).toBe(9900);
    expect(next.ledger[0].delta).toBe(-100);
    expect(() => applyVote(next, state.cases[0].id, "Aman", "0x02")).toThrow();
  });
  it("keeps votes scoped to each case and preserves an unrelated pending scan", () => {
    const state = connected();
    const nextCase = createCase("example.com");
    state.cases.push(nextCase);
    state.pendingCaseId = nextCase.id;
    const next = applyVote(state, state.cases[0].id, "Phishing", "0x01");
    expect(next.pendingCaseId).toBe(nextCase.id);
    expect(next.cases[1].vote).toBeNull();
  });
  it("serializes double vote attempts", async () => {
    const state = connected();
    storage.write(state);
    const id = state.cases[0].id;
    const results = await Promise.allSettled([
      blockchainService.vote(id, "Phishing"),
      blockchainService.vote(id, "Phishing"),
    ]);
    expect(
      results.filter((result) => result.status === "fulfilled"),
    ).toHaveLength(1);
    expect(storage.read().ledger).toHaveLength(1);
    expect(storage.read().wallet.rewards).toBe(50);
  });
  it("notifies current-tab subscribers and ignores unrelated cross-tab storage", () => {
    let calls = 0;
    const unsubscribe = storage.subscribe(() => calls++);
    storage.write(initialState);
    expect(calls).toBe(1);
    window.dispatchEvent(new StorageEvent("storage", { key: "unrelated" }));
    expect(calls).toBe(1);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
    expect(calls).toBe(2);
    unsubscribe();
    storage.write(initialState);
    expect(calls).toBe(2);
  });
  it("preserves malformed stored data instead of overwriting it", async () => {
    localStorage.setItem(STORAGE_KEY, "broken data");
    await expect(walletAdapter.connect()).rejects.toThrow("tidak dapat dibaca");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("broken data");
  });
  it("does not report success after a failed primary write", async () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new DOMException("quota", "QuotaExceededError");
    };
    try {
      await expect(riskService.submit("example.com")).rejects.toThrow(
        "gagal disimpan",
      );
    } finally {
      Storage.prototype.setItem = original;
    }
    expect(storage.read().cases).toHaveLength(0);
  });
});
