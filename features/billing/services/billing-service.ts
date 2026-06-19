import { api, getApiHeaders } from "@/core/api";
import type { CheckoutResponse, SubscriptionResponse } from "./types";

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

	async getSubscription(): Promise<SubscriptionResponse | null> {
		return api.request<SubscriptionResponse | null>({
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

	async swap(data: { plan: string }): Promise<SubscriptionResponse> {
		return api.request<SubscriptionResponse>({
			url: `${base}/swap`,
			method: "POST",
			body: data,
			headers: getApiHeaders(),
		});
	},
};
