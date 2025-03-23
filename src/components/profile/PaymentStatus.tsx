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
import { PaymentStatusProps, PaymentStatusType } from "@/types/dashboard";

const statusConfig = {
  active: { label: "Ativo", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  pending: { label: "Pendente", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  suspended: { label: "Suspenso", className: "bg-red-100 text-red-800 hover:bg-red-100" },
  cancelled: { label: "Cancelado", className: "bg-red-100 text-red-800 hover:bg-red-100" },
};

const defaultProps: Required<Pick<PaymentStatusProps, 'status' | 'plan' | 'nextBilling' | 'amount' | 'paymentMethod' | 'invoices' | 'asaasConfirmed'>> = {
  status: "active",
  plan: "Profissional",
  nextBilling: "15/07/2023",
  amount: "R$ 49,90",
  paymentMethod: "Cartão de crédito terminando em 4242",
  invoices: [],
  asaasConfirmed: false,
};

const PaymentStatus: React.FC<PaymentStatusProps> = ({
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
}) => {
  const handleVerifyAsaas = () => {
    setTimeout(() => {
      setAsaasConfirmed(true);
      alert("Pagamento confirmado no Asaas!");
    }, 1500);
  };

  const renderStatusBadge = (status: PaymentStatusType) => {
    const config = statusConfig[status];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const renderInvoiceStatus = (status: string) => {
    const statusStyles = {
      Pago: "bg-green-50 text-green-700 border-green-200",
      Pendente: "bg-yellow-50 text-yellow-700 border-yellow-200",
      Cancelado: "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <Badge
        variant="outline"
        className={statusStyles[status as keyof typeof statusStyles]}
      >
        {status}
      </Badge>
    );
  };

  const renderPaymentInfo = () => (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <InfoItem label="Plano Atual" value={plan} />
      <InfoItem label="Status" value={renderStatusBadge(status)} />
      <InfoItem label="Próxima Cobrança" value={nextBilling} />
      <InfoItem label="Valor Mensal" value={amount} />
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Status da Assinatura</CardTitle>
          <CardDescription>
            Informações sobre seu plano e pagamentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderPaymentInfo()}

          <PaymentMethod method={paymentMethod} />
          
          {status === "suspended" && <SuspensionAlert />}
          
          <InvoicesSection 
            invoices={invoices} 
            renderInvoiceStatus={renderInvoiceStatus} 
          />

          <ActionButtons 
            status={status}
            onUpdatePayment={onUpdatePayment}
            asaasConfirmed={asaasConfirmed}
            onVerifyAsaas={handleVerifyAsaas}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="space-y-1">
    <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
    {typeof value === "string" ? (
      <p className="text-lg font-semibold">{value}</p>
    ) : (
      value
    )}
  </div>
);

const PaymentMethod: React.FC<{ method: string }> = ({ method }) => (
  <div className="pt-4 border-t">
    <h3 className="text-sm font-medium mb-2">Método de Pagamento</h3>
    <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
      <CreditCard className="h-5 w-5 text-muted-foreground" />
      <span>{method}</span>
    </div>
  </div>
);

const SuspensionAlert = () => (
  <Alert className="bg-red-50 border-red-200">
    <AlertCircle className="h-4 w-4 text-red-600" />
    <AlertTitle>Assinatura Suspensa</AlertTitle>
    <AlertDescription>
      Sua assinatura está suspensa devido a problemas com o pagamento. 
      Por favor, atualize seu método de pagamento para continuar acessando todos os benefícios.
    </AlertDescription>
  </Alert>
);

const InvoicesSection: React.FC<{
  invoices: Invoice[];
  renderInvoiceStatus: (status: string) => JSX.Element;
}> = ({ invoices, renderInvoiceStatus }) => (
  <>
    <div className="flex justify-between items-center pt-4 border-t">
      <h3 className="text-sm font-medium">Histórico de Faturas</h3>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" /> Exportar
      </Button>
    </div>

    {invoices.length > 0 ? (
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
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{renderInvoiceStatus(invoice.status)}</TableCell>
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
  </>
);

const ActionButtons: React.FC<{
  status: PaymentStatusType;
  onUpdatePayment: () => void;
  asaasConfirmed: boolean;
  onVerifyAsaas: () => void;
}> = ({ status, onUpdatePayment, asaasConfirmed, onVerifyAsaas }) => (
  <>
    <div className="flex justify-between pt-4 border-t">
      <Button variant="outline" onClick={onUpdatePayment}>
        Atualizar Método de Pagamento
      </Button>
      {status === "active" ? (
        <Button variant="destructive">Cancelar Assinatura</Button>
      ) : (
        <Button>Reativar Assinatura</Button>
      )}
    </div>

    {!asaasConfirmed && (
      <Button className="w-full mt-4" onClick={onVerifyAsaas}>
        Verificar Pagamento no Asaas
      </Button>
    )}
  </>
);

export default PaymentStatus;
