import React from "react";
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
import { PaymentStatus as PaymentStatusType, Invoice } from "@/types/user";

interface PaymentStatusProps {
  status?: PaymentStatusType;
  plan?: string;
  nextBilling?: string;
  amount?: string;
  paymentMethod?: string;
  invoices?: Invoice[];
  paymentDate?: string;
  nextPaymentDate?: string;
  paymentId?: string;
  onUpdatePayment?: () => void;
  asaasConfirmed?: boolean;
  setAsaasConfirmed?: (confirmed: boolean) => void;
}

const defaultProps = {
  status: "active" as PaymentStatusType,
  plan: "Profissional",
  nextBilling: "15/07/2023",
  amount: "R$ 49,90",
  paymentMethod: "Cartão de crédito terminando em 4242",
  invoices: [] as Invoice[],
  asaasConfirmed: false,
};

const PaymentStatus = ({
  status = defaultProps.status,
  plan = defaultProps.plan,
  nextBilling = defaultProps.nextBilling,
  amount = defaultProps.amount,
  paymentMethod = defaultProps.paymentMethod,
  invoices = defaultProps.invoices,
  paymentDate,
  nextPaymentDate,
  paymentId,
  onUpdatePayment = () => {},
  asaasConfirmed = defaultProps.asaasConfirmed,
  setAsaasConfirmed = () => {},
}: PaymentStatusProps) => {
  const handleVerifyAsaas = () => {
    setTimeout(() => {
      setAsaasConfirmed(true);
      alert("Pagamento confirmado no Asaas!");
    }, 1500);
  };

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
              <Button variant="outline" onClick={onUpdatePayment}>
                Atualizar Método de Pagamento
              </Button>
              {status === "active" && (
                <Button variant="destructive">Cancelar Assinatura</Button>
              )}
              {status !== "active" && <Button>Reativar Assinatura</Button>}
            </div>

            {!asaasConfirmed && (
              <Button className="w-full mt-4" onClick={handleVerifyAsaas}>
                Verificar Pagamento no Asaas
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentStatus;
