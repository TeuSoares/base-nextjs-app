import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useApiErrorHandler } from "@/hooks";
import { billingService } from "../services/billing-service";

function useResumeSubscriptionMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => billingService.resume(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["subscription"] });
		},
	});
}

export function useResumeSubscription() {
	const { mutate, isPending } = useResumeSubscriptionMutation();
	const { handleApiError } = useApiErrorHandler();
	const t = useTranslations("Billing");

	const resume = () => {
		mutate(undefined, {
			onSuccess: () => toast.success(t("resumeSuccess")),
			onError: (err) => handleApiError(err),
		});
	};

	return { resume, isPending };
}
