import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { useApiErrorHandler } from "@/hooks";
import type {
	ProfilePasswordInput,
	ProfilePasswordOutput,
} from "../schemas/profile-schema";
import { profileService } from "../services/profile-service";

function useUpdatePasswordMutation() {
	return useMutation({
		mutationFn: (data: ProfilePasswordOutput) =>
			profileService.updatePassword(data),
	});
}

export function useUpdatePassword() {
	const { mutate, isPending } = useUpdatePasswordMutation();
	const { handleApiError } = useApiErrorHandler();
	const t = useTranslations("Profile");

	const updatePassword = (
		data: ProfilePasswordInput,
		setError: UseFormSetError<ProfilePasswordInput>,
		reset: () => void,
	) => {
		mutate(data as ProfilePasswordOutput, {
			onSuccess: () => {
				reset();
				toast.success(t("passwordSuccess"));
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { updatePassword, isPending };
}
