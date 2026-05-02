import { z } from "zod";
import { EMAIL_REGEX } from "@/utils";

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.trim()
		.toLowerCase()
		.min(1, "O e-mail é obrigatório")
		.regex(EMAIL_REGEX, "E-mail inválido"),
});

export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>;
export type ForgotPasswordOutput = z.output<typeof forgotPasswordSchema>;
