import type { ApiResponse } from "@/core/api/http-client.types";

export interface User {
	id: number;
	name: string;
	email: string;
	country_code: string;
	language: string;
	avatarUrl?: string;
	has_active_subscription: boolean;
	subscription_status: string | null;
	subscription_ends_at: string | null;
}

export type UserResponse = ApiResponse<User>;
