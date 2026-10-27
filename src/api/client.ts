export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: any;
}

class ApiClient {
  private csrfToken: string | null = null;
  private sessionToken: string | null = null;

  constructor() {
    try {
      this.sessionToken = sessionStorage.getItem('cb_session_token');
    } catch {
      // Ignore sessionStorage errors in restricted environments
    }
  }

  public setSessionToken(token: string | null) {
    this.sessionToken = token;
    try {
      if (token) {
        sessionStorage.setItem('cb_session_token', token);
      } else {
        sessionStorage.removeItem('cb_session_token');
      }
    } catch {}
  }

  public getSessionToken(): string | null {
    return this.sessionToken;
  }

  public setCsrfToken(token: string) {
    this.csrfToken = token;
  }

  public getCsrfToken(): string | null {
    return this.csrfToken;
  }

  public async fetchCsrf(portal: 'client' | 'developer'): Promise<string> {
    try {
      const res = await fetch(`/api/auth/csrf?portal=${portal}`, {
        credentials: 'include',
      });
      const json: ApiResponse<{ csrf_token: string }> = await res.json();
      if (json.status === 'success' && json.data?.csrf_token) {
        this.csrfToken = json.data.csrf_token;
        return json.data.csrf_token;
      }
    } catch (e) {
      console.warn('Could not fetch CSRF token:', e);
    }
    return '';
  }

  public async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.sessionToken) {
      headers['X-Session-Id'] = this.sessionToken;
    }

    if (this.csrfToken && options.method && options.method !== 'GET') {
      headers['X-CSRF-TOKEN'] = this.csrfToken;
    }

    const response = await fetch(endpoint, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok || data.status === 'error') {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    if ((data.data as any)?.session_token) {
      this.setSessionToken((data.data as any).session_token);
    }

    return data.data as T;
  }

  public get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  public post<T = any>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body || {}),
    });
  }

  public put<T = any>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body || {}),
    });
  }

  public delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
