import { useTranslations } from "next-intl";
import { BILLING_GATEWAY, PLANS } from "../constants/plans";
import { PlanCard } from "./plan-card";

export function PricingSection() {
	const t = useTranslations("Billing");

	return (
		<div className="w-full flex flex-col items-center">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full items-start">
				{PLANS.map((plan) => (
					<PlanCard key={plan.id} plan={plan} />
				))}
			</div>

			<p className="mt-8 text-xs text-muted-foreground text-center">
				{t("securePayment", { gateway: BILLING_GATEWAY.name })}
			</p>
		</div>
	);
}
