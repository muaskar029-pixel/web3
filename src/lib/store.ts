import type { RiskCase } from "./domain";

// Global in-memory store for demo
declare global {
  var __globalRiskCases: RiskCase[] | undefined;
}

if (!globalThis.__globalRiskCases) {
  globalThis.__globalRiskCases = [];
}

export const inMemoryCases = globalThis.__globalRiskCases;
