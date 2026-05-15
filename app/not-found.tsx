"use client";

import { useTranslations } from "next-intl";

export default function NotFound() {
	const t = useTranslations("Errors.notFound");

	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center bg-primary text-white text-2xl gap-4">
			<h1>{t("title")}</h1>
			<p className="text-base opacity-80">{t("description")}</p>
		</div>
	);
}
