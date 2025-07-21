import React, { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import type { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
    setLoading,
  } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      setLoading(false);
    }
  }, [isAuthenticated, user, setLoading]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    hasRole,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
