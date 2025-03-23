import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import GenerateCredentialButton from "./GenerateCredentialButton";
import { useCredentials } from "@/lib/hooks";
import CredentialCard from "./CredentialCard";
import QrCodeModal from "./QrCodeModal";
import { CredentialType, UserProfile } from "@/types/dashboard";

interface DigitalCredentialsProps {
  userData: Pick<
    UserProfile,
    | 'id'
    | 'name'
    | 'cpf'
    | 'profession'
    | 'specialization'
    | 'avatarUrl'
  > & {
    memberSince: string;
    memberId: string;
    paymentStatus: "active" | "suspended";
  };
  asaasConfirmed?: boolean;
}

interface CredentialData {
  id: string;
  credential_type: CredentialType;
  qr_code_data?: string;
}

const DigitalCredentials: React.FC<DigitalCredentialsProps> = ({
  userData,
  asaasConfirmed = true,
}) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [credentialType, setCredentialType] = useState<CredentialType>("professional");
  const [credentialId, setCredentialId] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const { getCredentials } = useCredentials();

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const { data } = await getCredentials();
        if (data && data.length > 0) {
          setCredentialId(data[0].id);
        }
      } catch (error) {
        console.error("Erro ao carregar credenciais:", error);
      }
    };

    loadCredentials();
  }, [getCredentials]);

  const generateQrCodeData = (type: CredentialType): string => {
    const prefix = type === "professional" ? "PROF" : "EST";
    return `${prefix}-${userData.id}-${userData.memberId}`;
  };

  const handleQrCodeClick = async (type: CredentialType) => {
    setCredentialType(type);

    try {
      const { data } = await getCredentials();
      const credential = data?.find((cred: CredentialData) => cred.credential_type === type);
      
      setQrCodeData(
        credential?.qr_code_data || generateQrCodeData(type)
      );
      setShowQrModal(true);
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
      setQrCodeData(generateQrCodeData(type));
      setShowQrModal(true);
    }
  };

  const handleCredentialGenerated = (id: string) => {
    setCredentialId(id);
  };

  if (!asaasConfirmed) {
    return <AccessBlockedCard />;
  }

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="pt-6">
        <CredentialsContent
          userData={userData}
          credentialId={credentialId}
          onQrCodeClick={handleQrCodeClick}
          onCredentialGenerated={handleCredentialGenerated}
        />
      </CardContent>

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

const AccessBlockedCard: React.FC = () => (
  <Card className="w-full bg-white shadow-sm">
    <CardContent className="pt-6">
      <div className="p-4 rounded-md bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
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

interface CredentialsContentProps {
  userData: DigitalCredentialsProps["userData"];
  credentialId: string | null;
  onQrCodeClick: (type: CredentialType) => void;
  onCredentialGenerated: (id: string) => void;
}

const CredentialsContent: React.FC<CredentialsContentProps> = ({
  userData,
  credentialId,
  onQrCodeClick,
  onCredentialGenerated,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-bold">Credenciais Digitais</h3>
      <Badge className="bg-green-50 text-green-600">
        <CheckCircle className="mr-1 h-3 w-3" /> Verificado
      </Badge>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CredentialCard
        type="professional"
        userData={userData}
        onQrCodeClick={onQrCodeClick}
      />

      <CredentialCard
        type="student"
        userData={userData}
        onQrCodeClick={onQrCodeClick}
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
        onCredentialGenerated={onCredentialGenerated}
        alreadyGenerated={!!credentialId}
      />
    </div>
  </div>
);

export default DigitalCredentials;
