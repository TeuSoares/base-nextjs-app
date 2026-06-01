"use client";

import type { ReactNode } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldLabelRow } from "./field-label-row";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectFieldProps<T extends FieldValues> {
	name: FieldPath<T>;
	control: Control<T>;
	label?: string;
	required?: boolean;
	rightLabel?: ReactNode;
	placeholder?: string;
	options: SelectOption[];
	className?: string;
}

const SelectField = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	rightLabel,
	placeholder,
	options,
	className,
}: SelectFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid} className="w-full space-y-1.5">
					<FieldLabelRow
						label={label}
						required={required}
						rightLabel={rightLabel}
					/>

					<Select value={field.value} onValueChange={field.onChange}>
						<SelectTrigger
							className={cn(
								"h-10 py-4.5 transition-all focus-visible:ring-1",
								fieldState.invalid &&
									"border-destructive text-destructive focus-visible:ring-destructive",
								className,
							)}
						>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent>
							{options.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{fieldState.error?.message && (
						<FieldError className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
							{fieldState.error.message}
						</FieldError>
					)}
				</Field>
			)}
		/>
	);
};

SelectField.displayName = "SelectField";

export { SelectField };
