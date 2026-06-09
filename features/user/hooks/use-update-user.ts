import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { useApiErrorHandler } from "@/hooks";
import { useLanguage } from "@/hooks/use-language";
import type {
	UserInfoInput,
	UserInfoOutput,
} from "../schemas/update-user-schema";
import { userService } from "../services/user-service";

function useUpdateUserMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UserInfoOutput) => userService.updateUser(data),
		onSuccess: (response) => {
			queryClient.setQueryData(["user"], response);
		},
	});
}

export function useUpdateUser() {
	const { mutate, isPending } = useUpdateUserMutation();
	const { handleApiError } = useApiErrorHandler();
	const { setLanguage } = useLanguage();
	const t = useTranslations("Profile");

	const updateUser = (
		data: UserInfoInput,
		setError: UseFormSetError<UserInfoInput>,
	) => {
		mutate(data as UserInfoOutput, {
			onSuccess: () => {
				toast.success(t("updateSuccess"));
				setLanguage(data.language);
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { updateUser, isPending };
}
