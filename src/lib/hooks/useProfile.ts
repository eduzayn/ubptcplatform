import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "@/context/AuthContext";
import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError(err as PostgrestError);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: Partial<Profile>) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      // Verificar se o perfil já existe
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 é o código para "não encontrado", que é esperado
        throw fetchError;
      }

      if (existingProfile) {
        // Se o perfil já existe, atualizá-lo
        return await updateProfile(profileData);
      }

      // Se o perfil não existe, criá-lo
      const newProfile = {
        id: user.id,
        email: user.email || "",
        ...profileData,
      };

      const { data, error } = await supabase
        .from("profiles")
        .insert([newProfile])
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (err) {
      console.error("Erro ao criar perfil:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    createProfile,
  };
}
