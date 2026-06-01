"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldLabelRow } from "./field-label-row";

interface TextFieldProps<T extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	name: FieldPath<T>;
	control: Control<T>;
	label?: string;
	required?: boolean;
	rightLabel?: ReactNode;
	description?: string;
	containerClassName?: string;
}

const TextField = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	rightLabel,
	className,
	onChange: externalOnChange,
	...props
}: TextFieldProps<T>) => {
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

					<Input
						{...field}
						{...props}
						onChange={(e) => {
							if (externalOnChange) externalOnChange(e);
							field.onChange(e);
						}}
						className={cn(
							"h-10 transition-all focus-visible:ring-1",
							fieldState.invalid &&
								"border-destructive text-destructive placeholder:text-destructive/60 focus-visible:ring-destructive",
							className,
						)}
					/>

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

TextField.displayName = "TextField";

export { TextField };
