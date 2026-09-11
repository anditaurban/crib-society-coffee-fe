/**
 * Base API Service Layer
 * Source of Truth: docs/API-INTEGRATION.md & docs/API-SPEC.md
 * 
 * Directly connected to Crib Society REST API Backend.
 */

export const API_CONFIG = {
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api',
  timeoutMs: 10000,
};

/**
 * Creates standardized API Error object with HTTP status code and details
 */
export function createApiError(message, status = 400, details = null) {
  const error = new Error(message);
  error.status = status;
  error.details = details;
  return error;
}

/**
 * Live HTTP request wrapper communicating with backend endpoints
 */
export async function apiRequest(endpoint, { method = 'GET', body, headers = {}, params = null } = {}) {
  const token = localStorage.getItem('crib_auth_token');

  let queryString = '';
  if (params && typeof params === 'object') {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });
    const qs = searchParams.toString();
    if (qs) queryString = `?${qs}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_CONFIG.baseURL}${cleanEndpoint}${queryString}`;

  const requestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw createApiError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw createApiError('Network request timed out. Please check server connection.', 408);
    }
    if (err.status) throw err;
    throw createApiError(err.message || 'Unable to connect to backend server', 500);
  }
}
