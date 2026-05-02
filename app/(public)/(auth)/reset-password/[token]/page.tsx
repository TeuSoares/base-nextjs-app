"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common";
import { PasswordField } from "@/components/form";
import { AuthForm } from "@/features/auth/components";
import {
	type ResetPasswordInput,
	resetPasswordSchema,
} from "@/features/auth/schemas/reset-password-schema";
import { useResetPassword } from "../../../../../features/auth/hooks";

export default function ResetPasswordPage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const router = useRouter();

	const token = params.token as string;
	const email = searchParams.get("email") || "";

	const { resetPassword, isPending } = useResetPassword();

	const form = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			token: token,
			email: email,
			password: "",
			password_confirmation: "",
		},
	});

	const { control, handleSubmit, setError, setValue } = form;

	useEffect(() => {
		if (!token || !email) router.replace("/sign-in");
	}, [token, email, router]);

	useEffect(() => {
		setValue("token", token);
		setValue("email", email);
	}, [token, email, setValue]);

	const onSubmit = (data: ResetPasswordInput) => resetPassword(data, setError);

	if (!token || !email) return null;

	return (
		<AuthForm>
			<AuthForm.Header
				title="Redefinir senha"
				description="Escolha uma nova senha para sua conta."
			/>

			<AuthForm.Form id="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
				<PasswordField
					name="password"
					control={control}
					label="Nova Senha"
					placeholder="Digite sua nova senha"
				/>

				<PasswordField
					name="password_confirmation"
					control={control}
					label="Confirmar Nova Senha"
					placeholder="Repita a nova senha"
				/>
			</AuthForm.Form>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					form="reset-password-form"
					loading={isPending}
					loadingText="Atualizando senha..."
				>
					Redefinir Senha
				</ActionButton>
			</AuthForm.Footer>
		</AuthForm>
	);
}
