import { Award, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CurrentPlanCardProps {
	currentPeriod: string;
	isCanceled: boolean;
	isLifetime: boolean;
	planNameKey?: string;
}

export function CurrentPlanCard({
	currentPeriod,
	isCanceled,
	isLifetime,
	planNameKey,
}: CurrentPlanCardProps) {
	const t = useTranslations("BillingPage");

	return (
		<Card className="overflow-hidden border-border/60 shadow-md">
			<CardHeader className="flex flex-row items-center justify-between space-y-0">
				<div className="flex items-center gap-4">
					<div
						className={cn(
							"p-2.5 rounded-xl border bg-background",
							isLifetime
								? "text-amber-500 border-amber-500/20"
								: "text-primary border-border",
						)}
					>
						{isLifetime ? (
							<Award className="h-5 w-5" />
						) : (
							<CreditCard className="h-5 w-5" />
						)}
					</div>
					<div>
						<CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
							{t("currentlyOn")}
						</CardTitle>
						<p className="text-2xl font-bold tracking-tight mt-0.5">
							{planNameKey ? t(planNameKey) : t(`periods.${currentPeriod}`)}
						</p>
					</div>
				</div>

				<Badge
					variant={isCanceled ? "destructive" : "secondary"}
					className={cn(
						"px-3 py-1 font-semibold text-xs uppercase tracking-wider rounded-md",
						isLifetime && "bg-amber-500/10 text-amber-600 border-amber-500/20",
						!isCanceled &&
							!isLifetime &&
							"bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
					)}
				>
					{isLifetime
						? t("statusLifetime")
						: isCanceled
							? t("statusCanceled")
							: t("statusActive")}
				</Badge>
			</CardHeader>
		</Card>
	);
}
