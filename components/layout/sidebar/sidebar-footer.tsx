import { ChevronUp, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { UserAvatar } from "@/components/common";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getSidebarFooterItems } from "@/core/config/constants/navigation";
import { useLogout } from "@/features/auth/hooks/use-logout";

interface User {
	name: string;
	email: string;
	avatarUrl?: string;
}

interface AppSidebarFooterProps {
	user: User;
}

export function AppSidebarFooter({ user }: AppSidebarFooterProps) {
	const router = useRouter();
	const { logout, isPending } = useLogout();
	const tButtons = useTranslations("Buttons");
	const tNav = useTranslations("Navigation");

	const footerItems = useMemo(() => getSidebarFooterItems(tNav), [tNav]);

	return (
		<SidebarFooter className="border-t border-sidebar-border">
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton className="h-12">
								<UserAvatar
									name={user.name}
									email={user.email}
									avatarUrl={user.avatarUrl}
									showInfo
									infoSize="md"
									className="h-7 w-7"
									fallbackClassName="text-xs"
								/>
								<ChevronUp className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="top" className="w-56">
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col gap-0.5 min-w-0">
									<span className="text-sm font-medium truncate">
										{user.name}
									</span>
									<span className="text-xs text-muted-foreground truncate">
										{user.email}
									</span>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{footerItems.map((item) => (
								<DropdownMenuItem
									key={item.href}
									onClick={() => router.push(item.href)}
								>
									<item.icon className="mr-2 h-4 w-4" />
									{item.title}
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem
								variant="destructive"
								onClick={() => logout()}
								disabled={isPending}
							>
								<LogOut className="mr-2 h-4 w-4" />
								{tButtons("logout")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
