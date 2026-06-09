export interface SubscriptionData {
	plan: string;
	status: string;
	ends_at: string | null;
	trial_ends: string | null;
	on_trial: boolean;
	cancelled: boolean;
	active: boolean;
}
