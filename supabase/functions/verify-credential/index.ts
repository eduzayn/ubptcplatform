import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Lidar com solicitações OPTIONS para CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Obter dados da solicitação
    const { qrCodeData } = await req.json();

    if (!qrCodeData) {
      throw new Error("Dados do QR code não fornecidos");
    }

    // Inicializar cliente Supabase com chaves de serviço para acessar RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Buscar a credencial pelo QR code
    const { data, error } = await supabase
      .from("credentials")
      .select(
        `
        *,
        profiles:user_id (*)
      `,
      )
      .eq("qr_code_data", qrCodeData)
      .single();

    if (error) {
      throw new Error(`Erro ao verificar credencial: ${error.message}`);
    }

    if (!data) {
      throw new Error("Credencial não encontrada");
    }

    // Verificar se a credencial está ativa
    if (data.status !== "active") {
      throw new Error("Credencial inativa");
    }

    // Verificar se a credencial está expirada
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      throw new Error("Credencial expirada");
    }

    // Verificar se o usuário tem pagamento ativo
    if (data.profiles.payment_status !== "active") {
      throw new Error("Pagamento pendente ou suspenso");
    }

    // Retornar informações da credencial
    return new Response(
      JSON.stringify({
        valid: true,
        credential: {
          id: data.id,
          type: data.credential_type,
          credentialId: data.credential_id,
          issuedAt: data.issued_at,
          expiresAt: data.expires_at,
        },
        profile: {
          name: data.profiles.name,
          profession: data.profiles.profession,
          specialization: data.profiles.specialization,
          memberSince: data.profiles.member_since,
          memberId: data.profiles.member_id,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        valid: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
