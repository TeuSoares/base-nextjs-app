import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { useApiErrorHandler } from "@/hooks";
import type {
	UserPasswordInput,
	UserPasswordOutput,
} from "../schemas/update-user-schema";
import { userService } from "../services/user-service";

function useUpdatePasswordMutation() {
	return useMutation({
		mutationFn: (data: UserPasswordOutput) => userService.updatePassword(data),
	});
}

export function useUpdatePassword() {
	const { mutate, isPending } = useUpdatePasswordMutation();
	const { handleApiError } = useApiErrorHandler();
	const t = useTranslations("Profile");

	const updatePassword = (
		data: UserPasswordInput,
		setError: UseFormSetError<UserPasswordInput>,
		reset: () => void,
	) => {
		mutate(data as UserPasswordOutput, {
			onSuccess: () => {
				reset();
				toast.success(t("passwordSuccess"));
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { updatePassword, isPending };
}
