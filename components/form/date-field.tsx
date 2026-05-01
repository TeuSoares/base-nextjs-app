"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateFieldProps<T extends FieldValues> {
	name: FieldPath<T>;
	control: Control<T>;
	label?: string;
}

export const DateField = <T extends FieldValues>({
	name,
	control,
	label,
}: DateFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid} className="w-full space-y-1.5">
					{label && (
						<FieldLabel className="text-sm font-semibold">{label}</FieldLabel>
					)}

					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-full h-10 justify-start text-left font-normal border-input",
									!field.value && "text-muted-foreground",
									fieldState.invalid && "border-destructive",
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{field.value ? (
									format(new Date(field.value), "PPP", { locale: ptBR })
								) : (
									<span>Selecione uma data</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={field.value ? new Date(field.value) : undefined}
								onSelect={(date) => field.onChange(date?.toISOString())}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

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
