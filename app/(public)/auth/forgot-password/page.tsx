"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common";
import { TextField } from "@/components/form";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { AuthFooterLink, AuthForm } from "@/features/auth/components";
import { useForgotPassword } from "@/features/auth/hooks/use-forgot-password";
import {
	createForgotPasswordSchema,
	type ForgotPasswordInput,
} from "@/features/auth/schemas/forgot-password-schema";
import { useZodSchema } from "@/hooks";

export default function ForgotPasswordPage() {
	const t = useTranslations("Auth.forgotPassword");
	const f = useTranslations("Auth.fields");

	const schema = useZodSchema(createForgotPasswordSchema, "Auth.validation");

	const form = useForm<ForgotPasswordInput>({
		resolver: zodResolver(schema),
		defaultValues: { email: "" },
	});

	const { control, handleSubmit, setError } = form;

	const { forgotPassword, isPending } = useForgotPassword();

	const onSubmit = (data: ForgotPasswordInput) =>
		forgotPassword(data, setError);

	return (
		<AuthForm>
			<AuthForm.Header title={t("title")} description={t("description")} />

			<AuthForm.Form
				id="forgot-password-form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<TextField
					name="email"
					control={control}
					label={f("emailRegisteredLabel")}
					type="email"
					placeholder={f("emailPlaceholder")}
				/>
			</AuthForm.Form>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					form="forgot-password-form"
					loading={isPending}
					loadingText={t("loading")}
				>
					{t("submit")}
				</ActionButton>

				<AuthFooterLink
					label={t("rememberedPassword")}
					linkText={t("backToLogin")}
					href={AUTH_ROUTES.signIn}
				/>
			</AuthForm.Footer>
		</AuthForm>
	);
}
