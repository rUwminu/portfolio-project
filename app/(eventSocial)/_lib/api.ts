/**
 * Shared fetch wrapper for the eventSocial API.
 *
 * All calls go through the Next.js rewrite proxy (`/api/*` → Nest on :5000).
 * Auth is via `Authorization: Bearer <token>` (see ./token) rather than the
 * better-auth session cookie, since users frequently reject cookies. Nest
 * endpoints wrap responses in `{ statusCode, message, data }` — that envelope
 * is unwrapped here; better-auth endpoints return raw JSON and pass through
 * untouched.
 */

import { getToken } from "./token";

export interface ValidationIssue {
  property: string;
  message: string;
}

export class ApiError extends Error {
  readonly status: number;
  /** Field-level validation errors (400s); empty for other failures. */
  readonly issues: ValidationIssue[];

  constructor(status: number, message: string, issues: ValidationIssue[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.issues = issues;
  }

  /** issues keyed by field, for mapping onto form inputs. */
  get fieldErrors(): Record<string, string> {
    return Object.fromEntries(this.issues.map((i) => [i.property, i.message]));
  }
}

type QueryValue = string | number | boolean | undefined;

export interface ApiOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
}

const buildQueryString = (query: Record<string, QueryValue>): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === "") continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
};

const parseError = (status: number, payload: unknown): ApiError => {
  if (status === 429) {
    return new ApiError(status, "Too many requests — slow down and try again.");
  }

  if (payload && typeof payload === "object") {
    const { message } = payload as { message?: unknown };

    // Nest validation errors: message is [{ property, message }]
    if (Array.isArray(message)) {
      const issues = message.filter(
        (m): m is ValidationIssue =>
          !!m && typeof m === "object" && "property" in m && "message" in m
      );
      const summary =
        issues.map((i) => i.message).join("; ") || "Validation failed";
      return new ApiError(status, summary, issues);
    }

    if (typeof message === "string" && message) {
      return new ApiError(status, message);
    }
  }

  return new ApiError(status, `Request failed (${status})`);
};

export const apiFetch = async <T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> => {
  const { method = "GET", body, query, signal } = options;
  const url = query ? `${path}${buildQueryString(query)}` : path;

  const token = getToken();
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: Object.keys(headers).length ? headers : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new ApiError(0, "Network error — is the API server running?");
  }

  const payload: unknown =
    res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) throw parseError(res.status, payload);

  // Unwrap the Nest response envelope when present.
  if (
    payload &&
    typeof payload === "object" &&
    "statusCode" in payload &&
    "data" in payload
  ) {
    return (payload as { data: T }).data;
  }

  return payload as T;
};
