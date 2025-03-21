import { useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./useAuth";
import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Document = Database["public"]["Tables"]["documents"]["Row"];

export function useDocuments() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const getDocuments = async () => {
    if (!user)
      return { data: null, error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar documentos:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (
    file: File,
    documentType: string,
    documentName: string,
  ) => {
    if (!user)
      return { data: null, error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      // Fazer upload do arquivo para o storage do Supabase
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${documentType}/${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obter URL pública do arquivo
      const { data: urlData } = await supabase.storage
        .from("documents")
        .getPublicUrl(filePath);

      const documentUrl = urlData.publicUrl;

      // Registrar o documento no banco de dados
      const { data, error } = await supabase
        .from("documents")
        .insert([
          {
            user_id: user.id,
            document_type: documentType,
            document_name: documentName,
            document_url: documentUrl,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao fazer upload de documento:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId: string) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      // Primeiro, obter o documento para pegar a URL
      const { data: document, error: fetchError } = await supabase
        .from("documents")
        .select("*")
        .eq("id", documentId)
        .eq("user_id", user.id)
        .single();

      if (fetchError) throw fetchError;

      // Extrair o caminho do arquivo da URL
      const filePathMatch = document.document_url.match(/documents\/(.+)/);
      if (filePathMatch && filePathMatch[1]) {
        // Remover o arquivo do storage
        const { error: storageError } = await supabase.storage
          .from("documents")
          .remove([filePathMatch[1]]);

        if (storageError) {
          console.error("Erro ao remover arquivo do storage:", storageError);
        }
      }

      // Remover o registro do banco de dados
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentId)
        .eq("user_id", user.id);

      if (error) throw error;

      return { error: null };
    } catch (err) {
      console.error("Erro ao excluir documento:", err);
      setError(err as PostgrestError);
      return { error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  return {
    getDocuments,
    uploadDocument,
    deleteDocument,
    loading,
    error,
  };
}
