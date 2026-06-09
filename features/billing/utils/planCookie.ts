import Cookies from "js-cookie";
import { PLANS, type Plan } from "@/core/config/constants/payment";

const COOKIE_NAME = "selected_plan";
const COOKIE_EXPIRES_IN_HOURS = 1 / 12; // 2 hours

export function setSelectedPlanCookie(plan: Plan): void {
	if (PLANS.includes(plan)) {
		Cookies.set(COOKIE_NAME, plan, { expires: COOKIE_EXPIRES_IN_HOURS });
	}
}

export function getValidSelectedPlan(): Plan | undefined {
	const cookiePlan = Cookies.get(COOKIE_NAME);

	if (cookiePlan && PLANS.includes(cookiePlan as Plan)) {
		return cookiePlan as Plan;
	}

	return undefined;
}

export function clearSelectedPlanCookie(): void {
	Cookies.remove(COOKIE_NAME);
}
