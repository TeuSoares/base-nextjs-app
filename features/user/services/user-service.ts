import { api, getApiHeaders } from "@/core/api";
import type { UserResponse } from "@/features/user/types";
import type {
	UserInfoOutput,
	UserPasswordOutput,
} from "../schemas/update-user-schema";

const base = "/api";

export const userService = {
	async updateUser(data: UserInfoOutput): Promise<UserResponse> {
		return api.request<UserResponse>({
			url: `${base}/user`,
			method: "PATCH",
			body: data,
			headers: getApiHeaders(),
		});
	},

	async updatePassword(data: UserPasswordOutput): Promise<void> {
		return api.request({
			url: `${base}/user`,
			method: "PATCH",
			body: data,
			headers: getApiHeaders(),
		});
	},

	async me(options?: {
		headers?: Record<string, string>;
	}): Promise<UserResponse> {
		return api.request<UserResponse>({
			url: `${base}/me`,
			method: "GET",
			headers: options?.headers,
		});
	},
};
