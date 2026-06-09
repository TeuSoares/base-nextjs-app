import { z } from "zod";
import { PLANS } from "@/core/config/constants/payment";

export const createCheckoutSchema = () =>
	z.object({
		plan: z.enum(PLANS).optional(),
	});

type CheckoutSchema = ReturnType<typeof createCheckoutSchema>;

export type CheckoutInput = z.input<CheckoutSchema>;
export type CheckoutOutput = z.output<CheckoutSchema>;
