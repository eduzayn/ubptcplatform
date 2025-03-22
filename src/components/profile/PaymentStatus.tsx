import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CreditCard, CheckCircle } from "lucide-react";
import { useToast } from "../ui/use-toast";
import SubscriptionManager from "./SubscriptionManager";

interface PaymentStatusProps {
  status?: "active" | "pending" | "suspended" | "canceled";
  paymentDate?: string;
  nextPaymentDate?: string;
  paymentMethod?: string;
  paymentId?: string;
  onUpdatePayment?: () => void;
  asaasConfirmed?: boolean;
  setAsaasConfirmed?: (confirmed: boolean) => void;
  userId?: string;
  plan?: string;
  amount?: string;
  invoices?: Array<{
    id: string;
    date: string;
    amount: string;
    status: string;
  }>;
}

const PaymentStatus = ({
  status = "active",
  paymentDate = "01/01/2023",
  nextPaymentDate = "01/02/2023",
  paymentMethod = "Cartão de crédito",
  paymentId = "pay_123456",
  onUpdatePayment = () => {},
  asaasConfirmed = false,
  setAsaasConfirmed = () => {},
  userId = "user-123",
  plan = "Mensal",
  amount = "R$ 49,90",
  invoices = [],
}: PaymentStatusProps) => {
  const { toast } = useToast();

  // Função para simular a verificação no Asaas
  const handleVerifyAsaas = () => {
    // Simulando uma chamada à API do Asaas
    toast({
      title: "Verificando pagamento",
      description: "Aguarde enquanto verificamos seu pagamento...",
    });

    setTimeout(() => {
      setAsaasConfirmed(true);
      toast({
        title: "Pagamento confirmado",
        description: "Seu pagamento foi confirmado com sucesso!",
      });
    }, 1500);
  };

  const handleStatusChange = (newStatus: string) => {
    // Em um cenário real, você atualizaria o estado global ou faria uma chamada à API
    toast({
      title: "Status atualizado",
      description: `Status da assinatura alterado para: ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="w-full bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">
            Status do Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Status:</span>
              <Badge
                variant="outline"
                className={`${status === "active" ? "bg-green-50 text-green-600" : status === "pending" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"}`}
              >
                {status === "active"
                  ? "Ativo"
                  : status === "pending"
                    ? "Pendente"
                    : status === "canceled"
                      ? "Cancelado"
                      : "Suspenso"}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Plano:</span>
                <span className="font-medium">{plan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor:</span>
                <span className="font-medium">{amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Último pagamento:</span>
                <span className="font-medium">{paymentDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Próximo pagamento:
                </span>
                <span className="font-medium">{nextPaymentDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Método de pagamento:
                </span>
                <span className="font-medium">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID do pagamento:</span>
                <span className="font-medium">{paymentId}</span>
              </div>
            </div>

            <div className="flex justify-between text-sm items-center border-t pt-3">
              <span className="text-muted-foreground">Confirmação Asaas:</span>
              <Badge
                variant="outline"
                className={`${asaasConfirmed ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}
              >
                {asaasConfirmed ? "Confirmado" : "Pendente"}
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={onUpdatePayment}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Atualizar Método de
                Pagamento
              </Button>

              {!asaasConfirmed && (
                <Button className="w-full" onClick={handleVerifyAsaas}>
                  Verificar Pagamento no Asaas
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Faturas */}
      {invoices && invoices.length > 0 && (
        <Card className="w-full bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              Histórico de Faturas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">ID</th>
                    <th className="py-3 px-4 text-left font-medium">Data</th>
                    <th className="py-3 px-4 text-left font-medium">Valor</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b">
                      <td className="py-3 px-4 text-sm">{invoice.id}</td>
                      <td className="py-3 px-4 text-sm">{invoice.date}</td>
                      <td className="py-3 px-4 text-sm">{invoice.amount}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            invoice.status === "Pago"
                              ? "bg-green-50 text-green-600"
                              : "bg-yellow-50 text-yellow-600"
                          }
                        >
                          {invoice.status === "Pago" && (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          )}
                          {invoice.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gerenciador de Assinatura */}
      <SubscriptionManager
        userId={userId}
        subscriptionStatus={status}
        paymentMethod={paymentMethod}
        nextBillingDate={nextPaymentDate}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default PaymentStatus;
