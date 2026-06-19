export const formatPrice = (price: number, locale: string = "en"): string => {
	const isPt = locale.toLowerCase().startsWith("pt");
	return new Intl.NumberFormat(isPt ? "pt-BR" : "en-US", {
		style: "currency",
		currency: isPt ? "BRL" : "USD",
	}).format(price);
};
