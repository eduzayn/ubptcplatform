import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, Download } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CredentialType } from "@/types/user";

interface CredentialCardProps {
  type: CredentialType;
  userData: {
    name: string;
    cpf: string;
    profession?: string;
    specialization?: string;
    memberId: string;
    memberSince: string;
    avatarUrl?: string;
    paymentStatus: "active" | "suspended";
  };
  onQrCodeClick: (type: CredentialType) => void;
}

const CredentialCard = ({
  type,
  userData,
  onQrCodeClick,
}: CredentialCardProps) => {
  const isProfessional = type === "professional";

  return (
    <Card
      className={`border-2 ${isProfessional ? "border-primary/20" : "border-blue-200"} overflow-hidden`}
    >
      <div
        className={`${isProfessional ? "bg-primary" : "bg-blue-500"} text-white p-4`}
      >
        <h3 className="font-bold">
          {isProfessional
            ? "Credencial Profissional"
            : "Credencial de Estudante"}
        </h3>
      </div>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userData.avatarUrl} alt={userData.name} />
              <AvatarFallback
                className={`${isProfessional ? "bg-primary" : "bg-blue-500"} text-white`}
              >
                {userData.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{userData.name}</p>
              <p className="text-xs text-muted-foreground">
                {isProfessional ? userData.profession : "Estudante UBPTC"}
              </p>
            </div>
          </div>
          <div className="cursor-pointer" onClick={() => onQrCodeClick(type)}>
            <QrCode
              className={`h-10 w-10 ${isProfessional ? "text-primary" : "text-blue-500"}`}
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium">CPF:</span>
            <span className="text-sm">{userData.cpf}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">
              ID {isProfessional ? "Profissional" : "Estudante"}:
            </span>
            <span className="text-sm">
              {isProfessional ? userData.memberId : `EST-${userData.memberId}`}
            </span>
          </div>
          {isProfessional && userData.specialization && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Especialização:</span>
              <span className="text-sm">{userData.specialization}</span>
            </div>
          )}
          {!isProfessional && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Curso:</span>
              <span className="text-sm">Formação Continuada UBPTC</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">
              {isProfessional
                ? `Emitido em: ${userData.memberSince}`
                : `Válido até: 31/12/${new Date().getFullYear()}`}
            </p>
            <Badge
              variant={
                userData.paymentStatus === "active" ? "default" : "destructive"
              }
              className="mt-1"
            >
              {userData.paymentStatus === "active" ? "Ativo" : "Suspenso"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" /> PDF
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <Download className="h-4 w-4" /> Imagem
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialCard;
