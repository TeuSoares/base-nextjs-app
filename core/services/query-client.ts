import { dehydrate, QueryClient } from "@tanstack/react-query";

/**
 * Prepares the dehydrated state to hydrate the React Query cache on the client.
 */
export function getDehydratedState(key: string[], data: unknown) {
	const queryClient = new QueryClient();
	queryClient.setQueryData(key, data);

	return dehydrate(queryClient);
}
