import React from "react";
import {
  AuthProvider as SupabaseAuthProvider,
  useAuth as useSupabaseAuth,
} from "@/lib/hooks/useAuth";

type AuthWrapperProps = {
  children: React.ReactNode;
};

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
};

// Re-exportar o hook useAuth para facilitar o uso
export const useAuth = useSupabaseAuth;
