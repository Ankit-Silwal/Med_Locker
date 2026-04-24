const API_BASE = '/api';

function getAuthHeaders() {
  const userInfo = localStorage.getItem('userInfo');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);
      if (parsed.token) {
        headers['Authorization'] = `Bearer ${parsed.token}`;
      }
    } catch (e) {
      // ignore parsing error
    }
  }
  return headers;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`GET ${path} failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || `POST ${path} failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || `PATCH ${path} failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export interface LoginData {
  email: string;
  password?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export async function login(data: LoginData) {
  return await apiPost<any>('/auth/login', data);
}

export async function signup(data: SignupData) {
  return await apiPost<any>('/auth/signup', data);
}
