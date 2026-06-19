// features/billing/hooks/use-swap-plan.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useApiErrorHandler } from "@/hooks";
import { billingService } from "../services/billing-service";

function useSwapPlanMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (plan: string) => billingService.swap({ plan }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["subscription"] });
		},
	});
}

export function useSwapPlan() {
	const { mutate, isPending } = useSwapPlanMutation();
	const { handleApiError } = useApiErrorHandler();
	const t = useTranslations("BillingPage");

	const swapPlan = (plan: string) => {
		mutate(plan, {
			onSuccess: () => toast.success(t("swapSuccess")),
			onError: (err) => handleApiError(err),
		});
	};

	return { swapPlan, isPending };
}
