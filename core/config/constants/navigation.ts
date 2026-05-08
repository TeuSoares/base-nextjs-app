export const AUTH_ROUTES = {
	signIn: "/auth/sign-in",
	signUp: "/auth/sign-up",
	forgotPassword: "/auth/forgot-password",
	resetPassword: "/auth/reset-password",
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
