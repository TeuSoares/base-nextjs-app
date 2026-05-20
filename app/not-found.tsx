import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { APP_ROUTES } from "@/core/config/constants/navigation";

export default async function NotFound() {
	const t = await getTranslations("Errors.notFound");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
			<h1 className="text-6xl font-bold text-muted-foreground">404</h1>
			<h2 className="text-2xl font-semibold">{t("title")}</h2>
			<p className="max-w-md text-muted-foreground">{t("description")}</p>
			<Link
				href={APP_ROUTES.dashboard}
				className="mt-4 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
			>
				{t("backToHome")}
			</Link>
		</div>
	);
}
