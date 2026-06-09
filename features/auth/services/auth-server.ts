"use server";

import { getAuthHeaders } from "@/core/auth/auth-headers.server";
import { APP_URL } from "@/core/config/constants/env";
import { userService } from "../../user/services/user-service";
import type { UserResponse } from "../../user/types";

export async function getServerUser(): Promise<UserResponse | null> {
	const authHeaders = await getAuthHeaders();

	if (!authHeaders) return null;

	try {
		const user = await userService.me({
			headers: {
				...authHeaders,
				Referer: APP_URL,
				Origin: APP_URL,
				"Cache-Control": "no-cache",
			},
		});

		return user;
	} catch {
		return null;
	}
}
