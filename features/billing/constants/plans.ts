import type { Plan } from "../types";

export const BILLING_GATEWAY = {
	name: "Stripe",
} as const;

export const PLANS: Plan[] = [
	{
		id: "monthly-plan",
		nameKey: "monthly.name",
		price: 49.9,
		period: "monthly",
		descriptionKey: "monthly.description",
		featuresKeys: [
			"all.all_tools",
			"all.email_support",
			"all.basic_reports",
			"all.refund_7_days",
		],
	},
	{
		id: "yearly-plan",
		nameKey: "yearly.name",
		price: 39.9,
		period: "yearly",
		isPopular: true,
		descriptionKey: "yearly.description",
		featuresKeys: [
			"all.all_tools",
			"all.priority_support",
			"all.advanced_reports",
			"all.early_access",
		],
	},
];
