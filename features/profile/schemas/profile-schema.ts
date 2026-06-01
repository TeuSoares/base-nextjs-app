import type { TranslationValues } from "next-intl";
import { z } from "zod";
import { isSupportedLocale } from "@/core/i18n/constants";
import { EMAIL_REGEX, NAME_REGEX } from "@/utils";

type TranslationFn = (key: string, values?: TranslationValues) => string;

export const createProfileInfoSchema = (v: TranslationFn, av: TranslationFn) =>
	z.object({
		name: z
			.string()
			.trim()
			.min(3, av("nameMin", { min: 3 }))
			.max(100, av("nameMax", { max: 100 }))
			.regex(NAME_REGEX, av("nameInvalid")),
		email: z
			.string()
			.trim()
			.toLowerCase()
			.min(1, av("emailRequired"))
			.regex(EMAIL_REGEX, av("emailInvalid"))
			.max(255),
		language: z.string().refine((val) => isSupportedLocale(val), {
			message: v("languageInvalid"),
		}),
	});

export const createProfilePasswordSchema = (
	v: TranslationFn,
	av: TranslationFn,
) =>
	z
		.object({
			current_password: z.string().min(1, v("fieldRequired")),
			password: z
				.string()
				.min(10, av("passwordMin", { min: 10 }))
				.max(100, av("passwordMax")),
			password_confirmation: z.string().min(1, v("fieldRequired")),
		})
		.refine((data) => data.password === data.password_confirmation, {
			message: v("passwordsMustMatch"),
			path: ["password_confirmation"],
		});

type ProfileInfoSchema = ReturnType<typeof createProfileInfoSchema>;
type ProfilePasswordSchema = ReturnType<typeof createProfilePasswordSchema>;

export type ProfileInfoInput = z.input<ProfileInfoSchema>;
export type ProfileInfoOutput = z.output<ProfileInfoSchema>;
export type ProfilePasswordInput = z.input<ProfilePasswordSchema>;
export type ProfilePasswordOutput = z.output<ProfilePasswordSchema>;
