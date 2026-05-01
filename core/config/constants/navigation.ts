export const AUTH_ROUTES = {
	signIn: "/sign-in",
	signUp: "/sign-up",
	forgotPassword: "/forgot-password",
	resetPassword: "/reset-password",
} as const;

export const APP_ROUTES = {
	dashboard: "/dashboard",
	profile: "/profile",
	settings: "/settings",
} as const;

export const SIDEBAR_ITEMS = [
	{
		label: "Dashboard",
		href: APP_ROUTES.dashboard,
		icon: "LayoutDashboard",
	},
	{
		label: "Perfil",
		href: APP_ROUTES.profile,
		icon: "User",
	},
] as const;
