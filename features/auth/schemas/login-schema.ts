import type { TranslationValues } from "next-intl";
import { z } from "zod";
import { EMAIL_REGEX } from "@/utils";

type TranslationFn = (key: string, values?: TranslationValues) => string;

export const createLoginSchema = (v: TranslationFn, av: TranslationFn) =>
	z.object({
		email: z
			.string()
			.trim()
			.toLowerCase()
			.min(1, av("emailRequired"))
			.regex(EMAIL_REGEX, av("emailInvalid")),
		password: z.string().min(1, v("fieldRequired")),
	});

type LoginSchema = ReturnType<typeof createLoginSchema>;

export type LoginInput = z.input<LoginSchema>;
export type LoginOutput = z.output<LoginSchema>;
