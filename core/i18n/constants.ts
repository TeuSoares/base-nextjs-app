export const SUPPORTED_LOCALES = ["pt_BR", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const COOKIE_NAME = "user_language";

export function isSupportedLocale(locale: unknown): locale is SupportedLocale {
	return (
		typeof locale === "string" &&
		(SUPPORTED_LOCALES as readonly string[]).includes(locale)
	);
}

export const LANGUAGE_CONFIG: Record<
	SupportedLocale,
	{ label: string; flag: string }
> = {
	pt_BR: { label: "Português", flag: "🇧🇷" },
	en: { label: "English", flag: "🇺🇸" },
};
