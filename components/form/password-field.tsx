"use client";

import { Eye, EyeOff } from "lucide-react";
import { type InputHTMLAttributes, type ReactNode, useState } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordFieldProps<T extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	name: FieldPath<T>;
	control: Control<T>;
	label?: string;
	rightLabel?: ReactNode;
}

const PasswordField = <T extends FieldValues>({
	name,
	control,
	label,
	rightLabel,
	className,
	...props
}: PasswordFieldProps<T>) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid} className="w-full space-y-1.5">
					<div className="flex items-center justify-between">
						{label && (
							<FieldLabel className="text-sm font-semibold tracking-tight text-foreground">
								{label}
							</FieldLabel>
						)}
						{rightLabel}
					</div>

					<div className="relative">
						<Input
							{...field}
							{...props}
							type={showPassword ? "text" : "password"}
							className={cn(
								"h-10 pr-10 transition-all focus-visible:ring-1",
								fieldState.invalid &&
									"border-destructive focus-visible:ring-destructive",
								className,
							)}
						/>

						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
							title={showPassword ? "Esconder senha" : "Mostrar senha"}
						>
							{showPassword ? (
								<EyeOff className="h-4 w-4" aria-hidden="true" />
							) : (
								<Eye className="h-4 w-4" aria-hidden="true" />
							)}
							<span className="sr-only">
								{showPassword ? "Esconder senha" : "Mostrar senha"}
							</span>
						</button>
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

PasswordField.displayName = "PasswordField";

export { PasswordField };
