import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

export interface DeveloperUser {
  id: number;
  email: string;
  display_name: string;
  role: string;
}

interface DeveloperAuthContextType {
  user: DeveloperUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const DeveloperAuthContext = createContext<DeveloperAuthContextType>({} as DeveloperAuthContextType);

export const DeveloperAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DeveloperUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      const data = await api.get<DeveloperUser & { csrf_token?: string; session_token?: string }>('/api/auth/developer/check');
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
      const data = await api.post<DeveloperUser & { csrf_token?: string; session_token?: string }>('/api/auth/developer/login', {
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
      setError(e.message || 'Developer authentication failed');
      throw e;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/developer/logout');
    } catch (e) {
      console.warn('Developer logout error', e);
    } finally {
      api.setSessionToken(null);
      setUser(null);
    }
  };

  return (
    <DeveloperAuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </DeveloperAuthContext.Provider>
  );
};

export const useDeveloperAuth = () => useContext(DeveloperAuthContext);
