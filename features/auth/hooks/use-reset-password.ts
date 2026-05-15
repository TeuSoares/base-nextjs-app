import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
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
	const t = useTranslations("Auth.resetPassword");
	const { mutate, isPending } = useResetPasswordMutation();
	const { handleApiError } = useApiErrorHandler();
	const router = useRouter();

	const resetPassword = (
		data: ResetPasswordInput,
		setError: UseFormSetError<ResetPasswordInput>,
	) => {
		mutate(data as ResetPasswordOutput, {
			onSuccess: (response) => {
				toast.success(response.message || t("success"));
				router.push(AUTH_ROUTES.signIn);
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { resetPassword, isPending };
}
