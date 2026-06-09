import { api, getApiHeaders } from "@/core/api";
import type { ApiResponse } from "../../../core/api/http-client.types";
import type { UserResponse } from "../../user/types";
import type { ForgotPasswordOutput } from "../schemas/forgot-password-schema";
import type { LoginOutput } from "../schemas/login-schema";
import type { RegisterOutput } from "../schemas/register-schema";
import type { ResetPasswordOutput } from "../schemas/reset-password-schema";

const base = "/api/auth";

export const authService = {
	async getCsrf() {
		return api.request({
			url: "/sanctum/csrf-cookie",
			method: "GET",
		});
	},

	async register(data: RegisterOutput): Promise<UserResponse> {
		return api.request<UserResponse>({
			url: `${base}/register`,
			method: "POST",
			body: data,
			headers: getApiHeaders(),
		});
	},

	async login(
		credentials: Pick<LoginOutput, "email" | "password">,
	): Promise<UserResponse> {
		return api.request<UserResponse>({
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

	async forgotPassword(data: ForgotPasswordOutput): Promise<ApiResponse> {
		return api.request<ApiResponse>({
			url: `${base}/forgot-password`,
			method: "POST",
			body: data,
			headers: getApiHeaders(),
		});
	},

	async resetPassword(data: ResetPasswordOutput): Promise<ApiResponse> {
		return api.request<ApiResponse>({
			url: `${base}/reset-password`,
			method: "POST",
			body: data,
			headers: getApiHeaders(),
		});
	},
};
