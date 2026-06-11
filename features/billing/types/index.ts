import type { Plans } from "@/core/config/constants/payment";

export interface SubscriptionData {
	plan: string;
	status: string;
	ends_at: string | null;
	trial_ends: string | null;
	on_trial: boolean;
	cancelled: boolean;
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
