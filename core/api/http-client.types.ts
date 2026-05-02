export type RequestCache =
	| "default"
	| "force-cache"
	| "no-cache"
	| "no-store"
	| "only-if-cached"
	| "reload";

export enum StatusCode {
	ok = 200,
	noContent = 204,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	notFound = 404,
	conflict = 409,
	requestTimeout = 408,
	serverError = 500,
	networkError = 0,
	validationError = 422,
}

export type Method =
	| "GET"
	| "POST"
	| "PUT"
	| "PATCH"
	| "DELETE"
	| "get"
	| "post"
	| "put"
	| "patch"
	| "delete";

export type Request = {
	url: string;
	method: Method;
	body?: unknown;
	params?: Record<string, string | number | boolean>;
	headers?: Record<string, string>;
	timeout?: number;
	cache?: RequestCache;
	credentials?: RequestCredentials;
};

export type ApiErrorResponse = {
	message: string;
	errors?: Record<string, string[]>;
};

export interface HttpInternalError {
	fullError: ApiErrorResponse | string;
	status: number;
}

export type ApiException = {
	data: ApiErrorResponse;
	statusCode: number;
};

export interface ApiResponse<T = void> {
	data?: T;
	message?: string;
}
