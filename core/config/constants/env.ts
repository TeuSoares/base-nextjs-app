export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE_ENV === "production";
export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_TEST = NODE_ENV === "test";

export const BASE_API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const APP_URL =
	process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const AUTH_CONFIG = {
	strategy: (process.env.NEXT_PUBLIC_AUTH_STRATEGY || "session") as
		| "session"
		| "bearer",
	tokenName: process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || "access_token",
	sessionCookie:
		process.env.NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME || "laravel_session",
	csrfCookie: process.env.NEXT_PUBLIC_AUTH_CSRF_COOKIE_NAME || "XSRF-TOKEN",
	csrfHeader: process.env.NEXT_PUBLIC_AUTH_CSRF_HEADER_NAME || "X-XSRF-TOKEN",
} as const;

if (
	typeof window === "undefined" &&
	IS_DEVELOPMENT &&
	!process.env.NEXT_PUBLIC_API_URL
) {
	console.warn(
		"⚠️ WARNING: NEXT_PUBLIC_API_URL is not set. Using default http://localhost:8000.",
	);
}
