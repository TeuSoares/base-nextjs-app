import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth-service";

export function useUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => authService.me(),
		select: (response) => response.data,
		staleTime: 1000 * 60 * 30, // Keep data fresh for 30 minutes
		gcTime: 1000 * 60 * 60, // Cache remains in memory for 1 hour
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	});
}
