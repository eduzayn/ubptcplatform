import { useState, useEffect } from "react";
import { supabase, getCurrentUser, signIn, signOut, signUp } from "../supabase";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    userData: any,
  ) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
};

// Export the type for use in the React context file
export type { AuthContextType };

// This hook provides the authentication logic but doesn't include the React context
// The context will be defined in a separate JSX file
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Verificar usuário atual ao carregar
    const checkUser = async () => {
      try {
        setLoading(true);
        const { user, error } = await getCurrentUser();
        if (error) throw error;
        setUser(user);
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Configurar listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await signIn(email, password);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError(error as Error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    userData: any,
  ) => {
    try {
      setLoading(true);
      const { error } = await signUp(email, password, userData);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setError(error as Error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setError(error as Error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };
};

// Simple hook for components that only need to check if user is authenticated
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obter sessão inicial
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error("Erro ao obter sessão inicial:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Escutar mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

// Create a React context provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  // This is a placeholder for the actual implementation
  // The real implementation would use useAuthState and provide the context
  return <>{children}</>;
};
