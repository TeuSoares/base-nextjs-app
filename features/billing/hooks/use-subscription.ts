import { useQuery } from "@tanstack/react-query";
import { billingService } from "../services/billing-service";

export function useSubscription() {
	return useQuery({
		queryKey: ["subscription"],
		queryFn: () => billingService.getSubscription(),
		staleTime: 1000 * 60 * 5,
		retry: false,
	});
}
