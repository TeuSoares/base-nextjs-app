import { z } from "zod";
import { EMAIL_REGEX } from "../../../utils";

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1, "Token inválido"),
		email: z
			.string()
			.min(1, "O e-mail é obrigatório")
			.regex(EMAIL_REGEX, "E-mail inválido")
			.trim()
			.toLowerCase(),
		password: z
			.string()
			.min(10, "A senha deve ter no mínimo 10 caracteres")
			.max(100, "Senha muito longa"),
		password_confirmation: z.string().min(1, "Confirme sua senha"),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "As senhas não coincidem",
		path: ["password_confirmation"],
	});

export type ResetPasswordInput = z.input<typeof resetPasswordSchema>;
export type ResetPasswordOutput = z.output<typeof resetPasswordSchema>;
