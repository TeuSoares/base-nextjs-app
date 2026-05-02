import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { useApiErrorHandler } from "@/hooks";
import type {
	ResetPasswordInput,
	ResetPasswordOutput,
} from "../schemas/reset-password-schema";
import { authService } from "../services/auth-service";

function useResetPasswordMutation() {
	return useMutation({
		mutationFn: async (data: ResetPasswordOutput) =>
			authService.resetPassword(data),
	});
}

export function useResetPassword() {
	const { mutate, isPending } = useResetPasswordMutation();
	const { handleApiError } = useApiErrorHandler();
	const router = useRouter();

	const resetPassword = (
		data: ResetPasswordInput,
		setError: UseFormSetError<ResetPasswordInput>,
	) => {
		mutate(data as ResetPasswordOutput, {
			onSuccess: (response) => {
				toast.success(response.message || "Senha redefinida com sucesso!");
				router.push("/sign-in");
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { resetPassword, isPending };
}
