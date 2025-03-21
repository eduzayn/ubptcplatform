import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import type { PostgrestError } from "@supabase/supabase-js";

type QueryOptions = {
  table: string;
  columns?: string;
  filters?: Record<string, any>;
  order?: { column: string; ascending?: boolean };
  limit?: number;
  single?: boolean;
  relationships?: string[];
};

export function useSupabaseQuery<T>(
  options: QueryOptions,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase.from(options.table).select(options.columns || "*");

        // Adicionar relacionamentos se especificados
        if (options.relationships && options.relationships.length > 0) {
          const relations = options.relationships.join(",");
          query = supabase
            .from(options.table)
            .select(`${options.columns || "*"}, ${relations}`);
        }

        // Aplicar filtros
        if (options.filters) {
          Object.entries(options.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              query = query.eq(key, value);
            }
          });
        }

        // Aplicar ordenação
        if (options.order) {
          query = query.order(options.order.column, {
            ascending: options.order.ascending ?? true,
          });
        }

        // Aplicar limite
        if (options.limit) {
          query = query.limit(options.limit);
        }

        // Buscar um único registro ou vários
        const { data, error } = options.single
          ? await query.single()
          : await query;

        if (error) throw error;

        setData(data as T);
      } catch (err) {
        console.error("Erro na consulta Supabase:", err);
        setError(err as PostgrestError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [...dependencies]);

  return { data, error, loading };
}
