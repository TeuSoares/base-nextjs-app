import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import { APP_ROUTES } from "@/core/config/constants/navigation";
import { useApiErrorHandler } from "@/hooks";
import type { LoginInput, LoginOutput } from "../schemas/login-schema";
import { authService } from "../services/auth-service";

function useLoginMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: LoginOutput) => {
			await authService.getCsrf();
			return authService.login(data);
		},
		onSuccess: (response) => {
			queryClient.setQueryData(["user"], response.data);
		},
	});
}

export function useLogin() {
	const { mutate, isPending } = useLoginMutation();
	const { handleApiError } = useApiErrorHandler();
	const router = useRouter();

	const login = (data: LoginInput, setError: UseFormSetError<LoginInput>) => {
		mutate(data as LoginOutput, {
			onSuccess: () => {
				router.push(APP_ROUTES.dashboard);
				router.refresh();
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { login, isPending };
}
