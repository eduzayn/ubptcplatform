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
  memberSince: string;
  membershipStatus: "active" | "suspended" | "pending";
  nextPayment: string;
  certificationProgress: number;
  membershipType?: "standard" | "premium";
  paymentMethod?: string;
}

const defaultProps = {
  certificationProgress: 45,
  membershipType: "standard" as const,
  paymentMethod: "Credit Card ending in 4242"
};

const MembershipOverview = ({
  memberSince,
  membershipStatus,
  nextPayment,
  certificationProgress = defaultProps.certificationProgress,
  membershipType = defaultProps.membershipType,
  paymentMethod = defaultProps.paymentMethod,
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
          variant={membershipStatus === "active" ? "default" : "destructive"}
          className="px-3 py-1"
        >
          {membershipStatus === "active"
            ? "Ativa"
            : membershipStatus === "pending"
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
              Próxima cobrança: {nextPayment}
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
              <li className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Acesso a todos os
                conteúdos e recursos
              </li>
              <li className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Participação em
                eventos e workshops
              </li>
              <li className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Credenciais digitais
                profissionais
              </li>
              <li className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Certificação após 12
                meses de assinatura
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" /> Gerenciar Assinatura
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MembershipOverview;
