import {
	type ApiException,
	type HttpInternalError,
	type Request,
	StatusCode,
} from "./http-client.types";

export class HttpClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl.replace(/\/$/, "");
	}

	async request<T>(data: Request): Promise<T> {
		const controller = new AbortController();
		let timeoutId: ReturnType<typeof setTimeout> | null = null;

		if (data.timeout) {
			timeoutId = setTimeout(() => controller.abort(), data.timeout);
		}

		try {
			const fullUrl = data.url.startsWith("http")
				? data.url
				: `${this.baseUrl}${data.url.startsWith("/") ? data.url : `/${data.url}`}`;

			const urlWithParams = this.buildUrlWithParams(fullUrl, data.params);

			let body = data.body ?? undefined;

			const headers: Record<string, string> = { ...data.headers };

			if (body && !(body instanceof FormData)) {
				headers["Content-Type"] = "application/json";
				body = JSON.stringify(body);
			}

			const isBodyAllowed = !["GET", "HEAD"].includes(
				data.method.toUpperCase(),
			);
			const requestBody = isBodyAllowed ? (body as BodyInit) : undefined;

			const response = await fetch(urlWithParams, {
				method: data.method,
				headers,
				body: requestBody,
				cache: data.cache,
				credentials: data.credentials ?? "include",
				signal: controller.signal,
			});

			const contentType = response.headers.get("Content-Type") || "";
			let responseBody: unknown;

			if (!response.ok) {
				const errorBody = contentType.includes("application/json")
					? await response.json()
					: { message: await response.text() };

				throw {
					fullError: errorBody,
					status: response.status,
				};
			}

			if (contentType.includes("application/json")) {
				responseBody = await response.json();
			} else if (
				contentType.includes("application/pdf") ||
				contentType.includes("image/") ||
				contentType.includes("application/octet-stream") ||
				contentType.includes("application/zip")
			) {
				responseBody = await response.blob();
			} else {
				responseBody = await response.text();
			}

			return responseBody as T;
		} catch (error: unknown) {
			throw this.normalizeError(error);
		} finally {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		}
	}

	private buildUrlWithParams(
		url: string,
		params?: Record<string, string | number | boolean>,
	): string {
		if (!params) return url;
		const searchParams = new URLSearchParams();

		for (const [key, value] of Object.entries(params)) {
			searchParams.append(key, String(value));
		}

		return `${url}${url.includes("?") ? "&" : "?"}${searchParams.toString()}`;
	}

	private normalizeError(error: unknown): ApiException {
		if (error instanceof Error && error.name === "AbortError") {
			return {
				statusCode: StatusCode.requestTimeout,
				data: { message: "Errors.timeout" },
			};
		}

		if (this.isHttpInternalError(error)) {
			const { fullError, status } = error;

			if (typeof fullError === "string") {
				return {
					statusCode: status,
					data: { message: fullError },
				};
			}

			return {
				statusCode: status,
				data: {
					message: fullError.message,
					errors: fullError.errors,
				},
			};
		}

		return {
			statusCode: StatusCode.serverError,
			data: {
				message: error instanceof Error ? error.message : "Errors.connection",
			},
		};
	}

	private isHttpInternalError(error: unknown): error is HttpInternalError {
		return (
			typeof error === "object" &&
			error !== null &&
			"fullError" in error &&
			"status" in error
		);
	}
}
