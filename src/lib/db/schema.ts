import { pgTable, uuid, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const scanResults = pgTable("scan_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  target: text("target").notNull(),
  targetType: varchar("target_type", { length: 32 }).notNull(), // "url" | "wallet" | "contract" | "group"
  technicalRisk: jsonb("technical_risk").notNull(),   // { score, level, evidence[] }
  socialRisk: jsonb("social_risk").notNull(),
  shariaRisk: jsonb("sharia_risk").notNull(),          // + disclaimer
  status: varchar("status", { length: 16 }).notNull().default("pending"), // "pending" | "on-chain" | "resolved"
  txHash: text("tx_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
