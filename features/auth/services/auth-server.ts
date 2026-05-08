"use server";

import { getAuthHeaders } from "@/core/auth/auth-headers.server";
import { APP_URL } from "@/core/config/env";
import type { AuthResponse } from "../types";
import { authService } from "./auth-service";

export async function getServerUser(): Promise<AuthResponse | null> {
	const authHeaders = await getAuthHeaders();

	if (!authHeaders) return null;

	try {
		const user = await authService.me({
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
