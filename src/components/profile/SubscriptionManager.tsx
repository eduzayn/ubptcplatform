import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreditCard, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface SubscriptionManagerProps {
  userId: string;
  subscriptionStatus: "active" | "pending" | "canceled" | "suspended";
  paymentMethod?: string;
  nextBillingDate?: string;
  onStatusChange?: (newStatus: string) => void;
}

const SubscriptionManager = ({
  userId,
  subscriptionStatus,
  paymentMethod = "Cartão de crédito",
  nextBillingDate,
  onStatusChange,
}: SubscriptionManagerProps) => {
  const [loading, setLoading] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const { toast } = useToast();

  const handleCreateSubscription = async () => {
    try {
      setLoading(true);

      // Obter token de autenticação
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Usuário não autenticado");
      }

      // Simulação de chamada à função Edge do Supabase para criar assinatura
      // Em ambiente de produção, descomente o código abaixo
      /*
      const { data, error } = await supabase.functions.invoke(
        "create-subscription",
        {
          body: {
            name: "Maria Silva", // Normalmente viria do perfil do usuário
            email: "maria.silva@exemplo.com", // Normalmente viria do perfil do usuário
            cpf: "123.456.789-00", // Normalmente viria do perfil do usuário
            paymentMethod: "CREDIT_CARD",
          },
        },
      );

      if (error) throw error;
      */

      // Simulação de resposta bem-sucedida para testes
      const data = {
        subscription: {
          id: `sub_${Date.now()}`,
          status: "pending",
          paymentLink: "https://sandbox.asaas.com/payment/example",
        },
      };

      toast({
        title: "Assinatura criada com sucesso",
        description: "Você será redirecionado para a página de pagamento.",
      });

      // Se houver um link de pagamento, redirecionar o usuário
      if (data.subscription.paymentLink) {
        // Em ambiente de teste, apenas simule o redirecionamento
        console.log("Redirecionando para:", data.subscription.paymentLink);
        // Em produção, descomente a linha abaixo
        // window.open(data.subscription.paymentLink, "_blank");
      }

      // Atualizar o status da assinatura
      if (onStatusChange) {
        onStatusChange("pending");
      }
    } catch (error) {
      console.error("Erro ao criar assinatura:", error);
      toast({
        title: "Erro ao criar assinatura",
        description:
          error.message || "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    try {
      setVerifyingPayment(true);

      // Simulação de verificação de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Em um cenário real, você faria uma chamada para verificar o status do pagamento
      // const { data, error } = await supabase.functions.invoke("verify-payment", {
      //   body: { userId },
      // });

      // Para testes, alterne entre sucesso e falha
      // Você pode modificar esta variável para testar diferentes cenários
      const success = true;

      if (success) {
        toast({
          title: "Pagamento confirmado",
          description: "Sua assinatura está ativa.",
        });

        if (onStatusChange) {
          onStatusChange("active");
        }
      } else {
        toast({
          title: "Pagamento pendente",
          description:
            "Seu pagamento ainda não foi confirmado. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao verificar pagamento:", error);
      toast({
        title: "Erro ao verificar pagamento",
        description:
          error.message || "Ocorreu um erro ao verificar seu pagamento.",
        variant: "destructive",
      });
    } finally {
      setVerifyingPayment(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);

      // Simulação de cancelamento de assinatura
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Em um cenário real, você faria uma chamada para cancelar a assinatura
      // const { data, error } = await supabase.functions.invoke("cancel-subscription", {
      //   body: { userId },
      // });

      toast({
        title: "Assinatura cancelada",
        description: "Sua assinatura foi cancelada com sucesso.",
      });

      if (onStatusChange) {
        onStatusChange("canceled");
      }
    } catch (error) {
      console.error("Erro ao cancelar assinatura:", error);
      toast({
        title: "Erro ao cancelar assinatura",
        description:
          error.message || "Ocorreu um erro ao cancelar sua assinatura.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStatusBadge = () => {
    switch (subscriptionStatus) {
      case "active":
        return (
          <Badge className="bg-green-50 text-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> Ativa
          </Badge>
        );
      case "pending":
        return <Badge className="bg-yellow-50 text-yellow-600">Pendente</Badge>;
      case "canceled":
        return <Badge className="bg-red-50 text-red-600">Cancelada</Badge>;
      case "suspended":
        return <Badge className="bg-red-50 text-red-600">Suspensa</Badge>;
      default:
        return <Badge>{subscriptionStatus}</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Gerenciar Assinatura</span>
          {renderStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscriptionStatus === "active" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Plano:</span>
                <span className="text-sm">Assinatura Mensal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Valor:</span>
                <span className="text-sm">R$ 49,90/mês</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  Método de pagamento:
                </span>
                <span className="text-sm">{paymentMethod}</span>
              </div>
              {nextBillingDate && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Próxima cobrança:</span>
                  <span className="text-sm">{nextBillingDate}</span>
                </div>
              )}
            </div>

            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Assinatura Ativa</AlertTitle>
              <AlertDescription>
                Sua assinatura está ativa e você tem acesso a todos os
                benefícios da UBPTC.
              </AlertDescription>
            </Alert>

            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleCancelSubscription}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processando...
                </>
              ) : (
                "Cancelar Assinatura"
              )}
            </Button>
          </>
        )}

        {subscriptionStatus === "pending" && (
          <>
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle>Pagamento Pendente</AlertTitle>
              <AlertDescription>
                Seu pagamento está sendo processado. Isso pode levar alguns
                minutos.
              </AlertDescription>
            </Alert>

            <Button
              className="w-full"
              onClick={handleVerifyPayment}
              disabled={verifyingPayment}
            >
              {verifyingPayment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Verificando...
                </>
              ) : (
                "Verificar Status do Pagamento"
              )}
            </Button>
          </>
        )}

        {(subscriptionStatus === "canceled" ||
          subscriptionStatus === "suspended") && (
          <>
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>
                Assinatura{" "}
                {subscriptionStatus === "canceled" ? "Cancelada" : "Suspensa"}
              </AlertTitle>
              <AlertDescription>
                {subscriptionStatus === "canceled"
                  ? "Sua assinatura foi cancelada. Para retomar o acesso aos benefícios, crie uma nova assinatura."
                  : "Sua assinatura está suspensa devido a problemas com o pagamento. Por favor, atualize seu método de pagamento."}
              </AlertDescription>
            </Alert>

            <Button
              className="w-full"
              onClick={handleCreateSubscription}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" /> Criar Nova Assinatura
                </>
              )}
            </Button>
          </>
        )}

        {!subscriptionStatus && (
          <>
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle>Sem Assinatura Ativa</AlertTitle>
              <AlertDescription>
                Você ainda não possui uma assinatura. Assine agora para acessar
                todos os benefícios da UBPTC.
              </AlertDescription>
            </Alert>

            <Button
              className="w-full"
              onClick={handleCreateSubscription}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" /> Assinar Agora
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionManager;
