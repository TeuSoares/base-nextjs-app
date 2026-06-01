import { api, getApiHeaders } from "@/core/api";
import type { AuthResponse } from "@/features/auth/types";
import type {
	ProfileInfoOutput,
	ProfilePasswordOutput,
} from "../schemas/profile-schema";

const base = "/api/user";

export const profileService = {
	async updateProfile(data: ProfileInfoOutput): Promise<AuthResponse> {
		return api.request<AuthResponse>({
			url: base,
			method: "PATCH",
			body: data,
			headers: getApiHeaders(),
		});
	},

	async updatePassword(data: ProfilePasswordOutput): Promise<void> {
		return api.request({
			url: base,
			method: "PATCH",
			body: data,
			headers: getApiHeaders(),
		});
	},
};
