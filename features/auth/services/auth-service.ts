import { api, getApiHeaders } from "@/core/api";
import type { LoginOutput } from "../schemas/login-schema";
import type { RegisterOutput } from "../schemas/register-schema";
import type { AuthResponse } from "../types";

const base = "/api/auth";

export const authService = {
	async getCsrf() {
		return api.request({
			url: "/sanctum/csrf-cookie",
			method: "GET",
		});
	},

	async register(data: RegisterOutput): Promise<AuthResponse> {
		return api.request<AuthResponse>({
			url: `${base}/register`,
			method: "POST",
			body: data,
			headers: getApiHeaders(),
		});
	},

	async login(
		credentials: Pick<LoginOutput, "email" | "password">,
	): Promise<AuthResponse> {
		return api.request<AuthResponse>({
			url: `${base}/login`,
			method: "POST",
			body: credentials,
			headers: getApiHeaders(),
		});
	},

	async logout(): Promise<void> {
		return api.request({
			url: `${base}/logout`,
			method: "POST",
			headers: getApiHeaders(),
		});
	},

	async me(): Promise<AuthResponse["data"]> {
		return api.request<AuthResponse["data"]>({
			url: `${base}/me`,
			method: "GET",
		});
	},
};
