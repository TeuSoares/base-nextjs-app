import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useApiErrorHandler } from "@/hooks";
import { billingService } from "../services/billing-service";

function useCancelSubscriptionMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => billingService.cancel(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["subscription"] });
		},
	});
}

export function useCancelSubscription() {
	const { mutate, isPending } = useCancelSubscriptionMutation();
	const { handleApiError } = useApiErrorHandler();
	const t = useTranslations("BillingPage");

	const cancel = () => {
		mutate(undefined, {
			onSuccess: () => toast.success(t("cancelSuccess")),
			onError: (err) => handleApiError(err),
		});
	};

	return { cancel, isPending };
}
