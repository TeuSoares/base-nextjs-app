"use client";

import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { APP_ROUTES } from "@/core/config/constants/navigation";
import { clearSelectedPlanCookie } from "@/features/billing/utils/planCookie";

export default function CheckoutSuccessPage() {
	const t = useTranslations("Checkout.success");
	const router = useRouter();
	const queryClient = useQueryClient();

	useEffect(() => {
		clearSelectedPlanCookie();

		queryClient.invalidateQueries({ queryKey: ["user"] });

		const timer = setTimeout(() => {
			router.refresh();
			router.push(APP_ROUTES.dashboard);
		}, 4000);

		return () => clearTimeout(timer);
	}, [router, queryClient]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
			<div className="w-full max-w-md text-center space-y-6">
				<div className="flex justify-center">
					<div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
						<CheckCircle className="h-10 w-10 text-green-600" />
					</div>
				</div>

				<div className="space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
					<p className="text-muted-foreground text-balance">
						{t("description")}
					</p>
				</div>

				<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
					<Loader2 className="h-4 w-4 animate-spin text-primary" />
					{t("redirecting")}
				</div>

				<Link
					href={APP_ROUTES.dashboard}
					onClick={() => {
						queryClient.invalidateQueries({ queryKey: ["user"] });
						router.refresh();
					}}
					className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
				>
					{t("cta")}
				</Link>
			</div>
		</div>
	);
}
