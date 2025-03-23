import React from "react";
<<<<<<< HEAD
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
}

interface PaymentStatusProps {
  status?: string | "active" | "pending" | "suspended" | "canceled";
  plan?: string;
  nextBilling?: string;
  amount?: string;
  paymentMethod?: string;
  invoices?: Invoice[];
=======
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
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
}

const PaymentStatus = ({
  status = "active",
<<<<<<< HEAD
  plan = "Profissional",
  nextBilling = "15/07/2023",
  amount = "R$ 49,90",
  paymentMethod = "Cartão de crédito terminando em 4242",
  invoices = [],
}: PaymentStatusProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Status da Assinatura</CardTitle>
          <CardDescription>
            Informações sobre seu plano e pagamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Plano Atual
                </h3>
                <p className="text-lg font-semibold">{plan}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Status
                </h3>
                <div>
                  {status === "active" ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Ativo
                    </Badge>
                  ) : status === "pending" ? (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Pendente
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                      {status === "suspended" ? "Suspenso" : "Cancelado"}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Próxima Cobrança
                </h3>
                <p className="text-lg font-semibold">{nextBilling}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Valor Mensal
                </h3>
                <p className="text-lg font-semibold">{amount}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Método de Pagamento</h3>
              <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span>{paymentMethod}</span>
              </div>
            </div>

            {status === "suspended" && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle>Assinatura Suspensa</AlertTitle>
                <AlertDescription>
                  Sua assinatura está suspensa devido a problemas com o
                  pagamento. Por favor, atualize seu método de pagamento para
                  continuar acessando todos os benefícios.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <h3 className="text-sm font-medium">Histórico de Faturas</h3>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Exportar
              </Button>
            </div>

            {invoices && invoices.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fatura</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.id}
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              invoice.status === "Pago"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : invoice.status === "Pendente"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Nenhuma fatura disponível.
              </div>
            )}

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline">Atualizar Método de Pagamento</Button>
              {status === "active" && (
                <Button variant="destructive">Cancelar Assinatura</Button>
              )}
              {status !== "active" && <Button>Reativar Assinatura</Button>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
=======
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
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
  );
};

export default PaymentStatus;
