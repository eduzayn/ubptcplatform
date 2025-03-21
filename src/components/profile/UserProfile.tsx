import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { QrCode, Download, ArrowLeft, AlertCircle } from "lucide-react";
import DocumentsArchive from "./DocumentsArchive";
import PaymentStatus from "./PaymentStatus";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface UserData {
  id: string;
  name: string;
  email: string;
  cpf: string;
  profession: string;
  institution: string;
  graduationYear: string;
  specialization: string;
  memberSince: string;
  memberId: string;
  paymentStatus: "active" | "suspended";
  avatarUrl?: string;
}

interface UserProfileProps {
  userData?: UserData;
  onBack?: () => void;
}

const UserProfile = ({
  userData = {
    id: "123456",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    cpf: "123.456.789-00",
    profession: "Psicóloga",
    institution: "Universidade Federal",
    graduationYear: "2018",
    specialization: "Psicanálise",
    memberSince: "15 de Janeiro, 2023",
    memberId: "UBPTC-2023-7845",
    paymentStatus: "active",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  },
  onBack = () => {},
}: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showQrInfo, setShowQrInfo] = useState(false);
  const [credentialType, setCredentialType] = useState<
    "professional" | "student"
  >("professional");
  const [documentsComplete, setDocumentsComplete] = useState(false);
  const [asaasConfirmed, setAsaasConfirmed] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | undefined>(
    userData.avatarUrl,
  );

  const handleQrCodeClick = (type: "professional" | "student") => {
    setCredentialType(type);
    setShowQrInfo(true);
  };

  const handleDocumentsComplete = (complete: boolean) => {
    setDocumentsComplete(complete);
    console.log("Documentos completos:", complete);
  };

  // Escutar evento de upload de foto 3x4
  React.useEffect(() => {
    const handlePhotoUpload = (event: any) => {
      const { photoUrl } = event.detail;
      setUserPhoto(photoUrl);
    };

    window.addEventListener("photo3x4Uploaded", handlePhotoUpload);

    return () => {
      window.removeEventListener("photo3x4Uploaded", handlePhotoUpload);
    };
  }, []);

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl font-bold">
            Perfil do Associado
          </CardTitle>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userPhoto} alt={userData.name} />
            <AvatarFallback className="bg-primary text-white text-lg">
              {userData.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-sm text-muted-foreground">
              Membro desde {userData.memberSince}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={
                  userData.paymentStatus === "active"
                    ? "default"
                    : "destructive"
                }
              >
                {userData.paymentStatus === "active" ? "Ativo" : "Suspenso"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                ID: {userData.memberId}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="association">Status da Associação</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Nome Completo
                </h3>
                <p className="font-medium">{userData.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Profissão
                </h3>
                <p className="font-medium">{userData.profession}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Email
                </h3>
                <p className="font-medium">{userData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Instituição de Formação
                </h3>
                <p className="font-medium">{userData.institution}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  CPF
                </h3>
                <p className="font-medium">{userData.cpf}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Ano de Formação
                </h3>
                <p className="font-medium">{userData.graduationYear}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Especialização
                </h3>
                <p className="font-medium">{userData.specialization}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="association" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-muted">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">
                        Status da Associação
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Informações sobre sua associação com a UBPTC
                      </p>
                    </div>
                    <Badge
                      variant={
                        userData.paymentStatus === "active"
                          ? "default"
                          : "destructive"
                      }
                      className="px-3 py-1 text-sm"
                    >
                      {userData.paymentStatus === "active"
                        ? "Ativo"
                        : "Suspenso"}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-md bg-muted/50">
                      <h4 className="font-medium mb-2">Detalhes do Status</h4>
                      {userData.paymentStatus === "active" ? (
                        <div className="space-y-2">
                          <p className="text-sm">
                            Sua associação está{" "}
                            <span className="font-bold text-green-600">
                              ativa
                            </span>
                            . Todos os pagamentos estão em dia.
                          </p>
                          <p className="text-sm">
                            Você tem acesso completo a todos os benefícios da
                            UBPTC.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm">
                            Sua associação está{" "}
                            <span className="font-bold text-red-600">
                              suspensa
                            </span>{" "}
                            devido a pagamentos pendentes.
                          </p>
                          <p className="text-sm">
                            Para reativar sua associação, por favor regularize
                            seus pagamentos.
                          </p>
                          <Button className="mt-2">
                            Regularizar Pagamentos
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-md bg-muted/50">
                      <h4 className="font-medium mb-2">
                        Histórico de Pagamentos
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Maio 2023</span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600 hover:bg-green-50"
                          >
                            Pago
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Abril 2023</span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600 hover:bg-green-50"
                          >
                            Pago
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Março 2023</span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600 hover:bg-green-50"
                          >
                            Pago
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <PaymentStatus
                  status={userData.paymentStatus}
                  paymentDate="01/05/2023"
                  nextPaymentDate="01/06/2023"
                  paymentMethod="Cartão de crédito"
                  paymentId="pay_123456"
                  onUpdatePayment={() =>
                    console.log("Atualizar método de pagamento")
                  }
                  asaasConfirmed={asaasConfirmed}
                  setAsaasConfirmed={setAsaasConfirmed}
                />

                {!asaasConfirmed && (
                  <Alert
                    variant="warning"
                    className="bg-amber-50 text-amber-800 border-amber-200"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Acesso às credenciais bloqueado</AlertTitle>
                    <AlertDescription>
                      Você precisa confirmar seu pagamento no Asaas para ter
                      acesso às suas credenciais digitais.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <DocumentsArchive />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
