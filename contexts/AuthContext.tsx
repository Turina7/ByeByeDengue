"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean | null;
  user: User | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  user: null,
  setAuthenticated: () => {},
  setUser: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/me');
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          Cookies.remove('token');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        isAuthenticated,
        user,
        setAuthenticated: setIsAuthenticated,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};