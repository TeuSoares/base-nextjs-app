import { z } from "zod";
import { EMAIL_REGEX } from "@/utils";

export const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.toLowerCase()
		.min(1, "O e-mail é obrigatório")
		.regex(EMAIL_REGEX, "E-mail inválido"),
	password: z.string().min(1, "A senha é obrigatória"),
});

export type LoginInput = z.input<typeof loginSchema>;
export type LoginOutput = z.output<typeof loginSchema>;
