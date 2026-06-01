"use client";

import { Languages } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	DEFAULT_LOCALE,
	LANGUAGE_CONFIG,
	type SupportedLocale,
} from "@/core/i18n/constants";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

interface LanguagePickerProps {
	className?: string;
}

export function LanguagePicker({ className }: LanguagePickerProps) {
	const { locale, setLanguage } = useLanguage();

	const safeLocale = (locale?.replace("-", "_") ||
		DEFAULT_LOCALE) as SupportedLocale;

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Select value={safeLocale} onValueChange={setLanguage}>
				<SelectTrigger className="w-40 bg-background border-muted-foreground/20 hover:bg-accent transition-colors">
					<div className="flex items-center gap-2 text-sm font-medium">
						<Languages className="h-4 w-4 text-muted-foreground" />
						<SelectValue>
							{LANGUAGE_CONFIG[safeLocale]?.flag}{" "}
							{LANGUAGE_CONFIG[safeLocale]?.label}
						</SelectValue>
					</div>
				</SelectTrigger>
				<SelectContent align="end" className="min-w-35">
					{Object.entries(LANGUAGE_CONFIG).map(([key, { label, flag }]) => (
						<SelectItem key={key} value={key} className="cursor-pointer">
							<span className="mr-2">{flag}</span>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
