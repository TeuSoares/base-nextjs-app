import { z } from "zod";

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1, "Token inválido"),
		email: z.string().email("E-mail inválido"),
		password: z
			.string()
			.min(8, "A senha deve ter pelo menos 8 caracteres")
			.regex(/[a-zA-Z]/, "A senha deve conter letras")
			.regex(/[0-9]/, "A senha deve conter números")
			.regex(/[A-Z]/, "A senha deve conter letras maiúsculas")
			.regex(/[a-z]/, "A senha deve conter letras minúsculas"),
		password_confirmation: z.string().min(1, "Confirme sua nova senha"),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "As senhas não coincidem",
		path: ["password_confirmation"],
	});

export type ResetPasswordFormData = z.input<typeof resetPasswordSchema>;
export type ResetPasswordFormOutput = z.output<typeof resetPasswordSchema>;
