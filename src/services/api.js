/**
 * Base API Service Layer & Mock Network Dispatcher
 * Source of Truth: docs/API-SPEC.md
 * 
 * Phase 7: API Readiness
 * - Preserves UI contracts and mock implementations
 * - Provides live HTTP client structure ready for backend connection
 */

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || '/api',
  useMock: import.meta.env.VITE_USE_MOCK !== 'false',
  timeoutMs: 8000,
};

const SIMULATED_LATENCY_MS = 150;

/**
 * Simulates network delay and returns a deep-cloned resolved promise
 */
export async function mockNetworkDelay(data, delay = SIMULATED_LATENCY_MS) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(data)));
    }, delay);
  });
}

/**
 * Creates standardized API Error object with HTTP status code
 */
export function createApiError(message, status = 400, details = null) {
  const error = new Error(message);
  error.status = status;
  error.details = details;
  return error;
}

/**
 * Live HTTP request wrapper ready for future backend endpoint attachment
 */
export async function apiRequest(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const token = localStorage.getItem('crib_auth_token');
  const url = `${API_CONFIG.baseURL}${endpoint}`;

  const requestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

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
    if (err.status) throw err;
    throw createApiError(err.message || 'Network connection failed', 500);
  }
}
