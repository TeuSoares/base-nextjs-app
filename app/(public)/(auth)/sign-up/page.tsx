"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common";
import { PasswordField, TextField } from "@/components/form";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { AuthFooterLink, AuthForm } from "@/features/auth/components";
import { useRegister } from "@/features/auth/hooks";
import {
	type RegisterInput,
	registerSchema,
} from "@/features/auth/schemas/register-schema";

export default function SignUpPage() {
	const { register, isPending } = useRegister();

	const form = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
			country_code: "BR",
		} as RegisterInput,
	});

	const { control, handleSubmit, setError } = form;

	const onSubmit = (data: RegisterInput) => register(data, setError);

	return (
		<AuthForm>
			<AuthForm.Header
				title="Crie sua conta"
				description="Preencha os dados abaixo para se cadastrar"
			/>

			<AuthForm.Form id="register-form" onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-4">
					<TextField
						name="name"
						control={control}
						label="Nome completo"
						placeholder="Ex: João Silva"
					/>

					<TextField
						name="email"
						control={control}
						label="E-mail"
						type="email"
						placeholder="joao@exemplo.com"
					/>

					<div className="grid md:grid-cols-2 gap-4">
						<PasswordField
							name="password"
							control={control}
							label="Senha"
							placeholder="Digite sua senha"
						/>

						<PasswordField
							name="password_confirmation"
							control={control}
							label="Confirmar Senha"
							placeholder="Repita a senha"
						/>
					</div>
				</div>
			</AuthForm.Form>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					loading={isPending}
					loadingText="Criando conta..."
					form="register-form"
					className="w-full"
				>
					Finalizar cadastro
				</ActionButton>

				<AuthFooterLink
					label="Já tem uma conta?"
					linkText="Faça login"
					href={AUTH_ROUTES.signIn}
				/>
			</AuthForm.Footer>
		</AuthForm>
	);
}
