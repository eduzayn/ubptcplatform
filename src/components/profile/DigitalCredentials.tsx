import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { QrCode, Download, Eye, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import GenerateCredentialButton from "./GenerateCredentialButton";
import { useCredentials } from "@/lib/hooks";

interface DigitalCredentialsProps {
  userData: {
    id: string;
    name: string;
    cpf: string;
    profession: string;
    specialization: string;
    memberSince: string;
    memberId: string;
    paymentStatus: "active" | "suspended";
    avatarUrl?: string;
  };
  asaasConfirmed?: boolean;
}

const DigitalCredentials = ({
  userData,
  asaasConfirmed = true,
}: DigitalCredentialsProps) => {
  const [showQrInfo, setShowQrInfo] = useState(false);
  const [credentialType, setCredentialType] = useState<
    "professional" | "student"
  >("professional");
  const [credentialId, setCredentialId] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const { getCredentials } = useCredentials();

  useEffect(() => {
    const loadCredentials = async () => {
      const { data } = await getCredentials();
      if (data && data.length > 0) {
        // Se já existem credenciais, definir o ID da primeira
        setCredentialId(data[0].id);
      }
    };

    loadCredentials();
  }, []);

  const handleQrCodeClick = async (type: "professional" | "student") => {
    setCredentialType(type);
    setShowQrInfo(true);

    // Buscar credenciais do banco de dados
    const { data } = await getCredentials();

    if (data && data.length > 0) {
      // Encontrar a credencial do tipo selecionado
      const credential = data.find((cred) => cred.credential_type === type);
      if (credential && credential.qr_code_data) {
        setQrCodeData(credential.qr_code_data);
        return;
      }
    }

    // Fallback: gerar dados do QR code baseado no tipo de credencial
    const qrData =
      type === "professional"
        ? `PROF-${userData.id}-${userData.memberId}`
        : `EST-${userData.id}-${userData.memberId}`;
    setQrCodeData(qrData);
  };

  const handleCredentialGenerated = (id: string) => {
    setCredentialId(id);
  };

  if (!asaasConfirmed) {
    return (
      <Card className="w-full bg-white shadow-sm">
        <CardContent className="pt-6">
          <div className="p-4 rounded-md bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-amber-600 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <div>
                <h4 className="font-medium text-amber-800">Acesso bloqueado</h4>
                <p className="text-sm text-amber-700">
                  Você precisa confirmar seu pagamento no Asaas para ter acesso
                  às suas credenciais digitais. Por favor, vá para a aba "Status
                  da Associação" e clique em "Verificar Pagamento no Asaas".
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Credenciais Digitais</h3>
            <Badge className="bg-green-50 text-green-600">
              <CheckCircle className="mr-1 h-3 w-3" /> Verificado
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credencial Profissional */}
            <Card className="border-2 border-primary/20 overflow-hidden">
              <div className="bg-primary text-white p-4">
                <h3 className="font-bold">Credencial Profissional</h3>
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={userData.avatarUrl}
                        alt={userData.name}
                      />
                      <AvatarFallback className="bg-primary text-white">
                        {userData.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{userData.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {userData.profession}
                      </p>
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleQrCodeClick("professional")}
                  >
                    <QrCode className="h-10 w-10 text-primary" />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">CPF:</span>
                    <span className="text-sm">{userData.cpf}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      ID Profissional:
                    </span>
                    <span className="text-sm">{userData.memberId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Especialização:</span>
                    <span className="text-sm">{userData.specialization}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Emitido em: {userData.memberSince}
                    </p>
                    <Badge
                      variant={
                        userData.paymentStatus === "active"
                          ? "default"
                          : "destructive"
                      }
                      className="mt-1"
                    >
                      {userData.paymentStatus === "active"
                        ? "Ativo"
                        : "Suspenso"}
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

            {/* Credencial de Estudante */}
            <Card className="border-2 border-blue-200 overflow-hidden">
              <div className="bg-blue-500 text-white p-4">
                <h3 className="font-bold">Credencial de Estudante</h3>
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={userData.avatarUrl}
                        alt={userData.name}
                      />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {userData.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{userData.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Estudante UBPTC
                      </p>
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleQrCodeClick("student")}
                  >
                    <QrCode className="h-10 w-10 text-blue-500" />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">CPF:</span>
                    <span className="text-sm">{userData.cpf}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">ID Estudante:</span>
                    <span className="text-sm">EST-{userData.memberId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Curso:</span>
                    <span className="text-sm">Formação Continuada UBPTC</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Válido até: 31/12/2023
                    </p>
                    <Badge
                      variant={
                        userData.paymentStatus === "active"
                          ? "default"
                          : "destructive"
                      }
                      className="mt-1"
                    >
                      {userData.paymentStatus === "active"
                        ? "Ativo"
                        : "Suspenso"}
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
          </div>

          <div className="mt-6">
            <GenerateCredentialButton
              userData={{
                id: userData.id,
                name: userData.name,
                cpf: userData.cpf,
                profession: userData.profession,
                specialization: userData.specialization,
                memberSince: userData.memberSince,
                memberId: userData.memberId,
                avatarUrl: userData.avatarUrl,
              }}
              paymentConfirmed={userData.paymentStatus === "active"}
              documentationComplete={true}
              onCredentialGenerated={handleCredentialGenerated}
              alreadyGenerated={!!credentialId}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalCredentials;
