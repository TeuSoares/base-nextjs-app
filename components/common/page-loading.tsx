import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageLoadingProps {
	className?: string;
	iconClassName?: string;
}

export function PageLoading({ className, iconClassName }: PageLoadingProps) {
	return (
		<div
			className={cn(
				"flex flex-1 items-center justify-center p-6 min-h-[50vh]",
				className,
			)}
		>
			<Loader2
				className={cn("h-6 w-6 animate-spin text-primary", iconClassName)}
			/>
		</div>
	);
}
