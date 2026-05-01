/**
 * COOKIES
 */
export const getCookie = (name: string): string | undefined => {
	if (typeof document === "undefined") return undefined;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		const rawValue = parts.pop()?.split(";").shift();
		return rawValue ? decodeURIComponent(rawValue) : undefined;
	}

	return undefined;
};
