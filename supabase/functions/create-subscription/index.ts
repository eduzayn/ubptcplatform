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
    const { name, email, cpf, paymentMethod } = await req.json();

    // Validate required fields
    if (!name || !email || !cpf) {
      throw new Error("Nome, email e CPF são obrigatórios");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user information from the request
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");

    // Verify the token and get the user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Usuário não autenticado");
    }

    // In a real implementation, you would integrate with Asaas API
    // For now, we'll simulate a successful subscription creation

    // Create a subscription record in the database
    const subscriptionData = {
      user_id: user.id,
      status: "pending",
      plan_type: "monthly",
      amount: 49.9,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // const { data: subscription, error: subscriptionError } = await supabase
    //   .from('subscriptions')
    //   .insert([subscriptionData])
    //   .select()
    //   .single()

    // if (subscriptionError) {
    //   throw subscriptionError
    // }

    // Simulate Asaas integration
    // In a real implementation, you would call Asaas API to create a payment link
    const mockSubscription = {
      id: `sub_${Date.now()}`,
      ...subscriptionData,
      paymentLink: "https://sandbox.asaas.com/payment/example",
    };

    return new Response(
      JSON.stringify({
        success: true,
        subscription: mockSubscription,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error creating subscription:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Erro ao criar assinatura",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
