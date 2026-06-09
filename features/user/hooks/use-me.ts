import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user-service";

export function useMe() {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => userService.me(),
		select: (response) => response.data,
		staleTime: 1000 * 60 * 30, // Keep data fresh for 30 minutes
		gcTime: 1000 * 60 * 60, // Cache remains in memory for 1 hour
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	});
}
