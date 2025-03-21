import { useState } from "react";
import { supabase } from "../supabase";
import type { PostgrestError } from "@supabase/supabase-js";

type MutationOptions = {
  table: string;
};

export function useSupabaseMutation<T>(options: MutationOptions) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const insert = async (data: Partial<T> | Partial<T>[]) => {
    try {
      setLoading(true);
      setError(null);

      const { data: result, error } = await supabase
        .from(options.table)
        .insert(data)
        .select();

      if (error) throw error;

      return { data: result, error: null };
    } catch (err) {
      console.error("Erro ao inserir dados:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string | number, data: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);

      const { data: result, error } = await supabase
        .from(options.table)
        .update(data)
        .eq("id", id)
        .select();

      if (error) throw error;

      return { data: result, error: null };
    } catch (err) {
      console.error("Erro ao atualizar dados:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from(options.table)
        .delete()
        .eq("id", id);

      if (error) throw error;

      return { error: null };
    } catch (err) {
      console.error("Erro ao remover dados:", err);
      setError(err as PostgrestError);
      return { error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  return {
    insert,
    update,
    remove,
    loading,
    error,
  };
}
