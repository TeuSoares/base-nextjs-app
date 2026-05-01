"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common/action-button";
import { PasswordField, TextField } from "@/components/form";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { AuthFooterLink, AuthForm } from "@/features/auth/components";
import { useLogin } from "@/features/auth/hooks";
import {
	type LoginInput,
	loginSchema,
} from "@/features/auth/schemas/login-schema";

export default function SignInPage() {
	const { login, isPending } = useLogin();

	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const { control, handleSubmit, setError } = form;

	const onSubmit = (data: LoginInput) => login(data, setError);

	return (
		<AuthForm>
			<AuthForm.Header
				title="Faça login na sua conta"
				description="Insira suas credenciais para acessar a plataforma"
			/>

			<AuthForm.Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
				<TextField
					name="email"
					control={control}
					label="E-mail"
					type="email"
					placeholder="nome@exemplo.com"
					autoComplete="email"
				/>

				<PasswordField
					name="password"
					control={control}
					label="Senha"
					placeholder="Digite sua senha"
					rightLabel={
						<Link
							href={AUTH_ROUTES.forgotPassword}
							className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
						>
							Esqueceu a senha?
						</Link>
					}
				/>
			</AuthForm.Form>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					loading={isPending}
					loadingText="Autenticando..."
					form="login-form"
				>
					Entrar na plataforma
				</ActionButton>

				<AuthFooterLink
					label="Ainda não tem conta?"
					linkText="Cadastre-se"
					href={AUTH_ROUTES.signUp}
				/>
			</AuthForm.Footer>
		</AuthForm>
	);
}
