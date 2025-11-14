// Type definitions for ApiService
export function get(
  endpoint: string,
  options?: { headers?: Record<string, string> }
): Promise<any>;
export function postWithAuth(endpoint: string, data?: any): Promise<any>;
export function putWithAuth(endpoint: string, data?: any): Promise<any>;
export function deleteWithAuth(endpoint: string, data?: any): Promise<any>;

declare const ApiService: {
  get: typeof get;
  postWithAuth: typeof postWithAuth;
  putWithAuth: typeof putWithAuth;
  deleteWithAuth: typeof deleteWithAuth;
};

export default ApiService;
