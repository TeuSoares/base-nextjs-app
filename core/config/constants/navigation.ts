import {
	CreditCard,
	LayoutDashboard,
	LifeBuoy,
	type LucideIcon,
	MessageSquare,
	Settings,
	Sparkles,
	User,
	Users,
} from "lucide-react";
import type { TranslationValues } from "next-intl";

type TranslationFn = (key: string, values?: TranslationValues) => string;

export interface NavChild {
	title: string;
	href: string;
}

export interface NavItem {
	title: string;
	icon: LucideIcon;
	href?: string;
	children?: NavChild[];
}

export interface FooterNavItem {
	title: string;
	icon: LucideIcon;
	href: string;
}

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
	users: "/dashboard/users",
	userRoles: "/dashboard/users/roles",
	userDetail: (id: string) => `/dashboard/users/${id}`,
	changelog: "/changelog",
	support: "/support",
	feedback: "/feedback",
} as const;

export const BILLING_ROUTES = {
	manage: "/billing",
	plans: "/billing/plans",
	checkoutSuccess: "/checkout/success",
	checkoutCancel: "/checkout/cancel",
} as const;

export const SUBSCRIPTION_IGNORED_ROUTES = [
	BILLING_ROUTES.checkoutCancel,
] as const;

export const getSidebarNavItems = (t: TranslationFn): NavItem[] => [
	{
		title: t("dashboard"),
		icon: LayoutDashboard,
		href: APP_ROUTES.dashboard,
	},
	{
		title: t("billing"),
		icon: CreditCard,
		href: BILLING_ROUTES.manage,
	},
	{
		title: t("users"),
		icon: Users,
		children: [
			{ title: t("allUsers"), href: APP_ROUTES.users },
			{ title: t("roles"), href: APP_ROUTES.userRoles },
		],
	},
	{
		title: t("settings"),
		icon: Settings,
		href: APP_ROUTES.settings,
	},
];

export const getSidebarFooterItems = (t: TranslationFn): FooterNavItem[] => [
	{ title: t("profile"), icon: User, href: APP_ROUTES.profile },
	{ title: t("settings"), icon: Settings, href: APP_ROUTES.settings },
	{ title: t("whatsNew"), icon: Sparkles, href: APP_ROUTES.changelog },
	{ title: t("helpSupport"), icon: LifeBuoy, href: APP_ROUTES.support },
	{ title: t("sendFeedback"), icon: MessageSquare, href: APP_ROUTES.feedback },
];
