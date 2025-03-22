import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Search, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useVerifyCredential } from "@/lib/hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CredentialVerifierProps {
  onScanSuccess?: (data: any) => void;
}

const CredentialVerifier = ({ onScanSuccess }: CredentialVerifierProps) => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const { verifyCredential, loading, error } = useVerifyCredential();

  const handleVerify = async () => {
    if (!qrCodeData.trim()) return;

    // Mostrar feedback de carregamento
    setVerificationResult(null);

    const { data, error } = await verifyCredential(qrCodeData);

    if (error) {
      console.error("Erro na verificação:", error);
      setVerificationResult({
        valid: false,
        message:
          error.message ||
          "Erro ao verificar credencial. Por favor, tente novamente.",
      });
      return;
    }

    console.log("Resultado da verificação:", data);
    setVerificationResult(data);
    if (data.valid && onScanSuccess) {
      onScanSuccess(data);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          Verificador de Credenciais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Digite o código QR da credencial ou escaneie-o para verificar sua
            autenticidade.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Digite o código QR"
                value={qrCodeData}
                onChange={(e) => setQrCodeData(e.target.value)}
                className="pr-10"
              />
              {loading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
            <Button
              onClick={handleVerify}
              disabled={loading || !qrCodeData.trim()}
            >
              <Search className="h-4 w-4 mr-2" /> Verificar
            </Button>
          </div>
        </div>

        {verificationResult && (
          <div className="mt-4">
            {verificationResult.valid ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Credencial Válida</AlertTitle>
                <AlertDescription>
                  <div className="space-y-2 mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Nome:</span>{" "}
                      {verificationResult.profile.name}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Tipo:</span>{" "}
                      {verificationResult.credential.type === "professional"
                        ? "Profissional"
                        : "Estudante"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">ID:</span>{" "}
                      {verificationResult.credential.credentialId}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Emitido em:</span>{" "}
                      {new Date(
                        verificationResult.credential.issuedAt,
                      ).toLocaleDateString()}
                    </p>
                    {verificationResult.credential.expiresAt && (
                      <p className="text-sm">
                        <span className="font-medium">Válido até:</span>{" "}
                        {new Date(
                          verificationResult.credential.expiresAt,
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-red-50 border-red-200">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertTitle>Credencial Inválida</AlertTitle>
                <AlertDescription>
                  {verificationResult.message ||
                    "Esta credencial não é válida ou não foi encontrada."}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="mt-4 p-4 rounded-md bg-muted/50">
          <h4 className="text-sm font-medium mb-2">
            Como verificar uma credencial?
          </h4>
          <ol className="text-sm text-muted-foreground list-decimal pl-4 space-y-1">
            <li>Peça ao membro para mostrar o QR code da credencial</li>
            <li>Escaneie o QR code ou digite o código manualmente</li>
            <li>Clique em "Verificar" para confirmar a autenticidade</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialVerifier;
