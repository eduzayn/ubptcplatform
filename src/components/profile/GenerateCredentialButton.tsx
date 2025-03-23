import React, { useState } from "react";
import { Button } from "../ui/button";
import { QrCode, Loader2, CheckCircle } from "lucide-react";
import { useCredentials } from "@/lib/hooks";
import { useToast } from "../ui/use-toast";
import { CredentialType } from "@/types/user";

interface GenerateCredentialButtonProps {
  userData: {
    id: string;
    name: string;
    cpf: string;
    profession: string;
    specialization: string;
    memberSince: string;
    memberId: string;
    avatarUrl?: string;
  };
  paymentConfirmed: boolean;
  documentationComplete: boolean;
  onCredentialGenerated?: (credentialId: string) => void;
  alreadyGenerated?: boolean;
}

const defaultProps = {
  onCredentialGenerated: (credentialId: string) => {},
  alreadyGenerated: false,
};

const GenerateCredentialButton = ({
  userData,
  paymentConfirmed,
  documentationComplete,
  onCredentialGenerated = defaultProps.onCredentialGenerated,
  alreadyGenerated = defaultProps.alreadyGenerated,
}: GenerateCredentialButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { generateCredential } = useCredentials();
  const { toast } = useToast();

  const handleGenerateCredential = async () => {
    if (!paymentConfirmed) {
      toast({
        title: "Pagamento pendente",
        description:
          "Você precisa confirmar seu pagamento antes de gerar suas credenciais.",
        variant: "destructive",
      });
      return;
    }

    if (!documentationComplete) {
      toast({
        title: "Documentação incompleta",
        description:
          "Você precisa completar o envio de documentos antes de gerar suas credenciais.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Gerar credencial profissional
      const { data: professionalCredential, error: professionalError } =
        await generateCredential("professional" as CredentialType, userData);

      if (professionalError) {
        throw professionalError;
      }

      // Gerar credencial de estudante
      const { data: studentCredential, error: studentError } =
        await generateCredential("student" as CredentialType, userData);

      if (studentError) {
        throw studentError;
      }

      toast({
        title: "Credenciais geradas com sucesso",
        description:
          "Suas credenciais digital profissional e de estudante foram geradas com sucesso.",
      });

      // Notificar o componente pai
      if (onCredentialGenerated && professionalCredential) {
        onCredentialGenerated(professionalCredential.id);
      }
    } catch (error) {
      console.error("Erro ao gerar credenciais:", error);
      toast({
        title: "Erro ao gerar credenciais",
        description:
          "Ocorreu um erro ao gerar suas credenciais. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getButtonContent = () => {
    if (alreadyGenerated) {
      return (
        <>
          <CheckCircle className="mr-2 h-4 w-4" /> Credenciais Geradas
        </>
      );
    }

    if (loading) {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando
          credenciais...
        </>
      );
    }

    return (
      <>
        <QrCode className="mr-2 h-4 w-4" /> Gerar Credenciais Digitais
      </>
    );
  };

  const getStatusMessage = () => {
    if (alreadyGenerated) {
      return (
        <p className="text-sm text-green-600">
          Suas credenciais já foram geradas. Você pode visualizá-las acima.
        </p>
      );
    }

    if (!paymentConfirmed) {
      return (
        <p className="text-sm text-amber-600">
          Você precisa confirmar seu pagamento antes de gerar suas credenciais.
        </p>
      );
    }

    if (!documentationComplete) {
      return (
        <p className="text-sm text-amber-600">
          Você precisa completar o envio de documentos antes de gerar suas
          credenciais.
        </p>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      {!alreadyGenerated ? (
        <Button
          onClick={handleGenerateCredential}
          disabled={loading || !paymentConfirmed || !documentationComplete}
          className="w-full"
        >
          {getButtonContent()}
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
          disabled
        >
          {getButtonContent()}
        </Button>
      )}

      {getStatusMessage()}
    </div>
  );
};

export default GenerateCredentialButton;
