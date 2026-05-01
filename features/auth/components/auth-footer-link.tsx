import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthFooterLinkProps {
	label: string;
	linkText: string;
	href: string;
	className?: string;
}

export const AuthFooterLink = ({
	label,
	linkText,
	href,
	className,
}: AuthFooterLinkProps) => {
	return (
		<p className={cn("text-sm text-muted-foreground text-center", className)}>
			{label}{" "}
			<Link
				href={href}
				className="font-bold text-primary underline-offset-4 hover:underline transition-colors"
			>
				{linkText}
			</Link>
		</p>
	);
};
