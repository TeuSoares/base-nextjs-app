"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ActionButton, FormCard, UserAvatar } from "@/components/common";
import { PasswordField, SelectField, TextField } from "@/components/form";
import { PageHeader } from "@/components/layout/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	DEFAULT_LOCALE,
	LANGUAGE_CONFIG,
	SUPPORTED_LOCALES,
} from "@/core/i18n/constants";
import { useUser } from "@/features/auth/hooks/use-user";
import { useUpdatePassword } from "@/features/profile/hooks/use-update-password";
import { useUpdateProfile } from "@/features/profile/hooks/use-update-profile";
import {
	createProfileInfoSchema,
	createProfilePasswordSchema,
	type ProfileInfoInput,
	type ProfilePasswordInput,
} from "@/features/profile/schemas/profile-schema";
import { useZodSchema } from "@/hooks";

export default function ProfilePage() {
	const { data: user } = useUser();
	const f = useTranslations("Auth.fields");
	const t = useTranslations("Profile");

	const infoSchema = useZodSchema(createProfileInfoSchema, "Auth.validation");
	const passwordSchema = useZodSchema(
		createProfilePasswordSchema,
		"Auth.validation",
	);

	const infoForm = useForm<ProfileInfoInput>({
		resolver: zodResolver(infoSchema),
		defaultValues: {
			name: user?.name ?? "",
			email: user?.email ?? "",
			language: user?.language ?? DEFAULT_LOCALE,
		},
	});

	const passwordForm = useForm<ProfilePasswordInput>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			current_password: "",
			password: "",
			password_confirmation: "",
		},
	});

	const { updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
	const { updatePassword, isPending: isUpdatingPassword } = useUpdatePassword();

	const onSubmitInfo = (data: ProfileInfoInput) =>
		updateProfile(data, infoForm.setError);

	const onSubmitPassword = (data: ProfilePasswordInput) =>
		updatePassword(data, passwordForm.setError, passwordForm.reset);

	return (
		<>
			<PageHeader title={t("title")} />
			<div className="flex flex-1 justify-center p-6">
				<div className="w-full max-w-2xl">
					<Tabs defaultValue="profile">
						<FormCard>
							<FormCard.Header title="">
								{user && (
									<UserAvatar
										name={user.name}
										email={user.email}
										avatarUrl={user.avatarUrl}
										showInfo
										infoSize="lg"
										className="h-16 w-16"
										fallbackClassName="text-lg"
									/>
								)}
								<TabsList className="w-full mt-4">
									<TabsTrigger value="profile" className="flex-1">
										{t("tabProfile")}
									</TabsTrigger>
									<TabsTrigger value="security" className="flex-1">
										{t("tabSecurity")}
									</TabsTrigger>
								</TabsList>
							</FormCard.Header>

							<TabsContent value="profile">
								<FormCard.Form
									id="profile-info-form"
									onSubmit={infoForm.handleSubmit(onSubmitInfo)}
								>
									<TextField
										name="name"
										control={infoForm.control}
										label={f("nameLabel")}
										placeholder={f("namePlaceholder")}
										autoComplete="name"
										required
									/>
									<TextField
										name="email"
										control={infoForm.control}
										label={f("emailLabel")}
										type="email"
										placeholder={f("emailPlaceholder")}
										autoComplete="email"
										required
									/>
									<SelectField
										name="language"
										control={infoForm.control}
										label={t("languageLabel")}
										options={SUPPORTED_LOCALES.map((locale) => ({
											value: locale,
											label: `${LANGUAGE_CONFIG[locale].flag} ${LANGUAGE_CONFIG[locale].label}`,
										}))}
										required
									/>
								</FormCard.Form>
								<FormCard.Footer>
									<ActionButton
										type="submit"
										form="profile-info-form"
										loading={isUpdatingProfile}
										loadingText={t("saving")}
									>
										{t("save")}
									</ActionButton>
								</FormCard.Footer>
							</TabsContent>

							<TabsContent value="security">
								<FormCard.Form
									id="profile-password-form"
									onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
								>
									<PasswordField
										name="current_password"
										control={passwordForm.control}
										label={f("currentPasswordLabel")}
										placeholder={f("currentPasswordPlaceholder")}
										autoComplete="current-password"
										required
									/>
									<PasswordField
										name="password"
										control={passwordForm.control}
										label={f("newPasswordLabel")}
										placeholder={f("newPasswordPlaceholder")}
										autoComplete="new-password"
										required
									/>
									<PasswordField
										name="password_confirmation"
										control={passwordForm.control}
										label={f("confirmNewPasswordLabel")}
										placeholder={f("confirmNewPasswordPlaceholder")}
										autoComplete="new-password"
										required
									/>
								</FormCard.Form>
								<FormCard.Footer>
									<ActionButton
										type="submit"
										form="profile-password-form"
										loading={isUpdatingPassword}
										loadingText={t("saving")}
									>
										{t("savePassword")}
									</ActionButton>
								</FormCard.Footer>
							</TabsContent>
						</FormCard>
					</Tabs>
				</div>
			</div>
		</>
	);
}
