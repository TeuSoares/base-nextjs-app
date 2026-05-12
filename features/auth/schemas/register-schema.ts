import { z } from "zod";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/core/i18n/constants";
import { EMAIL_REGEX, NAME_REGEX } from "@/utils";

export const registerSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(3, "O nome deve ter no mínimo 3 caracteres")
			.max(50, "O nome deve ter no máximo 50 caracteres")
			.regex(NAME_REGEX, "O nome deve conter apenas letras")
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
			.min(1, "O e-mail é obrigatório")
			.regex(EMAIL_REGEX, "E-mail inválido")
			.max(255),

		password: z
			.string()
			.min(10, "A senha deve ter no mínimo 10 caracteres")
			.max(100, "Senha muito longa"),

		password_confirmation: z.string().min(1, "Confirme sua senha"),

		language: z
			.string()
			.refine((val) => !val || !isSupportedLocale(val), {
				message: "Idioma não suportado",
			})
			.transform((val) => val || DEFAULT_LOCALE),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "As senhas não coincidem",
		path: ["password_confirmation"],
	});

export type RegisterInput = z.input<typeof registerSchema>;
export type RegisterOutput = z.output<typeof registerSchema>;
