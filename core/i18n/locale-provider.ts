import { cookies, headers } from "next/headers";
import { COOKIE_NAME, DEFAULT_LOCALE, isSupportedLocale } from "./constants";

export async function getCurrentLocale() {
	try {
		const cookieStore = await cookies();
		const rawCookieLocale = cookieStore.get(COOKIE_NAME)?.value?.trim();

		if (rawCookieLocale && isSupportedLocale(rawCookieLocale)) {
			return rawCookieLocale.replace("_", "-");
		}

		const headersList = await headers();
		const acceptLanguage = headersList.get("accept-language");

		if (acceptLanguage) {
			const firstLanguage = acceptLanguage.split(",")[0].trim();
			const baseLanguage = firstLanguage.split(/[-_]/)[0];

			if (baseLanguage === "pt") {
				return "pt-BR";
			}

			if (isSupportedLocale(baseLanguage)) {
				return baseLanguage;
			}
		}

		return DEFAULT_LOCALE.replace("_", "-");
	} catch {
		return DEFAULT_LOCALE.replace("_", "-");
	}
}
