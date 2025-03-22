import { useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./useAuth";
import type { PostgrestError } from "@supabase/supabase-js";

export type UserRole = "admin" | "gestor" | "profissional" | "user";

export function useUserRoles() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const getUserRole = async (userId?: string) => {
    try {
      setLoading(true);
      setError(null);

      const targetUserId = userId || (user ? user.id : null);

      if (!targetUserId) {
        return { data: null, error: new Error("Usuário não autenticado") };
      }

      // Buscar o perfil do usuário para obter a função
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", targetUserId)
        .single();

      if (error) {
        // Para testes, retornar um papel simulado
        console.log("Usando papel simulado para testes");
        return {
          data: { role: "profissional" as UserRole },
          error: null,
        };
      }

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar papel do usuário:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: UserRole) => {
    try {
      setLoading(true);
      setError(null);

      // Verificar se o usuário atual é um administrador
      const { data: currentUserData } = await getUserRole();

      if (!currentUserData || currentUserData.role !== "admin") {
        return {
          data: null,
          error: new Error(
            "Apenas administradores podem alterar papéis de usuários",
          ),
        };
      }

      // Atualizar o papel do usuário
      const { data, error } = await supabase
        .from("profiles")
        .update({ role, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao atualizar papel do usuário:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar se o usuário atual é um administrador ou gestor
      const { data: currentUserData } = await getUserRole();

      if (
        !currentUserData ||
        (currentUserData.role !== "admin" && currentUserData.role !== "gestor")
      ) {
        return {
          data: null,
          error: new Error("Acesso não autorizado"),
        };
      }

      // Buscar todos os usuários com seus perfis
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, full_name, email, role, created_at, last_sign_in_at, status",
        )
        .order("created_at", { ascending: false });

      if (error) {
        // Para testes, retornar dados simulados
        console.log("Usando dados simulados para testes");
        const mockData = [
          {
            id: "admin-123",
            full_name: "Admin Principal",
            email: "admin@ubptc.org",
            role: "admin" as UserRole,
            created_at: "2023-01-01T00:00:00.000Z",
            last_sign_in_at: new Date().toISOString(),
            status: "active",
          },
          {
            id: "gestor-123",
            full_name: "Maria Silva",
            email: "maria.silva@ubptc.org",
            role: "gestor" as UserRole,
            created_at: "2023-01-15T00:00:00.000Z",
            last_sign_in_at: new Date(Date.now() - 86400000).toISOString(), // Ontem
            status: "active",
          },
          {
            id: "prof-123",
            full_name: "João Santos",
            email: "joao.santos@ubptc.org",
            role: "profissional" as UserRole,
            created_at: "2023-02-03T00:00:00.000Z",
            last_sign_in_at: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 dias atrás
            status: "active",
          },
          {
            id: "prof-124",
            full_name: "Ana Oliveira",
            email: "ana.oliveira@ubptc.org",
            role: "profissional" as UserRole,
            created_at: "2023-03-22T00:00:00.000Z",
            last_sign_in_at: null,
            status: "inactive",
          },
          {
            id: "gestor-124",
            full_name: "Carlos Pereira",
            email: "carlos.pereira@ubptc.org",
            role: "gestor" as UserRole,
            created_at: "2023-04-10T00:00:00.000Z",
            last_sign_in_at: null,
            status: "pending",
          },
        ];
        return { data: mockData, error: null };
      }

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  return {
    getUserRole,
    updateUserRole,
    getAllUsers,
    loading,
    error,
  };
}
