import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getSidebarNavItems } from "@/core/config/constants/navigation";

export function AppSidebarNav() {
	const tNav = useTranslations("Navigation");
	const navItems = useMemo(() => getSidebarNavItems(tNav), [tNav]);

	return (
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>{tNav("menu")}</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{navItems.map((item) =>
							item.children ? (
								<Collapsible
									key={item.title}
									defaultOpen
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton>
												<item.icon />
												<span>{item.title}</span>
												<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.children.map((child) => (
													<SidebarMenuSubItem key={child.href}>
														<SidebarMenuSubButton asChild>
															<Link href={child.href}>{child.title}</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							) : (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton asChild>
										<Link href={item.href as string}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							),
						)}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	);
}
