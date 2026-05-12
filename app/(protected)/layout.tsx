import { HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { getDehydratedState } from "@/core/services/query-client";
import { LanguageSyncer } from "@/features/auth/components/language-syncer";
import { getServerUser } from "@/features/auth/services/auth-server";

export default async function ProtectedLayout({
	children,
}: {
	children: ReactNode;
}) {
	const user = await getServerUser();

	if (!user) redirect(`${AUTH_ROUTES.signIn}?clear=true`);

	const dehydratedState = getDehydratedState(["user"], user);

	return (
		<HydrationBoundary state={dehydratedState}>
			<LanguageSyncer userLanguage={user.data?.language} />
			{children}
		</HydrationBoundary>
	);
}
