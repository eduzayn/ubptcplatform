import { useState } from "react";
import { supabase } from "../supabase";

export function useVerifyCredential() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const verifyCredential = async (qrCodeData: string) => {
    try {
      setLoading(true);
      setError(null);

      // Em ambiente de teste, simular a resposta da função Edge
      // Em produção, descomente o código abaixo
      /*
      const { data, error } = await supabase.functions.invoke(
        "verify-credential",
        {
          body: { qrCodeData },
        },
      );

      if (error) throw error;
      */

      // Simulação para testes
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular latência

      // Verificar formato do QR code (apenas para teste)
      const isValidFormat =
        qrCodeData.includes("PROF-") || qrCodeData.includes("EST-");

      let data;
      if (isValidFormat) {
        // Simular credencial válida
        const credentialType = qrCodeData.startsWith("PROF")
          ? "professional"
          : "student";
        data = {
          valid: true,
          profile: {
            name: "Maria Silva",
            email: "maria.silva@exemplo.com",
          },
          credential: {
            type: credentialType,
            credentialId: qrCodeData,
            issuedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 31536000000).toISOString(), // +1 ano
          },
        };
      } else {
        // Simular credencial inválida
        data = {
          valid: false,
          message: "Formato de credencial inválido ou não reconhecido.",
        };
      }

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao verificar credencial:", err);
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    verifyCredential,
    loading,
    error,
  };
}
