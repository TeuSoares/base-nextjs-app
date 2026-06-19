export const formatDate = (
	dateValue: string | Date | null | undefined,
	locale: string = "en",
): string => {
	if (!dateValue) return "";

	try {
		const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

		if (Number.isNaN(date.getTime())) return "";

		const isPt = locale.toLowerCase().startsWith("pt");

		return date.toLocaleDateString(isPt ? "pt-BR" : "en-US");
	} catch (error) {
		console.error("Error formatting date:", error);
		return "";
	}
};
