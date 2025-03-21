import React, { useState } from "react";
import { Button } from "../ui/button";
import { QrCode, Loader2, CheckCircle } from "lucide-react";
import { useCredentials } from "@/lib/hooks";
import { useToast } from "../ui/use-toast";

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
  onCredentialGenerated: (credentialId: string) => void;
  alreadyGenerated: boolean;
}

const GenerateCredentialButton = ({
  userData,
  paymentConfirmed,
  documentationComplete,
  onCredentialGenerated,
  alreadyGenerated,
}: GenerateCredentialButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateCredential, loading } = useCredentials();
  const { toast } = useToast();

  const handleGenerateCredential = async () => {
    if (!paymentConfirmed || !documentationComplete || alreadyGenerated) {
      return;
    }

    try {
      setIsGenerating(true);

      // Gerar credencial profissional
      const { data: professionalCredential, error: professionalError } =
        await generateCredential("professional", userData);

      if (professionalError) throw professionalError;

      // Gerar credencial de estudante
      const { data: studentCredential, error: studentError } =
        await generateCredential("student", userData);

      if (studentError) throw studentError;

      // Notificar o componente pai
      if (professionalCredential) {
        onCredentialGenerated(professionalCredential.id);
      }

      toast({
        title: "Credenciais geradas com sucesso",
        description:
          "Suas credenciais digital e de estudante foram geradas e estão disponíveis para uso.",
      });
    } catch (error) {
      console.error("Erro ao gerar credenciais:", error);
      toast({
        title: "Erro ao gerar credenciais",
        description: `Ocorreu um erro ao gerar suas credenciais: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled =
    !paymentConfirmed || !documentationComplete || alreadyGenerated;

  if (alreadyGenerated) {
    return (
      <Button className="w-full gap-2" variant="outline" disabled>
        <CheckCircle className="h-4 w-4 mr-2" />
        Credenciais já geradas
      </Button>
    );
  }

  return (
    <Button
      onClick={handleGenerateCredential}
      disabled={isDisabled || isGenerating || loading}
      className="w-full"
    >
      {isGenerating || loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando
          Credenciais...
        </>
      ) : (
        <>
          <QrCode className="mr-2 h-4 w-4" />
          {alreadyGenerated
            ? "Credencial já gerada"
            : !paymentConfirmed
              ? "Pagamento pendente"
              : !documentationComplete
                ? "Documentação incompleta"
                : "Gerar Credencial Digital"}
        </>
      )}
    </Button>
  );
};

export default GenerateCredentialButton;
