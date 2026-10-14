'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;

  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
    role?: 'customer' | 'seller' | 'admin'
  ) => Promise<User>;

  signup: (
    name: string,
    email: string,
    password: string,
    role?: 'customer' | 'seller' | 'admin'
  ) => Promise<void>;

  logout: () => Promise<void>;

  verifyOtp: (
    email: string,
    otpCode: string
  ) => Promise<void>;

  forgotPassword: (
    email: string
  ) => Promise<void>;

  resetPassword: (
    email: string,
    otpCode: string,
    newPassword: string
  ) => Promise<void>;

  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

const AUTH_API = `${API_BASE}/api/auth`;

  // Restore login after page refresh
  useEffect(() => {
    try {
      const storedToken =
        localStorage.getItem('shopsy-token');

      const storedUser =
        localStorage.getItem('shopsy-user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        'Failed to restore login:',
        error
      );

      localStorage.removeItem('shopsy-token');
      localStorage.removeItem('shopsy-user');
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // LOGIN
  // =========================

  const login = async (
    email: string,
    password: string,
    rememberMe = false,
    role: 'customer' | 'seller' | 'admin' = 'customer'
  ): Promise<User> => {
    let response: Response;
    try {
      response = await fetch(`${AUTH_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify({
          email: email.trim(),
          password,
          rememberMe,
          role,
        }),
      });
    } catch {
      throw new Error(
        'Unable to connect to the login service. Make sure the Shopsy API is running, then try again.'
      );
    }

    let data: {
      message?: string;
      accessToken?: string;
      user?: User;
    };
    try {
      data = await response.json();
    } catch {
      throw new Error(
        'The login service returned an invalid response. Please try again.'
      );
    }

    if (!response.ok) {
      throw new Error(
        data.message || 'Login failed'
      );
    }

    if (!data.user || !data.accessToken) {
      throw new Error(
        'Login response is missing account or session details. Please try again.'
      );
    }

    localStorage.setItem(
      'shopsy-token',
      data.accessToken
    );

    localStorage.setItem(
      'shopsy-user',
      JSON.stringify(data.user)
    );

    setToken(data.accessToken);
    setUser(data.user);
    return data.user;
  };

  // =========================
  // SIGNUP
  // =========================

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: 'customer' | 'seller' | 'admin' = 'customer'
  ): Promise<void> => {
    const response = await fetch(
      `${AUTH_API}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || 'Signup failed'
      );
    }
  };

  // =========================
  // VERIFY OTP
  // =========================

  
const verifyOtp = async (
  email: string,
  otpCode: string
): Promise<void> => {
  const response = await fetch(
    `${AUTH_API}/verify-otp`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email.trim(),
        otpCode,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'OTP verification failed'
    );
  }
};


    const data = await response.json();

<<<<<<< HEAD
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
=======
    if (!response.ok) {
      throw new Error(
        data.message ||
          'OTP verification failed'
      );
    }
>>>>>>> 57ffb74 (Update Shopsy project)
  };

  // =========================
  // FORGOT PASSWORD
  // =========================

  const forgotPassword = async (
    email: string
  ): Promise<void> => {
    const response = await fetch(
      `${AUTH_API}/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email: email.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          'Password reset failed'
      );
    }
  };

  // =========================
  // RESET PASSWORD
  // =========================

  const resetPassword = async (
    email: string,
    otpCode: string,
    newPassword: string
  ): Promise<void> => {
    const response = await fetch(
      `${AUTH_API}/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email: email.trim(),
          otpCode,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          'Password reset failed'
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = async (): Promise<void> => {
    try {
      await fetch(
        `${AUTH_API}/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
    } catch (error) {
      console.error(
        'Logout request failed:',
        error
      );
    }

    localStorage.removeItem(
      'shopsy-token'
    );

    localStorage.removeItem(
      'shopsy-user'
    );

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      signup,
      logout,
      verifyOtp,
      forgotPassword,
      resetPassword,
      loading,
    }),
    [
      user,
      token,
      loading,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
}
