import { useMutation } from "@tanstack/react-query";
import { useApiErrorHandler } from "@/hooks";
import type { CheckoutInput } from "../schemas/checkout-schema";
import { billingService } from "../services/billing-service";

function useCheckoutMutation() {
	return useMutation({
		mutationFn: (data: CheckoutInput) => billingService.checkout(data),
	});
}

export function useCheckout() {
	const { mutate, isPending } = useCheckoutMutation();
	const { handleApiError } = useApiErrorHandler();

	const checkout = (data: CheckoutInput = {}) => {
		mutate(data, {
			onSuccess: (response) => {
				window.location.href = response.url;
			},
			onError: (err) => handleApiError(err),
		});
	};

	return { checkout, isPending };
}
