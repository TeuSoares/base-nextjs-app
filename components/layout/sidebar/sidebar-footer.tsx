import { ChevronUp, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

	const initials = user.name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	return (
		<SidebarFooter className="border-t border-sidebar-border">
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton className="h-12">
								<Avatar className="h-7 w-7">
									<AvatarImage src={user.avatarUrl} />
									<AvatarFallback className="text-xs bg-primary text-primary-foreground">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col text-left">
									<span className="text-sm font-medium leading-none">
										{user.name}
									</span>
									<span className="text-xs text-muted-foreground">
										{user.email}
									</span>
								</div>
								<ChevronUp className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="top" className="w-56">
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col gap-0.5">
									<span className="text-sm font-medium">{user.name}</span>
									<span className="text-xs text-muted-foreground">
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
