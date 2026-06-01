"use client";

import type { ReactNode, TextareaHTMLAttributes } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FieldLabelRow } from "./field-label-row";

interface TextAreaFieldProps<T extends FieldValues>
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: FieldPath<T>;
	control: Control<T>;
	label?: string;
	required?: boolean;
	rightLabel?: ReactNode;
	containerClassName?: string;
}

const TextAreaField = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	rightLabel,
	className,
	onChange: externalOnChange,
	...props
}: TextAreaFieldProps<T>) => {
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
					<Textarea
						{...field}
						{...props}
						onChange={(e) => {
							if (externalOnChange) externalOnChange(e);
							field.onChange(e);
						}}
						className={cn(
							"transition-all focus-visible:ring-1 resize-none",
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

TextAreaField.displayName = "TextAreaField";

export { TextAreaField };
