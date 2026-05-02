"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common";
import { TextField } from "@/components/form";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { AuthFooterLink, AuthForm } from "@/features/auth/components";
import { useForgotPassword } from "@/features/auth/hooks";
import {
	type ForgotPasswordInput,
	forgotPasswordSchema,
} from "@/features/auth/schemas/forgot-password-schema";

export default function ForgotPasswordPage() {
	const { forgotPassword, isPending } = useForgotPassword();

	const form = useForm<ForgotPasswordInput>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: { email: "" },
	});

	const { control, handleSubmit, setError } = form;

	const onSubmit = (data: ForgotPasswordInput) =>
		forgotPassword(data, setError);

	return (
		<AuthForm>
			<AuthForm.Header
				title="Esqueceu a senha?"
				description="Digite seu e-mail e enviaremos as instruções para você criar uma nova senha."
			/>

			<AuthForm.Form
				id="forgot-password-form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<TextField
					name="email"
					control={control}
					label="E-mail cadastrado"
					type="email"
					placeholder="joao@exemplo.com"
				/>
			</AuthForm.Form>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					form="forgot-password-form"
					loading={isPending}
					loadingText="Enviando instruções..."
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
