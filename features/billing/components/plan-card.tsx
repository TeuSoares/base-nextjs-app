"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/common";
import { useLanguage } from "@/hooks";
import { formatPrice } from "@/utils";
import { useCheckout } from "../hooks/use-checkout";
import type { Plan } from "../types";
import { setSelectedPlanCookie } from "../utils/planCookie";

interface PlanCardProps {
	plan: Plan;
	onAction?: () => void;
	isLoadingExternal?: boolean;
}

export function PlanCard({ plan, onAction, isLoadingExternal }: PlanCardProps) {
	const t = useTranslations("Billing");
	const tButtons = useTranslations("Buttons");

	const { locale } = useLanguage();
	const { checkout, isPending } = useCheckout();

	const isButtonLoading = isLoadingExternal || isPending;

	const handleButtonClick = () => {
		setSelectedPlanCookie(plan.period);

		if (onAction) {
			onAction();
			return;
		}

		checkout({ plan: plan.period });
	};

	return (
		<div
			className={`relative rounded-2xl bg-card p-8 shadow-md border transition-all duration-300 hover:shadow-lg flex flex-col justify-between min-h-130 ${
				plan.isPopular
					? "border-primary ring-2 ring-primary/20 scale-100 md:scale-105"
					: "border-border"
			}`}
		>
			{plan.isPopular && (
				<span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground tracking-wide uppercase">
					{t("popularTag")}
				</span>
			)}

			<div>
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-2xl font-bold tracking-tight text-foreground">
							{t(plan.nameKey)}
						</h3>
						{plan.descriptionKey && (
							<p className="mt-2 text-sm text-muted-foreground">
								{t(plan.descriptionKey)}
							</p>
						)}
					</div>
				</div>

				<div className="my-6 flex items-baseline text-foreground">
					<span className="text-5xl font-extrabold tracking-tight">
						{formatPrice(plan.price, locale)}
					</span>
					<span className="ml-1 text-xl font-semibold text-muted-foreground">
						{plan.period === "monthly"
							? t("periods.monthly")
							: t("periods.monthlyEquivalent")}
					</span>
				</div>

				{plan.period === "yearly" && (
					<p className="text-xs text-primary font-medium -mt-4 mb-6">
						{t("yearlyLabel")}
					</p>
				)}

				<hr className="border-border my-6" />

				<ul className="space-y-4">
					{plan.featuresKeys.map((featKey) => (
						<li
							key={featKey}
							className="flex items-start gap-3 text-sm text-foreground"
						>
							<div className="shrink-0 rounded-full p-0.5 bg-primary/10 text-primary">
								<Check className="h-4 w-4" />
							</div>
							<span>{t(`features.${featKey}`)}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="mt-8">
				<ActionButton
					className="rounded-xl py-3"
					variant={plan.isPopular ? "default" : "secondary"}
					loading={isButtonLoading}
					loadingText={tButtons("processing")}
					onClick={handleButtonClick}
				>
					{plan.isPopular ? t("ctaPopular") : t("ctaDefault")}
				</ActionButton>
			</div>
		</div>
	);
}
