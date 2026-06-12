import { api, getApiHeaders } from "@/core/api";
import type { SubscriptionData } from "../types";
import type { CheckoutResponse } from "./types";

const base = "/api/billing";

export const billingService = {
	async checkout(data: { plan?: string }): Promise<CheckoutResponse> {
		return api.request<CheckoutResponse>({
			url: `${base}/checkout`,
			method: "POST",
			body: data,
			headers: getApiHeaders(),
		});
	},

	async getSubscription(): Promise<SubscriptionData | null> {
		return api.request<SubscriptionData | null>({
			url: base,
			method: "GET",
			headers: getApiHeaders(),
		});
	},

	async cancel(): Promise<void> {
		return api.request({
			url: `${base}/cancel`,
			method: "POST",
			headers: getApiHeaders(),
		});
	},

	async resume(): Promise<void> {
		return api.request({
			url: `${base}/resume`,
			method: "POST",
			headers: getApiHeaders(),
		});
	},
};
