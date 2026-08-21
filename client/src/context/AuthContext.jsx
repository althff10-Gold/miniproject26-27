import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('teenpreneur_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('teenpreneur_user');
      const savedToken = localStorage.getItem('teenpreneur_token');

      if (savedToken && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          const res = await api.get('/auth/me');
          if (res.data?.success) {
            setUser(res.data.data);
            localStorage.setItem('teenpreneur_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.warn('Session verification fallback');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data?.success) {
      const { user: userData, tokens } = res.data.data;
      setUser(userData);
      setToken(tokens.accessToken);
      localStorage.setItem('teenpreneur_token', tokens.accessToken);
      localStorage.setItem('teenpreneur_refresh_token', tokens.refreshToken);
      localStorage.setItem('teenpreneur_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    throw new Error(res.data?.message || 'Login failed');
  };

  const demoLogin = async (role) => {
    const demoCredentials = {
      admin: { email: 'admin@demo.com', password: 'Password123!' },
      guardian: { email: 'guardian@demo.com', password: 'Password123!' },
      student: { email: 'student@demo.com', password: 'Password123!' },
      mentor: { email: 'mentor@demo.com', password: 'Password123!' }
    };

    const creds = demoCredentials[role];
    if (!creds) throw new Error('Unknown demo role');

    try {
      return await login(creds.email, creds.password);
    } catch (err) {
      const mockUser = {
        id: role === 'admin' ? 1 : role === 'guardian' ? 2 : role === 'student' ? 3 : 4,
        email: creds.email,
        role: role,
        status: 'active',
        firstName: role.charAt(0).toUpperCase() + role.slice(1),
        lastName: 'DemoUser'
      };
      setUser(mockUser);
      setToken('demo-mock-jwt-token');
      localStorage.setItem('teenpreneur_token', 'demo-mock-jwt-token');
      localStorage.setItem('teenpreneur_user', JSON.stringify(mockUser));
      return { success: true, user: mockUser, isDemoFallback: true };
    }
  };

  const register = async (registrationData) => {
    const res = await api.post('/auth/register', registrationData);
    if (res.data?.success) {
      const { user: userData, tokens, requiresGuardianConsent } = res.data.data;
      if (tokens) {
        setUser(userData);
        setToken(tokens.accessToken);
        localStorage.setItem('teenpreneur_token', tokens.accessToken);
        localStorage.setItem('teenpreneur_refresh_token', tokens.refreshToken);
        localStorage.setItem('teenpreneur_user', JSON.stringify(userData));
      }
      return { success: true, user: userData, requiresGuardianConsent };
    }
    throw new Error(res.data?.message || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('teenpreneur_token');
    localStorage.removeItem('teenpreneur_refresh_token');
    localStorage.removeItem('teenpreneur_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        demoLogin,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
