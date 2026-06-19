import type { ApiResponse } from "@/core/api/http-client.types";
import type { SubscriptionData } from "../types";

export interface CheckoutResponse {
	data: {
		url: string;
	};
}

export type SubscriptionResponse = ApiResponse<SubscriptionData>;
