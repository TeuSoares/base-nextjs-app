import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { authService } from "../services/auth-service";

function useLogoutMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			return authService.logout();
		},
		onSuccess: () => {
			queryClient.clear();
		},
	});
}

export function useLogout() {
	const t = useTranslations("Common.notifications");
	const { mutate, isPending } = useLogoutMutation();
	const router = useRouter();

	const logout = () => {
		mutate(undefined, {
			onSuccess: () => {
				router.push(AUTH_ROUTES.signIn);
				router.refresh();
			},
			onError: () => {
				toast.error(t("logoutError"));
			},
		});
	};

	return { logout, isPending };
}
