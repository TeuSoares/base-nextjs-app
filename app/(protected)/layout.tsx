import { HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import {
	AUTH_ROUTES,
	BILLING_ROUTES,
	SUBSCRIPTION_IGNORED_ROUTES,
} from "@/core/config/constants/navigation";
import { getDehydratedState } from "@/core/services/query-client";
import { LanguageSyncer } from "@/features/auth/components/language-syncer";
import { getServerUser } from "@/features/auth/services/auth-server";
import { shouldSkipSubscriptionCheck } from "@/features/billing/utils/shouldSkipSubscriptionCheck";

export default async function ProtectedLayout({
	children,
}: {
	children: ReactNode;
}) {
	const user = await getServerUser();

	if (!user) redirect(`${AUTH_ROUTES.signIn}?clear=true`);

	const headersList = await headers();
	const activePath = headersList.get("x-url") || "";

	const isIgnoredRoute = shouldSkipSubscriptionCheck(
		activePath,
		SUBSCRIPTION_IGNORED_ROUTES,
	);

	if (!user.data?.has_active_subscription && !isIgnoredRoute)
		redirect(BILLING_ROUTES.plans);

	const dehydratedState = getDehydratedState(["user"], user);

	return (
		<HydrationBoundary state={dehydratedState}>
			<LanguageSyncer userLanguage={user.data?.language} />
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</HydrationBoundary>
	);
}
