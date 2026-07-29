'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: 'customer' | 'seller' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  verifyOtp: (email: string, otpCode: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otpCode: string, newPassword: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('shopsy-token');
    const storedUser = localStorage.getItem('shopsy-user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, rememberMe }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('shopsy-token', data.accessToken);
    localStorage.setItem('shopsy-user', JSON.stringify(data.user));
    setToken(data.accessToken);
    setUser(data.user);
  };

  const signup = async (name: string, email: string, password: string, role: 'customer' | 'seller' | 'admin' = 'customer') => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');
  };

  const verifyOtp = async (email: string, otpCode: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otpCode }),
    });
    const data = await response.json();

console.log("LOGIN RESPONSE:", data);

if (!response.ok) {
  throw new Error(data.message || 'Login failed');
}

if (!data.accessToken) {
  throw new Error("Access token missing from server response");
}

localStorage.setItem('shopsy-token', data.accessToken);
localStorage.setItem('shopsy-user', JSON.stringify(data.user));

setToken(data.accessToken);
setUser(data.user);
  };

  const forgotPassword = async (email: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Password reset failed');
  };

  const resetPassword = async (email: string, otpCode: string, newPassword: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otpCode, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Password reset failed');
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    localStorage.removeItem('shopsy-token');
    localStorage.removeItem('shopsy-user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, login, signup, logout, verifyOtp, forgotPassword, resetPassword, loading }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
