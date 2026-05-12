import { getRequestConfig } from "next-intl/server";
import { getCurrentLocale } from "./locale-provider";

export default getRequestConfig(async () => {
	const locale = await getCurrentLocale();

	return {
		locale,
		messages: (await import(`../../assets/messages/${locale}.json`)).default,
	};
});
