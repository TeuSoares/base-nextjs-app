import Cookies from "js-cookie";
import { PLANS, type Plans } from "@/core/config/constants/payment";

const COOKIE_NAME = "selected_plan";
const COOKIE_EXPIRES_IN_HOURS = 1 / 12; // 2 hours

export function setSelectedPlanCookie(plan: Plans): void {
	if (PLANS.includes(plan)) {
		Cookies.set(COOKIE_NAME, plan, { expires: COOKIE_EXPIRES_IN_HOURS });
	}
}

export function getValidSelectedPlan(): Plans | undefined {
	const cookiePlan = Cookies.get(COOKIE_NAME);

	if (cookiePlan && PLANS.includes(cookiePlan as Plans)) {
		return cookiePlan as Plans;
	}

	return undefined;
}

export function clearSelectedPlanCookie(): void {
	Cookies.remove(COOKIE_NAME);
}
