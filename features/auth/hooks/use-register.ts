import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";
import type { Plans } from "@/core/config/constants/payment";
import { useApiErrorHandler } from "@/hooks";
import { useCheckout } from "../../billing/hooks/use-checkout";
import type { RegisterInput, RegisterOutput } from "../schemas/register-schema";
import { authService } from "../services/auth-service";

function useRegisterMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: RegisterOutput) => {
			await authService.getCsrf();
			return authService.register(data);
		},
		onSuccess: (response) => {
			queryClient.setQueryData(["user"], response.data);
		},
	});
}

export function useRegister() {
	const { mutate, isPending } = useRegisterMutation();
	const { handleApiError } = useApiErrorHandler();
	const { checkout } = useCheckout();

	const register = (
		data: RegisterInput,
		setError: UseFormSetError<RegisterInput>,
		plan?: Plans,
	) => {
		mutate(data as RegisterOutput, {
			onSuccess: () => {
				checkout({ plan });
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { register, isPending };
}
