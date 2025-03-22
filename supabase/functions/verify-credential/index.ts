// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/getting_started/javascript

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error verifying credential:", error);

    return new Response(
      JSON.stringify({
        valid: false,
        message: error.message || "Erro ao verificar credencial",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
