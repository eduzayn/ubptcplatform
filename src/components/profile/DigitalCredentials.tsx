import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle } from "lucide-react";
import GenerateCredentialButton from "./GenerateCredentialButton";
import { useCredentials } from "@/lib/hooks";
import CredentialCard from "./CredentialCard";
import QrCodeModal from "./QrCodeModal";

interface DigitalCredentialsProps {
  userData: {
    id: string;
    name: string;
    cpf: string;
    profession: string;
    specialization: string;
    memberSince: string;
    memberId: string;
    paymentStatus: string | "active" | "suspended";
    avatarUrl?: string;
  };
  asaasConfirmed?: boolean;
}

const DigitalCredentials = ({
  userData,
  asaasConfirmed = true,
}: DigitalCredentialsProps) => {
  const [showQrModal, setShowQrModal] = useState(false);
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
        console.log("Credenciais carregadas:", data);
      } else {
        console.log("Nenhuma credencial encontrada");
      }
    };

    loadCredentials();
  }, [getCredentials]);

  const handleQrCodeClick = async (type: "professional" | "student") => {
    setCredentialType(type);

    // Buscar credenciais do banco de dados
    const { data } = await getCredentials();

    if (data && data.length > 0) {
      // Encontrar a credencial do tipo selecionado
      const credential = data.find((cred) => cred.credential_type === type);
      if (credential && credential.qr_code_data) {
        setQrCodeData(credential.qr_code_data);
      } else {
        // Fallback: gerar dados do QR code baseado no tipo de credencial
        const qrData =
          type === "professional"
            ? `PROF-${userData.id}-${userData.memberId}`
            : `EST-${userData.id}-${userData.memberId}`;
        setQrCodeData(qrData);
      }
    } else {
      // Fallback: gerar dados do QR code baseado no tipo de credencial
      const qrData =
        type === "professional"
          ? `PROF-${userData.id}-${userData.memberId}`
          : `EST-${userData.id}-${userData.memberId}`;
      setQrCodeData(qrData);
    }

    // Abrir o modal do QR code
    setShowQrModal(true);
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
            <CredentialCard
              type="professional"
              userData={userData}
              onQrCodeClick={handleQrCodeClick}
            />

            {/* Credencial de Estudante */}
            <CredentialCard
              type="student"
              userData={userData}
              onQrCodeClick={handleQrCodeClick}
            />
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

      {/* QR Code Modal */}
      {showQrModal && qrCodeData && (
        <QrCodeModal
          open={showQrModal}
          onClose={() => setShowQrModal(false)}
          credentialType={credentialType}
          qrCodeData={qrCodeData}
          memberId={userData.memberId}
        />
      )}
    </Card>
  );
};

export default DigitalCredentials;
