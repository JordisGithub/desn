// Simple fetch wrapper service
// - GET requests are passed through without headers
// - postWithAuth / putWithAuth / deleteWithAuth add X-API-Key header automatically

// Use environment variable if available, otherwise use relative paths in production
// In development, vite.config.ts proxy handles /api requests to localhost:8080
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:8080" : "");

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

interface GetOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal; // Support request cancellation
}

async function request<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  let res;
  try {
    res = await fetch(url, options);
  } catch (error) {
    // Re-throw abort errors as-is so they can be handled properly
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    // Network error (e.g., connection refused, CORS issue)
    const err: ApiError = new Error("Network request failed");
    err.status = 0;
    throw err;
  }

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const err: ApiError = new Error(res.statusText || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}

function buildJsonOptions(
  method: string,
  body?: unknown,
  additionalHeaders: Record<string, string> = {}
): RequestOptions {
  const headers: Record<string, string> = { ...additionalHeaders };
  let finalBody: string | FormData | undefined = undefined;

  if (body !== undefined) {
    // Allow FormData to pass through without JSON encoding
    if (body instanceof FormData) {
      finalBody = body;
    } else {
      headers["Content-Type"] = "application/json";
      finalBody = JSON.stringify(body);
    }
  }

  return {
    method,
    headers,
    body: finalBody,
  };
}

// Public helpers
async function get<T = unknown>(
  endpoint: string,
  options: GetOptions = {}
): Promise<T> {
  // GETs can now accept optional headers and abort signal for authenticated requests
  const { headers = {}, signal } = options;
  return request<T>(endpoint, { method: "GET", headers, signal });
}

async function postWithAuth<T = unknown>(
  endpoint: string,
  data?: unknown
): Promise<T> {
  // Get JWT token from localStorage
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const opts = buildJsonOptions("POST", data, headers);
  return request<T>(endpoint, opts);
}

async function putWithAuth<T = unknown>(
  endpoint: string,
  data?: unknown
): Promise<T> {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const opts = buildJsonOptions("PUT", data, headers);
  return request<T>(endpoint, opts);
}

async function deleteWithAuth<T = unknown>(
  endpoint: string,
  data?: unknown
): Promise<T> {
  // Get JWT token from localStorage
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  // Some APIs accept a body on DELETE; include it if provided
  const opts = buildJsonOptions("DELETE", data, headers);
  return request<T>(endpoint, opts);
}

// Export as named and default
export { get, postWithAuth, putWithAuth, deleteWithAuth };

export default {
  get,
  postWithAuth,
  putWithAuth,
  deleteWithAuth,
};
