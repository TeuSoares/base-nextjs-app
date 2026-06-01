import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type InfoSize = "sm" | "md" | "lg";

const infoSizeStyles: Record<InfoSize, { name: string; email: string }> = {
	sm: { name: "text-xs font-medium leading-none", email: "text-xs" },
	md: { name: "text-sm font-medium leading-none", email: "text-xs" },
	lg: { name: "text-lg font-semibold leading-none", email: "text-sm" },
};

interface UserAvatarProps {
	name: string;
	email?: string;
	avatarUrl?: string;
	className?: string;
	fallbackClassName?: string;
	showInfo?: boolean;
	infoSize?: InfoSize;
}

export function UserAvatar({
	name,
	email,
	avatarUrl,
	className,
	fallbackClassName,
	showInfo = false,
	infoSize = "md",
}: UserAvatarProps) {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const styles = infoSizeStyles[infoSize];

	return (
		<div className="flex items-center gap-2 min-w-0">
			<Avatar className={cn("h-8 w-8 shrink-0", className)}>
				<AvatarImage src={avatarUrl} />
				<AvatarFallback
					className={cn(
						"bg-primary text-primary-foreground",
						fallbackClassName,
					)}
				>
					{initials}
				</AvatarFallback>
			</Avatar>
			{showInfo && (
				<div className="flex flex-col gap-0.5 text-left min-w-0">
					<span className={cn(styles.name, "line-clamp-2")}>{name}</span>
					{email && (
						<span
							className={cn("text-muted-foreground line-clamp-2", styles.email)}
						>
							{email}
						</span>
					)}
				</div>
			)}
		</div>
	);
}
