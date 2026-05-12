import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { type ApiException, StatusCode } from "@/core/api/http-client.types";

export function useApiErrorHandler() {
	const handleApiError = <T extends FieldValues>(
		err: unknown,
		setError?: UseFormSetError<T>,
		defaultMessage = "Ocorreu um erro inesperado. Tente novamente.",
	) => {
		const apiException = err as ApiException;
		const { data, statusCode } = apiException;

		if (!apiException.data) {
			toast.error("Não foi possível conectar ao servidor.");
			return;
		}

		if (statusCode === StatusCode.validationError && data.errors && setError) {
			Object.entries(data.errors).forEach(([field, messages]) => {
				setError(field as Path<T>, {
					type: "server",
					message: messages[0],
				});
			});

			toast.error("Verifique os campos destacados no formulário.");
			return;
		}

		toast.error(data?.message || defaultMessage);
	};

	return { handleApiError };
}
