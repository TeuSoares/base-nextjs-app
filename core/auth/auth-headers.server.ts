import { cookies } from "next/headers";
import { AUTH_CONFIG } from "@/core/config/constants/env";

export async function getAuthHeaders(): Promise<Record<string, string> | null> {
	const cookieStore = await cookies();
	const headers: Record<string, string> = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};

	if (AUTH_CONFIG.strategy === "bearer") {
		const token = cookieStore.get(AUTH_CONFIG.tokenName)?.value;
		if (!token) return null;

		headers["Authorization"] = `Bearer ${token}`;
		return headers;
	}

	const session = cookieStore.get(AUTH_CONFIG.sessionCookie)?.value;
	const csrf = cookieStore.get(AUTH_CONFIG.csrfCookie)?.value;

	if (!session) return null;

	const cookiesArray = [`${AUTH_CONFIG.sessionCookie}=${session}`];
	if (csrf) cookiesArray.push(`${AUTH_CONFIG.csrfCookie}=${csrf}`);

	headers["Cookie"] = cookiesArray.join("; ");
	headers[AUTH_CONFIG.csrfHeader] = csrf ? decodeURIComponent(csrf) : "";

	return headers;
}
