import type { TranslationValues } from "next-intl";
import { z } from "zod";
import { EMAIL_REGEX } from "@/utils";

type TranslationFn = (key: string, values?: TranslationValues) => string;

export const createResetPasswordSchema = (
	v: TranslationFn,
	av: TranslationFn,
) =>
	z
		.object({
			token: z.string().min(1, av("tokenInvalid")),
			email: z
				.string()
				.min(1, av("emailRequired"))
				.regex(EMAIL_REGEX, av("emailInvalid"))
				.trim()
				.toLowerCase(),
			password: z
				.string()
				.min(10, av("passwordMin", { min: 10 }))
				.max(100, av("passwordMax")),
			password_confirmation: z.string().min(1, v("fieldRequired")),
		})
		.refine((data) => data.password === data.password_confirmation, {
			message: av("passwordsMustMatch"),
			path: ["password_confirmation"],
		});

type ResetPasswordSchema = ReturnType<typeof createResetPasswordSchema>;

export type ResetPasswordInput = z.input<ResetPasswordSchema>;
export type ResetPasswordOutput = z.output<ResetPasswordSchema>;
