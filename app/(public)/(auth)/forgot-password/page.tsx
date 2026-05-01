"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ActionButton } from "@/components/common";
import { TextField } from "@/components/form";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { AuthFooterLink } from "@/features/auth/components/auth-footer-link";
import AuthForm from "@/features/auth/components/auth-form";
import {
	type ForgotPasswordFormData,
	forgotPasswordSchema,
} from "@/features/auth/schemas/forgot-password-schema";

export default function ForgotPasswordPage() {
	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	async function onSubmit(data: ForgotPasswordFormData) {
		try {
			// Simulação da chamada ao Laravel
			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success(
				"Se o e-mail existir em nossa base, você receberá um link de recuperação.",
			);
			form.reset();
		} catch (error) {
			toast.error("Ocorreu um erro ao processar sua solicitação.");
		}
	}

	return (
		<AuthForm>
			<AuthForm.Header
				title="Esqueceu a senha?"
				description="Digite seu e-mail e enviaremos as instruções para você criar uma nova senha."
			/>

			<AuthForm.Content>
				<form
					id="forgot-password-form"
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<TextField
						name="email"
						control={control}
						label="E-mail cadastrado"
						type="email"
						placeholder="joao@exemplo.com"
					/>
				</form>
			</AuthForm.Content>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					form="forgot-password-form"
					loading={isSubmitting}
					loadingText="Enviando instruções..."
					className="w-full h-10 font-semibold"
				>
					Enviar link de recuperação
				</ActionButton>

				<AuthFooterLink
					label="Lembrou a senha?"
					linkText="Voltar para o login"
					href={AUTH_ROUTES.signIn}
				/>
			</AuthForm.Footer>
		</AuthForm>
	);
}
