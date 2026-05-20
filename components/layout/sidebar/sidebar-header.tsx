import { SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebarHeader() {
	return (
		<SidebarHeader className="border-b border-sidebar-border">
			<div className="flex items-center gap-2 px-2 py-3">
				<span className="text-lg font-bold uppercase tracking-widest">
					Logo
				</span>
			</div>
		</SidebarHeader>
	);
}
