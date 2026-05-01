import { getCookie } from "@/utils";
import { BASE_API_URL } from "../config/env";
import { HttpClient } from "./http-client";

export const api = new HttpClient(BASE_API_URL);

export const getApiHeaders = (extraHeaders?: Record<string, string>) => ({
	"X-XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
	Accept: "application/json",
	...extraHeaders,
});
