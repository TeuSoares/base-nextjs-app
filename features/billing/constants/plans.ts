import type { Plan } from "../types";

export const BILLING_GATEWAY = {
	name: "Stripe",
} as const;

export const PLANS: Plan[] = [
	{
		id: "monthly",
		nameKey: "plans.monthly.name",
		price: 49.9,
		period: "monthly",
		descriptionKey: "plans.monthly.description",
		billingKey: "plans.monthly.billing",
		featuresKeys: [
			"features.all.all_tools",
			"features.all.email_support",
			"features.all.basic_reports",
			"features.all.refund_7_days",
			"features.monthly.flexible_cancel",
		],
	},
	{
		id: "yearly",
		nameKey: "plans.yearly.name",
		price: 39.9,
		period: "yearly",
		isPopular: true,
		descriptionKey: "plans.yearly.description",
		billingKey: "plans.yearly.billing",
		featuresKeys: [
			"features.all.all_tools",
			"features.all.email_support",
			"features.all.basic_reports",
			"features.all.refund_7_days",
			"features.yearly.advanced_reports",
			"features.yearly.priority_support",
			"features.yearly.early_access",
		],
	},
];
