/**
 * Checks if the current route should skip the active subscription validation.
 * * @param activePath The current URL path the user is accessing (from request headers)
 * @param ignoredPaths List of paths or prefixes that should be ignored (accepts mutable or readonly arrays)
 */
export function shouldSkipSubscriptionCheck(
	activePath: string,
	ignoredPaths: readonly string[],
): boolean {
	if (!activePath) return false;

	return ignoredPaths.some((ignoredPath) => {
		// Case 1: Exact match (e.g., "/checkout/cancel")
		if (activePath === ignoredPath) return true;

		// Case 2: If the active route ends with the ignored path
		if (activePath.endsWith(ignoredPath)) return true;

		// Case 3: If the ignored path is a prefix group (e.g., "/checkout/" ignores all sub-routes)
		if (ignoredPath.endsWith("/") && activePath.startsWith(ignoredPath))
			return true;

		return false;
	});
}
