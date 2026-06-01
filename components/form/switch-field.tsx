"use client";

import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SwitchFieldProps<T extends FieldValues> {
	name: FieldPath<T>;
	control: Control<T>;
	label?: string;
	description?: string;
	required?: boolean;
	className?: string;
}

const SwitchField = <T extends FieldValues>({
	name,
	control,
	label,
	description,
	required,
	className,
}: SwitchFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field
					data-invalid={fieldState.invalid}
					className={cn("w-full", className)}
				>
					<div className="flex items-center gap-3">
						<Switch
							checked={field.value}
							onCheckedChange={field.onChange}
							className="shrink-0"
						/>
						{(label || description) && (
							<div className="flex flex-col gap-0.5">
								{label && (
									<FieldLabel className="text-sm font-semibold tracking-tight text-foreground">
										{label}
										{required && (
											<span className="ml-1 text-destructive">*</span>
										)}
									</FieldLabel>
								)}
								{description && (
									<p className="text-xs text-muted-foreground">{description}</p>
								)}
							</div>
						)}
					</div>
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

SwitchField.displayName = "SwitchField";

export { SwitchField };
