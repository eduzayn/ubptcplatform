import React from "react";
import { useAuth as useSupabaseAuth } from "@/lib/hooks";
import { AuthProvider as SupabaseAuthProvider } from "@/lib/hooks/useAuth";

type AuthWrapperProps = {
  children: React.ReactNode;
};

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
};

// Re-exportar o hook useAuth para facilitar o uso
export const useAuth = useSupabaseAuth;

// Dummy export to fix TypeScript errors
export const AuthProvider = AuthWrapper;
