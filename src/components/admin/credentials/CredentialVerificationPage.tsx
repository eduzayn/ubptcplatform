import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Shield, Clock } from "lucide-react";
import CredentialVerifier from "@/components/profile/CredentialVerifier";

interface VerificationHistoryItem {
  id: string;
  timestamp: Date;
  credentialId: string;
  memberName: string;
  credentialType: "professional" | "student";
  isValid: boolean;
}

const CredentialVerificationPage = () => {
  const [verificationHistory, setVerificationHistory] = useState<
    VerificationHistoryItem[]
  >([]);

  const handleVerificationSuccess = (data: any) => {
    // Add to verification history
    const newVerification: VerificationHistoryItem = {
      id: `verification-${Date.now()}`,
      timestamp: new Date(),
      credentialId: data.credential.credentialId,
      memberName: data.profile.name,
      credentialType: data.credential.type,
      isValid: data.valid,
    };

    setVerificationHistory([newVerification, ...verificationHistory]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Verificação de Credenciais</h1>
      </div>

      <Tabs defaultValue="verify">
        <TabsList className="mb-6">
          <TabsTrigger value="verify" className="flex items-center gap-2">
            <QrCode className="h-4 w-4" /> Verificar Credencial
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Histórico de Verificações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verify">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <CredentialVerifier onScanSuccess={handleVerificationSuccess} />
            </div>
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Informações de Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">
                      Sobre as Credenciais Digitais
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      As credenciais digitais da UBPTC são documentos oficiais
                      que identificam os membros da associação. Cada credencial
                      possui um código QR único que pode ser verificado para
                      confirmar sua autenticidade.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Recursos de Segurança</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Código QR criptografado único para cada membro</li>
                      <li>Verificação em tempo real com o banco de dados</li>
                      <li>Validação do status de pagamento do membro</li>
                      <li>Registro de todas as verificações realizadas</li>
                      <li>Expiração automática de credenciais inativas</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-md bg-amber-50 border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-1">
                      Importante
                    </h4>
                    <p className="text-sm text-amber-700">
                      Sempre verifique a identidade do portador da credencial
                      comparando a foto e os dados pessoais. Em caso de suspeita
                      de fraude, entre em contato com a administração da UBPTC
                      imediatamente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Verificações</CardTitle>
            </CardHeader>
            <CardContent>
              {verificationHistory.length > 0 ? (
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">
                          Data/Hora
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Membro
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          ID Credencial
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Tipo
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {verificationHistory.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3 px-4 text-sm">
                            {item.timestamp.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">
                            {item.memberName}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {item.credentialId}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {item.credentialType === "professional"
                              ? "Profissional"
                              : "Estudante"}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {item.isValid ? "Válida" : "Inválida"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhuma verificação realizada ainda.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CredentialVerificationPage;
