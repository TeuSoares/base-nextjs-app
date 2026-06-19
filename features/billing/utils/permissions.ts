import type { SubscriptionData } from "../types";

export const getBillingPermissions = (
	subscription: SubscriptionData | undefined,
	isLifetime: boolean,
) => {
	const isCanceled = subscription?.canceled ?? false;
	const hasEndsAt = !!subscription?.ends_at;

	return {
		showComparison: !isLifetime && !isCanceled,
		showCancelButton: !isLifetime && !isCanceled,
		showResumeButton: isCanceled && hasEndsAt,
	};
};
