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
<<<<<<< HEAD
  onCredentialGenerated?: (credentialId: string) => void;
  alreadyGenerated?: boolean;
=======
  onCredentialGenerated: (credentialId: string) => void;
  alreadyGenerated: boolean;
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
}

const GenerateCredentialButton = ({
  userData,
  paymentConfirmed,
  documentationComplete,
  onCredentialGenerated,
<<<<<<< HEAD
  alreadyGenerated = false,
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
=======
  alreadyGenerated,
}: GenerateCredentialButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateCredential, loading } = useCredentials();
  const { toast } = useToast();

  const handleGenerateCredential = async () => {
    if (!paymentConfirmed || !documentationComplete || alreadyGenerated) {
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
      return;
    }

    try {
<<<<<<< HEAD
      setLoading(true);
=======
      setIsGenerating(true);
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e

      // Gerar credencial profissional
      const { data: professionalCredential, error: professionalError } =
        await generateCredential("professional", userData);

<<<<<<< HEAD
      if (professionalError) {
        throw professionalError;
      }
=======
      if (professionalError) throw professionalError;
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e

      // Gerar credencial de estudante
      const { data: studentCredential, error: studentError } =
        await generateCredential("student", userData);

<<<<<<< HEAD
      if (studentError) {
        throw studentError;
=======
      if (studentError) throw studentError;

      // Notificar o componente pai
      if (professionalCredential) {
        onCredentialGenerated(professionalCredential.id);
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
      }

      toast({
        title: "Credenciais geradas com sucesso",
        description:
<<<<<<< HEAD
          "Suas credenciais digital profissional e de estudante foram geradas com sucesso.",
      });

      // Notificar o componente pai
      if (onCredentialGenerated && professionalCredential) {
        onCredentialGenerated(professionalCredential.id);
      }
=======
          "Suas credenciais digital e de estudante foram geradas e estão disponíveis para uso.",
      });
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
    } catch (error) {
      console.error("Erro ao gerar credenciais:", error);
      toast({
        title: "Erro ao gerar credenciais",
<<<<<<< HEAD
        description:
          "Ocorreu um erro ao gerar suas credenciais. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!alreadyGenerated ? (
        <Button
          onClick={handleGenerateCredential}
          disabled={loading || !paymentConfirmed || !documentationComplete}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando
              credenciais...
            </>
          ) : (
            <>
              <QrCode className="mr-2 h-4 w-4" /> Gerar Credenciais Digitais
            </>
          )}
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
          disabled
        >
          <CheckCircle className="mr-2 h-4 w-4" /> Credenciais Geradas
        </Button>
      )}

      {!paymentConfirmed && (
        <p className="text-sm text-amber-600">
          Você precisa confirmar seu pagamento antes de gerar suas credenciais.
        </p>
      )}

      {!documentationComplete && paymentConfirmed && (
        <p className="text-sm text-amber-600">
          Você precisa completar o envio de documentos antes de gerar suas
          credenciais.
        </p>
      )}

      {alreadyGenerated && (
        <p className="text-sm text-green-600">
          Suas credenciais já foram geradas. Você pode visualizá-las acima.
        </p>
      )}
    </div>
=======
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
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
  );
};

export default GenerateCredentialButton;
