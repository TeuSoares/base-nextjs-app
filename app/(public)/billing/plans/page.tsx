import { useTranslations } from "next-intl";
import { PricingSection } from "@/features/billing/components/pricing-section";

export default function PlansPage() {
	const t = useTranslations("Billing");

	return (
		<div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
			<div className="text-center max-w-3xl mx-auto mb-16">
				<h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
					{t("title")}
				</h1>
				<p className="mt-4 text-xl text-muted-foreground">{t("subtitle")}</p>
			</div>

			<PricingSection />
		</div>
	);
}
