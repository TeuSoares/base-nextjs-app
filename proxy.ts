import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_STATIC_ROUTES = new Set([
	"/",
	"/auth/sign-in",
	"/auth/sign-up",
	"/auth/forgot-password",
	"/checkout/success",
	"/checkout/cancel",
]);

const PUBLIC_DYNAMIC_PREFIXES = ["/auth/reset-password"];
const LOGIN_URL = "/auth/sign-in";
const DASHBOARD_URL = "/dashboard";

export function proxy(request: NextRequest) {
	const { nextUrl, cookies } = request;
	const pathname = nextUrl.pathname;

	if (nextUrl.searchParams.get("clear") === "true") {
		const response = NextResponse.next();
		response.cookies.delete("app_is_logged");
		return response;
	}

	const isAuthenticated = cookies.get("app_is_logged")?.value === "true";
	const isPublicRoute =
		PUBLIC_STATIC_ROUTES.has(pathname) ||
		PUBLIC_DYNAMIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
	const isAuthPage = pathname.startsWith("/auth");

	if (isAuthenticated && isAuthPage) {
		return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
	}

	if (!isAuthenticated && !isPublicRoute) {
		const loginUrl = new URL(LOGIN_URL, request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
	],
};
