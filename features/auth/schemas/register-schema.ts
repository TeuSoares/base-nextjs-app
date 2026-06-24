import type { TranslationValues } from "next-intl";
import { z } from "zod";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/core/i18n/constants";
import { EMAIL_REGEX, NAME_REGEX } from "@/utils";

type TranslationFn = (key: string, values?: TranslationValues) => string;

export const createRegisterSchema = (v: TranslationFn, av: TranslationFn) =>
	z
		.object({
			name: z
				.string()
				.trim()
				.min(3, av("nameMin", { min: 3 }))
				.max(50, av("nameMax", { max: 50 }))
				.regex(NAME_REGEX, av("nameInvalid"))
				.transform((name) =>
					name
						.split(/\s+/)
						.filter((word) => word.length > 0)
						.map((word) =>
							word[0]
								.toLocaleUpperCase()
								.concat(word.substring(1).toLocaleLowerCase()),
						)
						.join(" "),
				),

			email: z
				.string()
				.trim()
				.toLowerCase()
				.min(1, av("emailRequired"))
				.regex(EMAIL_REGEX, av("emailInvalid"))
				.max(255),

			password: z
				.string()
				.min(10, av("passwordMin", { min: 10 }))
				.max(100, av("passwordMax")),

			password_confirmation: z.string().min(1, v("fieldRequired")),

			language: z
				.string()
				.refine((val) => !val || isSupportedLocale(val), {
					message: v("languageInvalid"),
				})
				.transform(
					(val) => val?.replace("-", "_") || DEFAULT_LOCALE.replace("-", "_"),
				),
		})
		.refine((data) => data.password === data.password_confirmation, {
			message: v("passwordsMustMatch"),
			path: ["password_confirmation"],
		});

type RegisterSchema = ReturnType<typeof createRegisterSchema>;

export type RegisterInput = z.input<RegisterSchema>;
export type RegisterOutput = z.output<RegisterSchema>;
