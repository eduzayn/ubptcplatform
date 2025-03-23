import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft, AlertCircle } from "lucide-react";
import DocumentsArchive from "./DocumentsArchive";
import PaymentStatus from "./PaymentStatus";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { UserProfile as UserProfileType, PaymentStatusType } from "@/types/dashboard";

interface UserProfileProps {
  userData?: UserProfileType & {
    memberId: string;
    memberSince: string;
    paymentStatus: PaymentStatusType;
  };
  onBack?: () => void;
}

const defaultUserData: UserProfileProps["userData"] = {
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
};

const UserProfile: React.FC<UserProfileProps> = ({
  userData = defaultUserData,
  onBack = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [asaasConfirmed, setAsaasConfirmed] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | undefined>(userData.avatarUrl);

  useEffect(() => {
    const handlePhotoUpload = (event: CustomEvent<{ photoUrl: string }>) => {
      setUserPhoto(event.detail.photoUrl);
    };

    window.addEventListener("photo3x4Uploaded", handlePhotoUpload as EventListener);
    return () => {
      window.removeEventListener("photo3x4Uploaded", handlePhotoUpload as EventListener);
    };
  }, []);

  return (
    <Card className="w-full bg-white shadow-sm">
      <ProfileHeader 
        userData={userData}
        userPhoto={userPhoto}
        onBack={onBack}
      />

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="association">Status da Associação</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoTab userData={userData} />
          </TabsContent>

          <TabsContent value="association">
            <AssociationStatusTab 
              userData={userData}
              asaasConfirmed={asaasConfirmed}
              setAsaasConfirmed={setAsaasConfirmed}
            />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsArchive />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface ProfileHeaderProps {
  userData: UserProfileProps["userData"];
  userPhoto?: string;
  onBack: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData, userPhoto, onBack }) => (
  <CardHeader className="pb-4">
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <CardTitle className="text-xl font-bold">Perfil do Associado</CardTitle>
    </div>
    <div className="flex items-center gap-4 mt-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={userPhoto} alt={userData.name} />
        <AvatarFallback className="bg-primary text-white text-lg">
          {userData.name.split(" ").map((name) => name[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl font-bold">{userData.name}</h2>
        <p className="text-sm text-muted-foreground">
          Membro desde {userData.memberSince}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <StatusBadge status={userData.paymentStatus} />
          <span className="text-xs text-muted-foreground">
            ID: {userData.memberId}
          </span>
        </div>
      </div>
    </div>
  </CardHeader>
);

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-medium text-muted-foreground mb-1">{label}</h3>
    <p className="font-medium">{value}</p>
  </div>
);

const PersonalInfoTab: React.FC<{ userData: UserProfileProps["userData"] }> = ({ userData }) => (
  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
    <InfoItem label="Nome Completo" value={userData.name} />
    <InfoItem label="Profissão" value={userData.profession || ''} />
    <InfoItem label="Email" value={userData.email} />
    <InfoItem label="Instituição de Formação" value={userData.institution || ''} />
    <InfoItem label="CPF" value={userData.cpf} />
    <InfoItem label="Ano de Formação" value={userData.graduationYear || ''} />
    <div className="col-span-2">
      <InfoItem label="Especialização" value={userData.specialization || ''} />
    </div>
  </div>
);

interface AssociationStatusTabProps {
  userData: UserProfileProps["userData"];
  asaasConfirmed: boolean;
  setAsaasConfirmed: (confirmed: boolean) => void;
}

const AssociationStatusTab: React.FC<AssociationStatusTabProps> = ({
  userData,
  asaasConfirmed,
  setAsaasConfirmed,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <StatusCard userData={userData} />
    <div className="space-y-4">
      <PaymentStatus
        status={userData.paymentStatus}
        paymentDate="01/05/2023"
        nextPaymentDate="01/06/2023"
        paymentMethod="Cartão de crédito"
        paymentId="pay_123456"
        onUpdatePayment={() => console.log("Atualizar método de pagamento")}
        asaasConfirmed={asaasConfirmed}
        setAsaasConfirmed={setAsaasConfirmed}
      />
      {!asaasConfirmed && <AsaasWarning />}
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: PaymentStatusType }> = ({ status }) => (
  <Badge variant={status === "active" ? "default" : "destructive"}>
    {status === "active" ? "Ativo" : "Suspenso"}
  </Badge>
);

const AsaasWarning: React.FC = () => (
  <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Acesso às credenciais bloqueado</AlertTitle>
    <AlertDescription>
      Você precisa confirmar seu pagamento no Asaas para ter acesso às suas credenciais digitais.
    </AlertDescription>
  </Alert>
);

const StatusCard: React.FC<{ userData: UserProfileProps["userData"] }> = ({ userData }) => (
  <Card className="border-2 border-muted">
    <CardContent className="pt-6">
      <StatusCardHeader userData={userData} />
      <StatusDetails status={userData.paymentStatus} />
      <PaymentHistory />
    </CardContent>
  </Card>
);

// Componentes auxiliares do StatusCard
const StatusCardHeader: React.FC<{ userData: UserProfileProps["userData"] }> = ({ userData }) => (
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-lg font-bold">Status da Associação</h3>
      <p className="text-sm text-muted-foreground">
        Informações sobre sua associação com a UBPTC
      </p>
    </div>
    <StatusBadge status={userData.paymentStatus} />
  </div>
);

const StatusDetails: React.FC<{ status: PaymentStatusType }> = ({ status }) => (
  <div className="p-4 rounded-md bg-muted/50 mb-4">
    <h4 className="font-medium mb-2">Detalhes do Status</h4>
    {status === "active" ? (
      <ActiveStatusContent />
    ) : (
      <SuspendedStatusContent />
    )}
  </div>
);

const ActiveStatusContent: React.FC = () => (
  <div className="space-y-2">
    <p className="text-sm">
      Sua associação está <span className="font-bold text-green-600">ativa</span>.
      Todos os pagamentos estão em dia.
    </p>
    <p className="text-sm">
      Você tem acesso completo a todos os benefícios da UBPTC.
    </p>
  </div>
);

const SuspendedStatusContent: React.FC = () => (
  <div className="space-y-2">
    <p className="text-sm">
      Sua associação está <span className="font-bold text-red-600">suspensa</span> devido
      a pagamentos pendentes.
    </p>
    <p className="text-sm">
      Para reativar sua associação, por favor regularize seus pagamentos.
    </p>
    <Button className="mt-2">Regularizar Pagamentos</Button>
  </div>
);

const PaymentHistory: React.FC = () => (
  <div className="p-4 rounded-md bg-muted/50">
    <h4 className="font-medium mb-2">Histórico de Pagamentos</h4>
    <div className="space-y-2">
      {["Maio 2023", "Abril 2023", "Março 2023"].map((month) => (
        <PaymentHistoryItem key={month} month={month} />
      ))}
    </div>
  </div>
);

const PaymentHistoryItem: React.FC<{ month: string }> = ({ month }) => (
  <div className="flex justify-between text-sm">
    <span>{month}</span>
    <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
      Pago
    </Badge>
  </div>
);

export default UserProfile;
