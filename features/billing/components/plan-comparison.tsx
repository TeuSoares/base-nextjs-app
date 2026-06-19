import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/common/action-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/features/billing/constants/plans";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils";

interface PlanComparisonProps {
	currentPeriod: string;
	isSwapping: boolean;
	locale: string;
	onSwapPlan: (period: string) => void;
}

export function PlanComparison({
	currentPeriod,
	isSwapping,
	locale,
	onSwapPlan,
}: PlanComparisonProps) {
	const t = useTranslations("BillingPage");
	const tButtons = useTranslations("Buttons");

	return (
		<div className="space-y-4">
			<div>
				<h3 className="text-lg font-semibold tracking-tight">
					{t("plansTitle")}
				</h3>
				<p className="text-sm text-muted-foreground">{t("plansSubtitle")}</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{PLANS.map((plan) => {
					const isCurrent = plan.period === currentPeriod;

					return (
						<Card
							key={plan.id}
							className={cn(
								"flex flex-col justify-between transition-all duration-300 border-border/60 shadow-sm relative overflow-hidden",
								isCurrent &&
									"border-primary/60 ring-2 ring-primary/5 bg-primary/1",
							)}
						>
							<CardHeader className="pb-4">
								<div className="flex flex-col gap-1.5">
									<div className="flex items-center justify-between">
										<CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
											{t(plan.nameKey)}
										</CardTitle>
										{isCurrent && (
											<Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
												{t("current")}
											</Badge>
										)}
									</div>
									<p className="text-2xl font-extrabold text-foreground tracking-tight mt-1">
										{formatPrice(plan.price, locale)}
									</p>
									<span className="text-xs text-muted-foreground font-medium">
										{t(`periodsDetails.${plan.period}`)}
									</span>
								</div>
							</CardHeader>

							<CardContent className="pt-0 pb-5">
								{!isCurrent && (
									<ActionButton
										variant="outline"
										className="w-full h-9 text-xs font-medium border-border/80 hover:bg-accent"
										loading={isSwapping}
										loadingText={tButtons("processing")}
										onClick={() => onSwapPlan(plan.period)}
									>
										<div className="flex items-center justify-center gap-1.5 w-full h-full">
											<Zap className="h-3 w-3 shrink-0" />
											<span>{t("switchTo")}</span>
										</div>
									</ActionButton>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
