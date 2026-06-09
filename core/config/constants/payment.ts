export const PLANS = ["monthly", "yearly", "lifetime"] as const;
export type Plan = (typeof PLANS)[number]; // "monthly" | "yearly" | "lifetime"
