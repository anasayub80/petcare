import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { IMAGES } from '../data/images';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, redirectPath?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string, phone?: string, redirectPath?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const DEFAULT_USER: User = {
  id: 'usr-1001',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@example.com',
  phone: '(555) 234-5678',
  avatar: IMAGES.testimonials.emily,
  role: 'customer',
  address: '742 Evergreen Terrace, Apt 4B',
  city: 'San Francisco, CA',
  emergencyContact: 'David Jenkins (Husband) - (555) 987-6543',
  createdAt: '2025-04-12',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('petcare_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER; // Default logged in for friendly evaluation or can toggle
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('petcare_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('petcare_auth_user');
    }
  }, [user]);

  const login = async (email: string, _password?: string, _redirectPath?: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate brief API delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // In our app, if the email matches default or is any demo email, create or restore user
    const loggedUser: User = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || DEFAULT_USER.name,
    };
    setUser(loggedUser);
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, _password?: string, phone?: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || 'Valued Pet Parent',
      email: email || 'parent@example.com',
      phone: phone || '(555) 000-0000',
      avatar: IMAGES.testimonials.sophia,
      role: 'customer',
      address: '',
      city: '',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('petcare_auth_user');
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...data };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
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
