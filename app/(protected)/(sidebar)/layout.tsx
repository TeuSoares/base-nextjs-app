"use client";

import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useMe } from "@/features/user/hooks/use-me";

export default function SidebarLayout({ children }: { children: ReactNode }) {
	const { data: user } = useMe();

	return (
		<SidebarProvider>
			<AppSidebar
				user={{
					name: user?.name || "",
					email: user?.email || "",
				}}
			/>
			<div className="flex flex-col flex-1 min-h-screen min-w-0">
				{children}
			</div>
		</SidebarProvider>
	);
}
