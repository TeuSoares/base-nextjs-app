import type { ApiResponse } from "@/core/api/http-client.types";

export interface User {
	id: number;
	name: string;
	email: string;
	country_code: string;
	language: string;
	avatarUrl?: string;
}

export type AuthResponse = ApiResponse<User>;
