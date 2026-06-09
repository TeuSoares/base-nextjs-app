"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common/action-button";
import { PasswordField, TextField } from "@/components/form";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { AuthForm } from "@/features/auth/components";
import { useLogin } from "@/features/auth/hooks/use-login";
import {
	createLoginSchema,
	type LoginInput,
} from "@/features/auth/schemas/login-schema";
import { useZodSchema } from "@/hooks";

export default function SignInPage() {
	const f = useTranslations("Auth.fields");
	const t = useTranslations("Auth.signIn");

	const schema = useZodSchema(createLoginSchema, "Auth.validation");

	const form = useForm<LoginInput>({
		resolver: zodResolver(schema),
		defaultValues: { email: "", password: "" },
	});

	const { control, handleSubmit, setError } = form;

	const { login, isPending } = useLogin();

	const onSubmit = (data: LoginInput) => login(data, setError);

	return (
		<AuthForm>
			<AuthForm.Header title={t("title")} description={t("description")} />

			<AuthForm.Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
				<TextField
					name="email"
					control={control}
					label={f("emailLabel")}
					type="email"
					placeholder={f("emailPlaceholder")}
					autoComplete="email"
				/>

				<PasswordField
					name="password"
					control={control}
					label={f("passwordLabel")}
					placeholder={f("passwordPlaceholder")}
					rightLabel={
						<Link
							href={AUTH_ROUTES.forgotPassword}
							className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
						>
							{t("forgotPassword")}
						</Link>
					}
				/>
			</AuthForm.Form>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					loading={isPending}
					loadingText={t("loading")}
					form="login-form"
				>
					{t("submit")}
				</ActionButton>
			</AuthForm.Footer>
		</AuthForm>
	);
}
