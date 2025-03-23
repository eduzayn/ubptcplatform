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
    const { name, email, cpf, paymentMethod } = await req.json();

    // Validate required fields
    if (!name || !email || !cpf) {
      throw new Error("Nome, email e CPF são obrigatórios");
    }

    // Initialize Supabase client
=======
    // Verificar autorização
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Autorização necessária");
    }

    // Inicializar cliente Supabase
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

<<<<<<< HEAD
    // Get user information from the request
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");

    // Verify the token and get the user
=======
    // Verificar token JWT
    const token = authHeader.replace("Bearer ", "");
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Usuário não autenticado");
    }

<<<<<<< HEAD
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
=======
    // Obter dados da solicitação
    const { name, email, cpf, paymentMethod } = await req.json();

    if (!name || !email || !cpf || !paymentMethod) {
      throw new Error("Dados incompletos");
    }

    // Configuração da API Asaas
    const asaasApiKey = Deno.env.get("ASAAS_API_KEY");
    const asaasBaseUrl =
      Deno.env.get("ASAAS_BASE_URL") || "https://sandbox.asaas.com/api/v3";

    if (!asaasApiKey) {
      throw new Error("Configuração da API Asaas não encontrada");
    }

    // 1. Criar ou obter cliente no Asaas
    const customerResponse = await fetch(`${asaasBaseUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: asaasApiKey,
      },
      body: JSON.stringify({
        name,
        email,
        cpfCnpj: cpf.replace(/[^0-9]/g, ""),
        externalReference: user.id,
      }),
    });

    const customerData = await customerResponse.json();

    if (!customerResponse.ok) {
      // Se o cliente já existe, buscar pelo CPF
      if (
        customerData.errors &&
        customerData.errors[0].code === "invalid_cpfCnpj"
      ) {
        const searchResponse = await fetch(
          `${asaasBaseUrl}/customers?cpfCnpj=${cpf.replace(/[^0-9]/g, "")}`,
          {
            headers: {
              access_token: asaasApiKey,
            },
          },
        );

        const searchData = await searchResponse.json();

        if (
          searchResponse.ok &&
          searchData.data &&
          searchData.data.length > 0
        ) {
          customerData.id = searchData.data[0].id;
        } else {
          throw new Error(
            `Erro ao buscar cliente: ${JSON.stringify(searchData)}`,
          );
        }
      } else {
        throw new Error(
          `Erro ao criar cliente: ${JSON.stringify(customerData)}`,
        );
      }
    }

    const customerId = customerData.id;

    // 2. Criar assinatura no Asaas
    const subscriptionResponse = await fetch(`${asaasBaseUrl}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: asaasApiKey,
      },
      body: JSON.stringify({
        customer: customerId,
        billingType: paymentMethod,
        value: 49.9,
        nextDueDate: new Date().toISOString().split("T")[0],
        cycle: "MONTHLY",
        description: "Assinatura Mensal UBPTC",
        externalReference: user.id,
      }),
    });

    const subscriptionData = await subscriptionResponse.json();

    if (!subscriptionResponse.ok) {
      throw new Error(
        `Erro ao criar assinatura: ${JSON.stringify(subscriptionData)}`,
      );
    }

    // 3. Salvar informações no banco de dados
    // Verificar se o perfil existe
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      throw new Error(`Erro ao verificar perfil: ${profileError.message}`);
    }

    // Criar ou atualizar perfil
    if (!profileData) {
      await supabase.from("profiles").insert([
        {
          id: user.id,
          name,
          email,
          cpf,
          member_since: new Date().toISOString(),
          member_id: `MEM${Math.floor(100000 + Math.random() * 900000)}`,
          payment_status: "pending",
        },
      ]);
    } else {
      await supabase
        .from("profiles")
        .update({
          name,
          email,
          cpf,
          payment_status: "pending",
        })
        .eq("id", user.id);
    }

    // Criar assinatura no banco de dados
    const { data: dbSubscription, error: subscriptionDbError } = await supabase
      .from("subscriptions")
      .insert([
        {
          user_id: user.id,
          asaas_customer_id: customerId,
          asaas_subscription_id: subscriptionData.id,
          status: "pending",
          plan_type: "monthly",
          amount: 49.9,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(
            new Date().setMonth(new Date().getMonth() + 1),
          ).toISOString(),
        },
      ])
      .select()
      .single();

    if (subscriptionDbError) {
      throw new Error(
        `Erro ao salvar assinatura: ${subscriptionDbError.message}`,
      );
    }

    // Retornar informações da assinatura
    return new Response(
      JSON.stringify({
        success: true,
        subscription: {
          id: dbSubscription.id,
          asaasSubscriptionId: subscriptionData.id,
          status: "pending",
          paymentLink: subscriptionData.paymentLink || null,
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
    console.error("Error creating subscription:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Erro ao criar assinatura",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
=======
    return new Response(
      JSON.stringify({
        success: false,
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
