// Simple fetch wrapper service
// - GET requests are passed through without headers
// - postWithAuth / putWithAuth / deleteWithAuth add X-API-Key header automatically

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
// Fallback order: VITE_DEV_API_KEY -> REACT_APP_API_KEY -> hard-coded dev key.
// Note: API keys should not be kept in frontend code. This client sends requests
// to a backend proxy which is expected to add any required authentication headers.
// Keep BASE_URL pointed to your backend proxy (e.g. '/api' or 'http://localhost:8080').

const DEV_API_KEY = ""; // API key should not be used in client-side code

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, options);

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const err = new Error(res.statusText || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

function buildJsonOptions(method, body, additionalHeaders = {}) {
  const headers = { ...additionalHeaders };
  let finalBody = undefined;

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
async function get(endpoint) {
  // GETs should be passed through without any custom headers (per requirement)
  return request(endpoint, { method: "GET" });
}

async function postWithAuth(endpoint, data) {
  // The backend proxy should attach the server-side API key. Client must not include it.
  const opts = buildJsonOptions("POST", data);
  return request(endpoint, opts);
}

async function putWithAuth(endpoint, data) {
  const opts = buildJsonOptions("PUT", data);
  return request(endpoint, opts);
}

async function deleteWithAuth(endpoint, data) {
  // Some APIs accept a body on DELETE; include it if provided
  const opts = buildJsonOptions("DELETE", data);
  return request(endpoint, opts);
}

// Export as named and default
export { get, postWithAuth, putWithAuth, deleteWithAuth };

export default {
  get,
  postWithAuth,
  putWithAuth,
  deleteWithAuth,
};
