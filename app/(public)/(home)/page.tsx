"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { PlanCard } from "@/features/billing/components/plan-card";
import { PLANS } from "@/features/billing/constants/plans";

export default function Home() {
	const router = useRouter();
	const tMarketing = useTranslations("Marketing.home");
	const tPricing = useTranslations("Pricing");

	const handlePlanSelection = () => {
		router.push(AUTH_ROUTES.signUp);
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center space-y-6">
				<h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-balance">
					{tMarketing("hero.title")}
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
					{tMarketing("hero.subtitle")}
				</p>
			</section>

			<section className="mx-auto max-w-6xl px-6 py-12 space-y-12">
				<div className="text-center space-y-3">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						{tPricing("title")}
					</h2>
					<p className="text-muted-foreground">{tPricing("subtitle")}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto pt-4">
					{PLANS.map((plan) => (
						<PlanCard
							key={plan.id}
							plan={plan}
							onAction={handlePlanSelection}
						/>
					))}
				</div>
			</section>

			<footer className="text-center py-12 text-sm text-muted-foreground border-t border-border mt-20">
				<p>{tPricing("footer")}</p>
			</footer>
		</div>
	);
}
