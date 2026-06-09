"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/common/action-button";
import { APP_ROUTES } from "@/core/config/constants/navigation";
import { useCheckout } from "@/features/billing/hooks/use-checkout";

export default function CheckoutCancelPage() {
	const t = useTranslations("Checkout.cancel");
	const { checkout, isPending } = useCheckout();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
			<div className="w-full max-w-md text-center space-y-6">
				<div className="flex justify-center">
					<div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
						<XCircle className="h-10 w-10 text-destructive" />
					</div>
				</div>

				<div className="space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
					<p className="text-muted-foreground text-balance">
						{t("description")}
					</p>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
					<ActionButton
						loading={isPending}
						loadingText={t("redirecting")}
						onClick={() => checkout()}
						className="sm:w-auto"
					>
						{t("tryAgain")}
					</ActionButton>
					<Link
						href={APP_ROUTES.dashboard}
						className="inline-flex items-center justify-center rounded-md border px-6 py-2.5 text-sm font-medium hover:bg-accent transition-colors sm:w-auto"
					>
						{t("back")}
					</Link>
				</div>
			</div>
		</div>
	);
}
