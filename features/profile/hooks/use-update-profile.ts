import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { useApiErrorHandler } from "@/hooks";
import { useLanguage } from "@/hooks/use-language";
import type {
	ProfileInfoInput,
	ProfileInfoOutput,
} from "../schemas/profile-schema";
import { profileService } from "../services/profile-service";

function useUpdateProfileMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ProfileInfoOutput) => profileService.updateProfile(data),
		onSuccess: (response) => {
			queryClient.setQueryData(["user"], response);
		},
	});
}

export function useUpdateProfile() {
	const { mutate, isPending } = useUpdateProfileMutation();
	const { handleApiError } = useApiErrorHandler();
	const { setLanguage } = useLanguage();
	const t = useTranslations("Profile");

	const updateProfile = (
		data: ProfileInfoInput,
		setError: UseFormSetError<ProfileInfoInput>,
	) => {
		mutate(data as ProfileInfoOutput, {
			onSuccess: () => {
				toast.success(t("updateSuccess"));
				setLanguage(data.language);
			},
			onError: (err) => handleApiError(err, setError),
		});
	};

	return { updateProfile, isPending };
}
