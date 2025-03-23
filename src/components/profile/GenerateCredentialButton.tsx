import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, Loader2, CheckCircle } from "lucide-react";
import { useCredentials } from "@/lib/hooks";
import { useToast } from "@/components/ui/use-toast";
import { CredentialType } from "@/types/dashboard";

interface CredentialUserData {
  id: string;
  name: string;
  cpf: string;
  profession: string;
  specialization: string;
  memberSince: string;
  memberId: string;
  avatarUrl?: string;
}

interface GenerateCredentialButtonProps {
  userData: CredentialUserData;
  paymentConfirmed: boolean;
  documentationComplete: boolean;
  onCredentialGenerated?: (credentialId: string) => void;
  alreadyGenerated?: boolean;
}

interface ButtonState {
  loading: boolean;
  disabled: boolean;
  variant: "default" | "outline";
  className: string;
  content: JSX.Element;
}

const defaultProps = {
  onCredentialGenerated: (credentialId: string) => {},
  alreadyGenerated: false,
};

const GenerateCredentialButton: React.FC<GenerateCredentialButtonProps> = ({
  userData,
  paymentConfirmed,
  documentationComplete,
  onCredentialGenerated = defaultProps.onCredentialGenerated,
  alreadyGenerated = defaultProps.alreadyGenerated,
}) => {
  const [loading, setLoading] = useState(false);
  const { generateCredential } = useCredentials();
  const { toast } = useToast();

  const validateRequirements = (): string | null => {
    if (!paymentConfirmed) {
      return "Você precisa confirmar seu pagamento antes de gerar suas credenciais.";
    }
    if (!documentationComplete) {
      return "Você precisa completar o envio de documentos antes de gerar suas credenciais.";
    }
    return null;
  };

  const handleGenerateCredential = async () => {
    const validationError = validateRequirements();
    if (validationError) {
      toast({
        title: validationError.includes("pagamento") ? "Pagamento pendente" : "Documentação incompleta",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const credentialTypes: CredentialType[] = ["professional", "student"];
      const credentials = await Promise.all(
        credentialTypes.map(async (type) => {
          const { data, error } = await generateCredential(type, userData);
          if (error) throw error;
          return data;
        })
      );

      toast({
        title: "Credenciais geradas com sucesso",
        description: "Suas credenciais digital profissional e de estudante foram geradas com sucesso.",
      });

      if (onCredentialGenerated && credentials[0]) {
        onCredentialGenerated(credentials[0].id);
      }
    } catch (error) {
      console.error("Erro ao gerar credenciais:", error);
      toast({
        title: "Erro ao gerar credenciais",
        description: "Ocorreu um erro ao gerar suas credenciais. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getButtonState = (): ButtonState => {
    if (alreadyGenerated) {
      return {
        loading: false,
        disabled: true,
        variant: "outline",
        className: "w-full bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700",
        content: (
          <>
            <CheckCircle className="mr-2 h-4 w-4" /> Credenciais Geradas
          </>
        ),
      };
    }

    if (loading) {
      return {
        loading: true,
        disabled: true,
        variant: "default",
        className: "w-full",
        content: (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando credenciais...
          </>
        ),
      };
    }

    return {
      loading: false,
      disabled: !paymentConfirmed || !documentationComplete,
      variant: "default",
      className: "w-full",
      content: (
        <>
          <QrCode className="mr-2 h-4 w-4" /> Gerar Credenciais Digitais
        </>
      ),
    };
  };

  const getStatusMessage = () => {
    if (alreadyGenerated) {
      return (
        <p className="text-sm text-green-600">
          Suas credenciais já foram geradas. Você pode visualizá-las acima.
        </p>
      );
    }

    const validationError = validateRequirements();
    if (validationError) {
      return (
        <p className="text-sm text-amber-600">
          {validationError}
        </p>
      );
    }

    return null;
  };

  const buttonState = getButtonState();

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGenerateCredential}
        disabled={buttonState.disabled}
        variant={buttonState.variant}
        className={buttonState.className}
      >
        {buttonState.content}
      </Button>

      {getStatusMessage()}
    </div>
  );
};

export default GenerateCredentialButton;
