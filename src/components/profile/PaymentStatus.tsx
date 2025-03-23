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
import { PaymentStatusType } from "@/types/dashboard";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Pago" | "Pendente" | "Cancelado";
}

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
  paymentConfirmed?: boolean;
  setPaymentConfirmed?: (confirmed: boolean) => void;
}

const statusConfig = {
  active: { label: "Ativo", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  pending: { label: "Pendente", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  suspended: { label: "Suspenso", className: "bg-red-100 text-red-800 hover:bg-red-100" },
  cancelled: { label: "Cancelado", className: "bg-red-100 text-red-800 hover:bg-red-100" },
};

const defaultProps: Required<Pick<PaymentStatusProps, 'status' | 'plan' | 'nextBilling' | 'amount' | 'paymentMethod' | 'invoices' | 'paymentConfirmed'>> = {
  status: "active",
  plan: "Profissional",
  nextBilling: "15/07/2023",
  amount: "R$ 49,90",
  paymentMethod: "Cartão de crédito terminando em 4242",
  invoices: [],
  paymentConfirmed: false,
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
  paymentConfirmed = defaultProps.paymentConfirmed,
  setPaymentConfirmed = () => {},
}) => {
  const handleVerifyPayment = () => {
    setTimeout(() => {
      setPaymentConfirmed(true);
      alert("Pagamento confirmado!");
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

  const renderInvoiceStatus = (status: Invoice["status"]) => {
    const statusStyles = {
      Pago: "bg-green-50 text-green-700 border-green-200",
      Pendente: "bg-yellow-50 text-yellow-700 border-yellow-200",
      Cancelado: "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <Badge
        variant="outline"
        className={statusStyles[status]}
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
            paymentConfirmed={paymentConfirmed}
            onVerifyPayment={handleVerifyPayment}
          />
        </CardContent>
      </Card>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="space-y-1">
    <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
    {typeof value === "string" ? (
      <p className="text-lg font-semibold">{value}</p>
    ) : (
      value
    )}
  </div>
);

interface PaymentMethodProps {
  method: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ method }) => (
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

interface InvoicesSectionProps {
  invoices: Invoice[];
  renderInvoiceStatus: (status: Invoice["status"]) => JSX.Element;
}

const InvoicesSection: React.FC<InvoicesSectionProps> = ({ invoices, renderInvoiceStatus }) => (
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

interface ActionButtonsProps {
  status: PaymentStatusType;
  onUpdatePayment: () => void;
  paymentConfirmed: boolean;
  onVerifyPayment: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  status, 
  onUpdatePayment, 
  paymentConfirmed, 
  onVerifyPayment 
}) => (
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

    {!paymentConfirmed && (
      <Button className="w-full mt-4" onClick={onVerifyPayment}>
        Verificar Pagamento
      </Button>
    )}
  </>
);

export default PaymentStatus;
