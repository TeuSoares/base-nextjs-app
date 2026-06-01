import type { ReactNode } from "react";
import { FieldLabel } from "@/components/ui/field";

interface FieldLabelRowProps {
	label?: string;
	required?: boolean;
	rightLabel?: ReactNode;
}

export function FieldLabelRow({
	label,
	required,
	rightLabel,
}: FieldLabelRowProps) {
	if (!label && !rightLabel) return null;

	return (
		<div className="flex items-center justify-between">
			{label && (
				<FieldLabel className="text-sm font-semibold tracking-tight text-foreground">
					{label}
					{required && <span className="text-destructive">*</span>}
				</FieldLabel>
			)}
			{rightLabel}
		</div>
	);
}
