import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { useApiErrorHandler } from "@/hooks";
import type {
	ForgotPasswordInput,
	ForgotPasswordOutput,
} from "../schemas/forgot-password-schema";
import { authService } from "../services/auth-service";

function useForgotPasswordMutation() {
	return useMutation({
		mutationFn: async (data: ForgotPasswordOutput) => {
			await authService.getCsrf();
			return authService.forgotPassword(data);
		},
	});
}

export function useForgotPassword() {
	const { mutate, isPending } = useForgotPasswordMutation();
	const { handleApiError } = useApiErrorHandler();
	const router = useRouter();

	const forgotPassword = (
		data: ForgotPasswordInput,
		setError: UseFormSetError<ForgotPasswordInput>,
	) => {
		mutate(data as ForgotPasswordOutput, {
			onSuccess: (response) => {
				toast.success(
					response.message || "Instruções enviadas para o seu e-mail",
				);
				router.push(AUTH_ROUTES.signIn);
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { forgotPassword, isPending };
}
