import type { TranslationValues } from "next-intl";
import { z } from "zod";
import { EMAIL_REGEX } from "@/utils";

type TranslationFn = (key: string, values?: TranslationValues) => string;

export const createForgotPasswordSchema = (
	_v: TranslationFn,
	av: TranslationFn,
) =>
	z.object({
		email: z
			.string()
			.trim()
			.toLowerCase()
			.min(1, av("emailRequired"))
			.regex(EMAIL_REGEX, av("emailInvalid")),
	});

type ForgotPasswordSchema = ReturnType<typeof createForgotPasswordSchema>;

export type ForgotPasswordInput = z.input<ForgotPasswordSchema>;
export type ForgotPasswordOutput = z.output<ForgotPasswordSchema>;
