import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

export interface User {
  id: number;
  email: string;
  display_name: string;
  role: string;
}

interface ClientAuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const ClientAuthContext = createContext<ClientAuthContextType>({} as ClientAuthContextType);

export const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      const data = await api.get<User & { csrf_token?: string; session_token?: string }>('/api/auth/client/check');
      if (data?.csrf_token) {
        api.setCsrfToken(data.csrf_token);
      }
      if (data?.session_token) {
        api.setSessionToken(data.session_token);
      }
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    setError(null);
    try {
      const data = await api.post<User & { csrf_token?: string; session_token?: string }>('/api/auth/client/login', {
        email,
        password: pass,
      });
      if (data.csrf_token) {
        api.setCsrfToken(data.csrf_token);
      }
      if (data.session_token) {
        api.setSessionToken(data.session_token);
      }
      setUser({
        id: data.id,
        email: data.email,
        display_name: data.display_name,
        role: data.role,
      });
    } catch (e: any) {
      setError(e.message || 'Login failed');
      throw e;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/client/logout');
    } catch (e) {
      console.warn('Logout error', e);
    } finally {
      api.setSessionToken(null);
      setUser(null);
    }
  };

  return (
    <ClientAuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => useContext(ClientAuthContext);
