"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useTranslations("Errors");
	const tButtons = useTranslations("Buttons");

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
			<h1 className="text-6xl font-bold text-muted-foreground">500</h1>
			<h2 className="text-2xl font-semibold">{t("unexpected")}</h2>
			<button
				type="button"
				onClick={reset}
				className="mt-4 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
			>
				{tButtons("tryAgain")}
			</button>
		</div>
	);
}
