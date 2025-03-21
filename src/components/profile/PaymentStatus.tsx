import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";

interface PaymentStatusProps {
  status: "active" | "pending" | "suspended";
  paymentDate: string;
  nextPaymentDate: string;
  paymentMethod: string;
  paymentId: string;
  onUpdatePayment: () => void;
  asaasConfirmed: boolean;
  setAsaasConfirmed: (confirmed: boolean) => void;
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
}: PaymentStatusProps) => {
  // Função para simular a verificação no Asaas
  const handleVerifyAsaas = () => {
    // Simulando uma chamada à API do Asaas
    setTimeout(() => {
      setAsaasConfirmed(true);
      alert("Pagamento confirmado no Asaas!");
    }, 1500);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Status do Pagamento</CardTitle>
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
                  : "Suspenso"}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Último pagamento:</span>
              <span className="font-medium">{paymentDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Próximo pagamento:</span>
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
  );
};

export default PaymentStatus;
