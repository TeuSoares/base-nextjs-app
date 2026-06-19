// app/(protected)/billing/page.tsx
"use client";

import { ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { PageLoading } from "@/components/common";
import { PageHeader } from "@/components/layout/page-header";
import type { Plans } from "@/core/config/constants/payment";
import { CurrentPlanCard } from "@/features/billing/components/current-plan-card";
import { PlanComparison } from "@/features/billing/components/plan-comparison";
import { SubscriptionManagement } from "@/features/billing/components/subscription-management";
import { PLANS } from "@/features/billing/constants/plans";
import { useCancelSubscription } from "@/features/billing/hooks/use-cancel-subscription";
import { useResumeSubscription } from "@/features/billing/hooks/use-resume-subscription";
import { useSubscription } from "@/features/billing/hooks/use-subscription";
import { useSwapPlan } from "@/features/billing/hooks/use-swap-plan";
import { getBillingPermissions } from "@/features/billing/utils/permissions";
import { useLanguage } from "@/hooks";
import { formatDate } from "@/utils";

export default function BillingPage() {
	const t = useTranslations("BillingPage");
	const { locale } = useLanguage();

	const { data: subscription, isLoading } = useSubscription();
	const { swapPlan, isPending: isSwapping } = useSwapPlan();
	const { cancel, isPending: isCancelling } = useCancelSubscription();
	const { resume, isPending: isResuming } = useResumeSubscription();

	if (isLoading) {
		return (
			<>
				<PageHeader title={t("title")} />
				<PageLoading />
			</>
		);
	}

	const currentPeriod = subscription?.period as Plans;
	const isCanceled = subscription?.canceled ?? false;
	const isLifetime = currentPeriod === "lifetime";
	const currentActivePlan = PLANS.find((p) => p.period === currentPeriod);

	const permissions = getBillingPermissions(subscription, isLifetime);

	return (
		<>
			<PageHeader title={t("title")} />

			<div className="container max-w-3xl p-6 mx-auto space-y-8 animate-in fade-in-50 duration-300">
				{isCanceled && subscription?.ends_at && (
					<div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-destructive">
						<ShieldAlert className="h-5 w-5 mt-0.5 shrink-0" />
						<div className="space-y-1">
							<p className="font-semibold text-sm">{t("statusCanceled")}</p>
							<p className="text-sm opacity-90">
								{t("canceledNotice", {
									date: formatDate(subscription.ends_at, locale),
								})}
							</p>
						</div>
					</div>
				)}

				<CurrentPlanCard
					currentPeriod={currentPeriod}
					isCanceled={isCanceled}
					isLifetime={isLifetime}
					planNameKey={currentActivePlan?.nameKey}
				/>

				{permissions.showComparison && PLANS.length > 1 && (
					<PlanComparison
						currentPeriod={currentPeriod}
						isSwapping={isSwapping}
						locale={locale}
						onSwapPlan={swapPlan}
					/>
				)}

				<SubscriptionManagement
					isCanceled={isCanceled}
					isLifetime={isLifetime}
					isCancelling={isCancelling}
					isResuming={isResuming}
					onCancel={cancel}
					onResume={resume}
					showCancelButton={permissions.showCancelButton}
					showResumeButton={permissions.showResumeButton}
				/>
			</div>
		</>
	);
}
