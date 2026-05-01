export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_TEST = process.env.NODE_ENV === "test";

export const BASE_API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

if (!process.env.NEXT_PUBLIC_API_URL && IS_DEVELOPMENT) {
	console.warn(
		"WARNING: NEXT_PUBLIC_API_URL is not set. Using default http://localhost:8000. Make sure to set this environment variable in production.",
	);
}
