import React from "react";
<<<<<<< HEAD
import { useAuth as useSupabaseAuth } from "@/lib/hooks";
=======
import {
  AuthProvider as SupabaseAuthProvider,
  useAuth as useSupabaseAuth,
} from "@/lib/hooks/useAuth";
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e

type AuthWrapperProps = {
  children: React.ReactNode;
};

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
<<<<<<< HEAD
  return <>{children}</>;
=======
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
};

// Re-exportar o hook useAuth para facilitar o uso
export const useAuth = useSupabaseAuth;
<<<<<<< HEAD

// Dummy export to fix TypeScript errors
export const AuthProvider = AuthWrapper;
=======
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
