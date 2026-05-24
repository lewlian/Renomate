import React, { createContext, useState, useCallback, useMemo } from "react";
import type { User } from "./types";

type Role = "client" | "designer";

interface AuthState {
  user: User | null;
  role: Role;
  isLoading: boolean;
}

interface AuthContextValue {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  switchRole: () => void;
}

const MOCK_USER: User = {
  id: "usr-sarah-tan",
  email: "sarah@email.com",
  phone: null,
  full_name: "Sarah Tan",
  avatar_url: null,
  created_at: new Date().toISOString(),
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: "client",
    isLoading: false,
  });

  const signIn = useCallback(async (_email: string, _password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await delay(500);
    setState({ user: MOCK_USER, role: "client", isLoading: false });
  }, []);

  const signUp = useCallback(
    async (email: string, _password: string, fullName: string) => {
      setState((prev) => ({ ...prev, isLoading: true }));
      await delay(500);
      setState({
        user: {
          ...MOCK_USER,
          email,
          full_name: fullName,
        },
        role: "client",
        isLoading: false,
      });
    },
    []
  );

  const signOut = useCallback(async () => {
    setState({ user: null, role: "client", isLoading: false });
  }, []);

  const switchRole = useCallback(() => {
    setState((prev) => ({
      ...prev,
      role: prev.role === "client" ? "designer" : "client",
    }));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.user,
      role: state.role,
      isAuthenticated: state.user !== null,
      isLoading: state.isLoading,
      signIn,
      signUp,
      signOut,
      switchRole,
    }),
    [state, signIn, signUp, signOut, switchRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
