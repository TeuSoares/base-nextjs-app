import { cookies } from "next/headers";
import { COOKIE_NAME, DEFAULT_LOCALE, isSupportedLocale } from "./constants";

export async function getCurrentLocale() {
	try {
		const cookieStore = await cookies();
		const locale = cookieStore.get(COOKIE_NAME)?.value;

		if (!locale || !isSupportedLocale(locale)) return DEFAULT_LOCALE;

		return locale.replace("_", "-");
	} catch {
		return DEFAULT_LOCALE;
	}
}
