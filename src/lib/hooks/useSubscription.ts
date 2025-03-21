import { useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./useAuth";
import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Payment = Database["public"]["Tables"]["payments"]["Row"];

export function useSubscription() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const getSubscription = async () => {
    if (!user)
      return { data: null, error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar assinatura:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const getPayments = async (subscriptionId?: string) => {
    if (!user)
      return { data: null, error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("payments")
        .select("*")
        .eq("user_id", user.id)
        .order("due_date", { ascending: false });

      if (subscriptionId) {
        query = query.eq("subscription_id", subscriptionId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao buscar pagamentos:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (
    subscriptionData: Partial<Subscription>,
  ) => {
    if (!user)
      return { data: null, error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      // Verificar se já existe uma assinatura ativa
      const { data: existingSubscription } = await getSubscription();

      if (existingSubscription && existingSubscription.status === "active") {
        return { data: existingSubscription, error: null };
      }

      const newSubscription = {
        user_id: user.id,
        status: "pending",
        plan_type: "monthly",
        amount: 49.9, // R$ 49,90 por mês
        ...subscriptionData,
      };

      const { data, error } = await supabase
        .from("subscriptions")
        .insert([newSubscription])
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao criar assinatura:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (
    subscriptionId: string,
    status: string,
  ) => {
    if (!user)
      return { data: null, error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("subscriptions")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", subscriptionId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      // Se a assinatura foi ativada, atualizar o status de pagamento no perfil
      if (status === "active") {
        await supabase
          .from("profiles")
          .update({ payment_status: "active" })
          .eq("id", user.id);
      } else if (status === "canceled" || status === "suspended") {
        await supabase
          .from("profiles")
          .update({ payment_status: "suspended" })
          .eq("id", user.id);
      }

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao atualizar status da assinatura:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async (paymentData: Partial<Payment>) => {
    if (!user)
      return { data: null, error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("payments")
        .insert([{ ...paymentData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao criar pagamento:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: string) => {
    if (!user)
      return { data: null, error: new Error("Usuário não autenticado") };

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("payments")
        .update({
          status,
          updated_at: new Date().toISOString(),
          payment_date: status === "paid" ? new Date().toISOString() : null,
        })
        .eq("id", paymentId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error("Erro ao atualizar status do pagamento:", err);
      setError(err as PostgrestError);
      return { data: null, error: err as PostgrestError };
    } finally {
      setLoading(false);
    }
  };

  return {
    getSubscription,
    getPayments,
    createSubscription,
    updateSubscriptionStatus,
    createPayment,
    updatePaymentStatus,
    loading,
    error,
  };
}
