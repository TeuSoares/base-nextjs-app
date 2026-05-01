import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CenterProps = HTMLAttributes<HTMLDivElement>;

export const Center = ({ children, className, ...props }: CenterProps) => {
	return (
		<div
			className={cn("flex-1 flex justify-center items-center", className)}
			{...props}
		>
			{children}
		</div>
	);
};
