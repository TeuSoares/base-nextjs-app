export const PLANS = ["monthly", "yearly", "lifetime"] as const;
export type Plans = (typeof PLANS)[number]; // "monthly" | "yearly" | "lifetime"
