<<<<<<< HEAD
// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/getting_started/javascript

=======
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
<<<<<<< HEAD
  // Handle CORS preflight requests
=======
  // Lidar com solicitações OPTIONS para CORS
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
<<<<<<< HEAD
    // Get the request body
    const { qrCodeData } = await req.json();

    if (!qrCodeData) {
      throw new Error("QR code data is required");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse the QR code data
    // Expected format: TYPE-USER_ID-CREDENTIAL_ID
    const parts = qrCodeData.split("-");
    if (parts.length < 3) {
      return new Response(
        JSON.stringify({
          valid: false,
          message: "Formato de QR code inválido",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const credentialType = parts[0] === "PROF" ? "professional" : "student";
    const userId = parts[1];

    // In a real implementation, query the database to verify the credential
    // For now, we'll simulate a successful verification

    // Simulate database query
    // const { data: credential, error } = await supabase
    //   .from('credentials')
    //   .select('*, profiles(name, email)')
    //   .eq('user_id', userId)
    //   .eq('credential_type', credentialType)
    //   .eq('status', 'active')
    //   .single()

    // if (error || !credential) {
    //   return new Response(
    //     JSON.stringify({
    //       valid: false,
    //       message: 'Credencial não encontrada ou inválida',
    //     }),
    //     {
    //       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    //       status: 404,
    //     }
    //   )
    // }

    // Simulate a successful response
    const mockProfile = {
      name: "Maria Silva",
      email: "maria.silva@exemplo.com",
      profession: "Psicóloga",
      specialization: "Terapia Cognitivo-Comportamental",
    };

    const mockCredential = {
      type: credentialType,
      credentialId: qrCodeData,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 31536000000).toISOString(), // +1 year
    };

    return new Response(
      JSON.stringify({
        valid: true,
        profile: mockProfile,
        credential: mockCredential,
=======
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
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
<<<<<<< HEAD
    console.error("Error verifying credential:", error);

    return new Response(
      JSON.stringify({
        valid: false,
        message: error.message || "Erro ao verificar credencial",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
=======
    return new Response(
      JSON.stringify({
        valid: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
      },
    );
  }
});
