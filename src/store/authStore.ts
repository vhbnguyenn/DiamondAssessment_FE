import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  hasRole: (roles: UserRole[]) => boolean;
}

// Mock authentication - replace with real API calls
const mockLogin = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock different user roles based on email
  const mockUsers: Record<string, User> = {
    "admin@diamond.com": {
      id: "1",
      email: "admin@diamond.com",
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    },
    "manager@diamond.com": {
      id: "2",
      email: "manager@diamond.com",
      role: "manager",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    },
    "consultant@diamond.com": {
      id: "3",
      email: "consultant@diamond.com",
      role: "consultant",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    },
    "staff@diamond.com": {
      id: "4",
      email: "staff@diamond.com",
      role: "assessment_staff",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    },
    "customer@diamond.com": {
      id: "5",
      email: "customer@diamond.com",
      role: "customer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    },
  };

  const user = mockUsers[email];
  if (!user || password !== "password123") {
    throw new Error("Invalid credentials");
  }

  return {
    user,
    token: `mock-token-${user.id}`,
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await mockLogin(email, password);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setToken: (token: string) => {
        set({ token });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      hasRole: (roles: UserRole[]) => {
        const { user } = get();
        return user ? roles.includes(user.role) : false;
      },
    }),
    {
      name: "diamond-auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
