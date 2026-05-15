"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/common";
import { PasswordField, TextField } from "@/components/form";
import { AUTH_ROUTES } from "@/core/config/constants/navigation";
import { AuthFooterLink, AuthForm } from "@/features/auth/components";
import { useRegister } from "@/features/auth/hooks/use-register";
import {
	createRegisterSchema,
	type RegisterInput,
} from "@/features/auth/schemas/register-schema";
import { useLanguage, useZodSchema } from "@/hooks";

export default function SignUpPage() {
	const t = useTranslations("Auth.signUp");
	const f = useTranslations("Auth.fields");

	const { locale } = useLanguage();

	const schema = useZodSchema(createRegisterSchema, "Auth.validation");

	const form = useForm<RegisterInput>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
			language: locale,
		} as RegisterInput,
	});

	useEffect(() => {
		form.setValue("language", locale);
	}, [locale, form]);

	const { control, handleSubmit, setError } = form;

	const { register, isPending } = useRegister();

	const onSubmit = (data: RegisterInput) => register(data, setError);

	return (
		<AuthForm>
			<AuthForm.Header title={t("title")} description={t("description")} />

			<AuthForm.Form id="register-form" onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-4">
					<TextField
						name="name"
						control={control}
						label={f("nameLabel")}
						placeholder={f("namePlaceholder")}
					/>

					<TextField
						name="email"
						control={control}
						label={f("emailLabel")}
						type="email"
						placeholder={f("emailPlaceholder")}
					/>

					<div className="grid md:grid-cols-2 gap-4">
						<PasswordField
							name="password"
							control={control}
							label={f("passwordLabel")}
							placeholder={f("passwordPlaceholder")}
						/>

						<PasswordField
							name="password_confirmation"
							control={control}
							label={f("confirmPasswordLabel")}
							placeholder={f("confirmPasswordPlaceholder")}
						/>
					</div>
				</div>
			</AuthForm.Form>

			<AuthForm.Footer>
				<ActionButton
					type="submit"
					loading={isPending}
					loadingText={t("loading")}
					form="register-form"
					className="w-full"
				>
					{t("submit")}
				</ActionButton>

				<AuthFooterLink
					label={t("alreadyHasAccount")}
					linkText={t("signInLink")}
					href={AUTH_ROUTES.signIn}
				/>
			</AuthForm.Footer>
		</AuthForm>
	);
}
