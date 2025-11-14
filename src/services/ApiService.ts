// Simple fetch wrapper service
// - GET requests are passed through without headers
// - postWithAuth / putWithAuth / deleteWithAuth add X-API-Key header automatically

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

interface GetOptions {
  headers?: Record<string, string>;
}

async function request<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, options);

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
  // GETs can now accept optional headers for authenticated requests
  const headers = options.headers || {};
  return request<T>(endpoint, { method: "GET", headers });
}

async function postWithAuth<T = unknown>(
  endpoint: string,
  data?: unknown
): Promise<T> {
  // The backend proxy should attach the server-side API key. Client must not include it.
  const opts = buildJsonOptions("POST", data);
  return request<T>(endpoint, opts);
}

async function putWithAuth<T = unknown>(
  endpoint: string,
  data?: unknown
): Promise<T> {
  const opts = buildJsonOptions("PUT", data);
  return request<T>(endpoint, opts);
}

async function deleteWithAuth<T = unknown>(
  endpoint: string,
  data?: unknown
): Promise<T> {
  // Some APIs accept a body on DELETE; include it if provided
  const opts = buildJsonOptions("DELETE", data);
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
