import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/common/action-button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SubscriptionManagementProps {
	isCanceled: boolean;
	isLifetime: boolean;
	isCancelling: boolean;
	isResuming: boolean;
	onCancel: () => void;
	onResume: () => void;
	showCancelButton: boolean;
	showResumeButton: boolean;
}

export function SubscriptionManagement({
	isCanceled,
	isLifetime,
	isCancelling,
	isResuming,
	onCancel,
	onResume,
	showCancelButton,
	showResumeButton,
}: SubscriptionManagementProps) {
	const t = useTranslations("BillingPage");
	const tButtons = useTranslations("Buttons");

	if (isLifetime) {
		return (
			<Card className="border-amber-500/20 bg-amber-500/5 shadow-none">
				<CardContent className="p-6">
					<div className="space-y-1">
						<p className="text-sm font-semibold text-amber-800 dark:text-amber-400">
							{t("dangerZone.lifetimeTitle")}
						</p>
						<p className="text-sm text-muted-foreground max-w-md">
							{t("dangerZone.lifetimeDesc")}
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (!showCancelButton && !showResumeButton) return null;

	return (
		<Card
			className={cn(
				"border-border/40 shadow-none bg-muted/10",
				isCanceled && "border-emerald-500/20 bg-emerald-500/2",
			)}
		>
			<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
				<div className="space-y-1">
					<p className="text-sm font-semibold">
						{isCanceled
							? t("dangerZone.resumeTitle")
							: t("dangerZone.cancelTitle")}
					</p>
					<p className="text-sm text-muted-foreground max-w-md">
						{isCanceled
							? t("dangerZone.resumeDesc")
							: t("dangerZone.cancelDesc")}
					</p>
				</div>

				{showResumeButton && (
					<ActionButton
						className="w-full sm:w-auto shrink-0 bg-emerald-600 hover:bg-emerald-600/90 text-white font-medium shadow-sm"
						loading={isResuming}
						loadingText={tButtons("processing")}
						onClick={onResume}
					>
						<div className="flex items-center justify-center gap-1.5 w-full h-full">
							<span>{t("resumeSubscription")}</span>
						</div>
					</ActionButton>
				)}

				{showCancelButton && (
					<ActionButton
						variant="ghost"
						className="w-full sm:w-auto shrink-0 font-medium text-destructive hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/10"
						loading={isCancelling}
						loadingText={tButtons("processing")}
						onClick={onCancel}
					>
						<div className="flex items-center justify-center gap-1.5 w-full h-full">
							<span>{t("cancelSubscription")}</span>
						</div>
					</ActionButton>
				)}
			</CardContent>
		</Card>
	);
}
