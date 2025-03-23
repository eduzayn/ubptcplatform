import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    return <AccessBl
