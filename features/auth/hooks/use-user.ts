import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth-service";

export function useUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => authService.me(),
		staleTime: 1000 * 60 * 30,
		gcTime: 1000 * 60 * 60,
		retry: false,
	});
}
