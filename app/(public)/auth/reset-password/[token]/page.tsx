"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common";
import { PasswordField } from "@/components/form";
import { AuthForm } from "@/features/auth/components";
import { useResetPassword } from "@/features/auth/hooks/use-reset-password";
import {
	createResetPasswordSchema,
	type ResetPasswordInput,
} from "@/features/auth/schemas/reset-password-schema";
import { useZodSchema } from "@/hooks";

export default function ResetPasswordPage() {
	const t = useTranslations("Auth.resetPassword");
	const f = useTranslations("Auth.fields");

	const params = useParams();
	const searchParams = useSearchParams();
	const router = useRouter();

	const token = params.token as string;
	const email = searchParams.get("email") || "";

	const schema = useZodSchema(createResetPasswordSchema, "Auth.validation");

	const form = useForm<ResetPasswordInput>({
		resolver: zodResolver(schema),
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

	const { resetPassword, isPending } = useResetPassword();

	const onSubmit = (data: ResetPasswordInput) => resetPassword(data, setError);

	if (!token || !email) return null;

	return (
		<AuthForm>
			<AuthForm.Header title={t("title")} description={t("description")} />

			<AuthForm.Form id="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
				<PasswordField
					name="password"
					control={control}
					label={f("newPasswordLabel")}
					placeholder={f("newPasswordPlaceholder")}
				/>

				<PasswordField
					name="password_confirmation"
					control={control}
					label={f("confirmNewPasswordLabel")}
					placeholder={f("confirmNewPasswordPlaceholder")}
				/>
			</AuthForm.Form>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					form="reset-password-form"
					loading={isPending}
					loadingText={t("loading")}
				>
					{t("submit")}
				</ActionButton>
			</AuthForm.Footer>
		</AuthForm>
	);
}
