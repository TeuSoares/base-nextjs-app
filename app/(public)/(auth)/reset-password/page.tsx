"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ActionButton } from "@/components/common";
import { TextField } from "@/components/form";
import AuthForm from "@/features/auth/components/auth-form";
import {
	type ResetPasswordFormData,
	resetPasswordSchema,
} from "@/features/auth/schemas/reset-password-schema";

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();

	// O Laravel envia o token na URL e muitas vezes o email também
	const token = searchParams.get("token") || "";
	const email = searchParams.get("email") || "";

	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			token: token,
			email: email,
			password: "",
			password_confirmation: "",
		},
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	async function onSubmit(data: ResetPasswordFormData) {
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			// Aqui você enviaria para sua rota Laravel: Route::post('/reset-password', ...)
			toast.success("Senha redefinida com sucesso! Você já pode fazer login.");
		} catch (error) {
			toast.error("Erro ao redefinir senha. O link pode ter expirado.");
		}
	}

	return (
		<AuthForm>
			<AuthForm.Header
				title="Redefinir senha"
				description="Escolha uma nova senha forte para sua conta."
			/>

			<AuthForm.Content>
				<form
					id="reset-password-form"
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<input type="hidden" {...control.register("token")} />

					<TextField
						name="email"
						control={control}
						label="E-mail"
						type="email"
						placeholder="seu@email.com"
						readOnly
					/>

					<TextField
						name="password"
						control={control}
						label="Nova Senha"
						type="password"
						placeholder="********"
					/>

					<TextField
						name="password_confirmation"
						control={control}
						label="Confirmar Nova Senha"
						type="password"
						placeholder="********"
					/>
				</form>
			</AuthForm.Content>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					form="reset-password-form"
					loading={isSubmitting}
					loadingText="Atualizando senha..."
					className="w-full h-10 font-semibold"
				>
					Redefinir Senha
				</ActionButton>
			</AuthForm.Footer>
		</AuthForm>
	);
}
