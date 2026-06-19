import type { Plans } from "@/core/config/constants/payment";

export interface SubscriptionData {
	plan: string;
	status: string;
	period: Plans;
	ends_at: string | null;
	trial_ends: string | null;
	on_trial: boolean;
	canceled: boolean;
	active: boolean;
}

export interface Plan {
	id: string;
	nameKey: string;
	price: number;
	period: Plans;
	featuresKeys: string[];
	isPopular?: boolean;
	descriptionKey?: string;
}
