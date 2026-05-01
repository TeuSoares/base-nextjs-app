// src/components/ui/action-button.tsx

import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

interface ActionButtonProps extends ButtonProps {
	loading?: boolean;
	loadingText?: string;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
	({ children, loading, loadingText, className, disabled, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				className={cn(
					"relative gap-2 transition-all w-full h-10 font-semibold px-4",
					className,
				)}
				disabled={loading || disabled}
				{...props}
			>
				{loading && <Loader2 className="h-4 w-4 animate-spin" />}

				<span>{loading && loadingText ? loadingText : children}</span>
			</Button>
		);
	},
);

ActionButton.displayName = "ActionButton";

export { ActionButton };
