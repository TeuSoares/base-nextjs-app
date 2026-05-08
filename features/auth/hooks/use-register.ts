import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { APP_ROUTES } from "@/core/config/constants/navigation";
import { useApiErrorHandler } from "@/hooks";
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
	const router = useRouter();

	const register = (
		data: RegisterInput,
		setError: UseFormSetError<RegisterInput>,
	) => {
		mutate(data as RegisterOutput, {
			onSuccess: (response) => {
				const userName = response?.data?.name ?? "usuário";
				toast.success(`Bem-vindo, ${userName}! Sua conta foi criada.`);
				router.push(APP_ROUTES.dashboard);
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { register, isPending };
}
