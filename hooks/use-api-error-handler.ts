import { useTranslations } from "next-intl";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { type ApiException, StatusCode } from "@/core/api/http-client.types";

type ErrorKeys = "unexpected" | "connection" | "validation" | "timeout";

export function useApiErrorHandler() {
	const t = useTranslations("Errors");

	const handleApiError = <T extends FieldValues>(
		err: unknown,
		setError?: UseFormSetError<T>,
		defaultMessage?: string,
	) => {
		const apiException = err as ApiException;
		const { data, statusCode } = apiException;

		if (!data) {
			toast.error(t("connection"));
			return;
		}

		if (statusCode === StatusCode.validationError && data.errors && setError) {
			Object.entries(data.errors).forEach(([field, messages]) => {
				setError(field as Path<T>, {
					type: "server",
					message: messages[0],
				});
			});

			toast.error(t("validation"));
			return;
		}

		const rawMessage = data.message || defaultMessage;
		let finalMessage: string;

		if (rawMessage?.startsWith("Errors.")) {
			const key = rawMessage.split(".")[1] as ErrorKeys;
			finalMessage = t(key);
		} else {
			finalMessage = rawMessage || t("unexpected");
		}

		toast.error(finalMessage);
	};

	return { handleApiError };
}
