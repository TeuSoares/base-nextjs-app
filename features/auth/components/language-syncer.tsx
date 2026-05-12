"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { COOKIE_NAME } from "@/core/i18n/constants";
import { useLanguage } from "@/hooks/use-language";

interface LanguageSyncerProps {
	userLanguage?: string;
}

export function LanguageSyncer({ userLanguage }: LanguageSyncerProps) {
	const { locale, setLanguage } = useLanguage();

	useEffect(() => {
		if (!userLanguage) return;

		const currentCookie = Cookies.get(COOKIE_NAME);

		if (userLanguage !== locale || userLanguage !== currentCookie)
			setLanguage(userLanguage);
	}, [userLanguage, locale, setLanguage]);

	return null;
}
