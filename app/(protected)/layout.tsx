import { HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
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
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<SidebarProvider>
					<AppSidebar
						user={{
							name: user.data?.name || "",
							email: user.data?.email || "",
						}}
					/>
					<div className="flex flex-col flex-1 min-h-screen min-w-0">
						{children}
					</div>
				</SidebarProvider>
			</ThemeProvider>
		</HydrationBoundary>
	);
}
