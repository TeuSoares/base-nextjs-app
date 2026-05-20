"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { AppSidebarFooter } from "./sidebar-footer";
import { AppSidebarHeader } from "./sidebar-header";
import { AppSidebarNav } from "./sidebar-nav";

interface User {
	name: string;
	email: string;
	avatarUrl?: string;
}

interface AppSidebarProps {
	user: User;
}

export function AppSidebar({ user }: AppSidebarProps) {
	return (
		<Sidebar>
			<AppSidebarHeader />
			<AppSidebarNav />
			<AppSidebarFooter user={user} />
		</Sidebar>
	);
}
