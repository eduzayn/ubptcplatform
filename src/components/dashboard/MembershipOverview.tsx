import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import {
  CalendarDays,
  CreditCard,
  GraduationCap,
  Settings,
} from "lucide-react";

interface MembershipOverviewProps {
  memberSince?: string;
  subscriptionStatus?: "active" | "inactive" | "pending";
  nextBillingDate?: string;
  certificationProgress?: number;
  membershipType?: "standard" | "premium";
  paymentMethod?: string;
}

const MembershipOverview = ({
  memberSince = "January 15, 2023",
  subscriptionStatus = "active",
  nextBillingDate = "June 15, 2023",
  certificationProgress = 45,
  membershipType = "standard",
  paymentMethod = "Credit Card ending in 4242",
}: MembershipOverviewProps) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">
            Visão Geral da Assinatura
          </CardTitle>
          <CardDescription>Membro desde {memberSince}</CardDescription>
        </div>
        <Badge
          variant={subscriptionStatus === "active" ? "default" : "destructive"}
          className="px-3 py-1"
        >
          {subscriptionStatus === "active"
            ? "Ativa"
            : subscriptionStatus === "pending"
              ? "Pendente"
              : "Inativa"}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-6 pt-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Detalhes da Assinatura</h3>
          </div>
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-sm font-medium">R$49.90/month</p>
            <p className="text-xs text-muted-foreground">
              Próxima cobrança: {nextBillingDate}
            </p>
            <p className="text-xs text-muted-foreground">
              Método de pagamento: {paymentMethod}
            </p>
            <p className="mt-2 text-xs font-medium">
              Assinatura {membershipType === "premium" ? "Premium" : "Padrão"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Progresso da Certificação</h3>
          </div>
          <div className="rounded-md bg-muted/50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium">
                {certificationProgress}% Completo
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.round((certificationProgress / 100) * 12)} / 12 meses
              </span>
            </div>
            <Progress value={certificationProgress} className="h-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {certificationProgress < 100
                ? `Continue sua assinatura para obter certificação`
                : "Você completou os requisitos para certificação!"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Benefícios da Assinatura</h3>
          </div>
          <div className="rounded-md bg-muted/50 p-3">
            <ul className="text-xs space-y-1">
              <li>✓ Acesso à biblioteca digital</li>
              <li>✓ Eventos e workshops semanais</li>
              <li>✓ Carteira de identificação profissional</li>
              <li>✓ Carteira de benefícios estudantis</li>
              <li>✓ Acesso ao fórum da comunidade</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Settings className="h-4 w-4" />
          Gerenciar Assinatura
        </Button>
        <Button size="sm" className="gap-1">
          <GraduationCap className="h-4 w-4" />
          Ver Caminho de Certificação
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MembershipOverview;
