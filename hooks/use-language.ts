"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { COOKIE_NAME } from "../core/i18n/constants";

export function useLanguage() {
	const router = useRouter();
	const currentLocale = useLocale();

	const setLanguage = (newLocale: string) => {
		Cookies.set(COOKIE_NAME, newLocale, { expires: 365 });
		router.refresh();
	};

	return {
		locale: currentLocale,
		setLanguage,
	};
}
