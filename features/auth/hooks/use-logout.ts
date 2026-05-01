import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
	const { mutate, isPending } = useLogoutMutation();
	const router = useRouter();

	const logout = () => {
		mutate(undefined, {
			onSuccess: () => {
				router.push(AUTH_ROUTES.signIn);
			},
			onError: () => {
				toast.error("Erro ao encerrar sessão. Tente novamente.");
			},
		});
	};

	return { logout, isPending };
}
