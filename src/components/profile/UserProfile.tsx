import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, AlertCircle } from "lucide-react";
import DocumentsArchive from "./DocumentsArchive";
import PaymentStatus from "./PaymentStatus";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
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
              paymentConfirmed={paymentConfirmed}
              setPaymentConfirmed={setPaymentConfirmed}
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
  paymentConfirmed: boolean;
  setPaymentConfirmed: (confirmed: boolean) => void;
}

const AssociationStatusTab: React.FC<AssociationStatusTabProps> = ({
  userData,
  paymentConfirmed,
  setPaymentConfirmed,
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
        paymentConfirmed={paymentConfirmed}
        setPaymentConfirmed={setPaymentConfirmed}
      />
      {!paymentConfirmed && <PaymentWarning />}
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: PaymentStatusType }> = ({ status }) => (
  <Badge variant={status === "active" ? "default" : "destructive"}>
    {status === "active" ? "Ativo" : "Suspenso"}
  </Badge>
);

const PaymentWarning: React.FC = () => (
  <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Acesso às credenciais bloqueado</AlertTitle>
    <AlertDescription>
      Você precisa confirmar seu pagamento para ter acesso às suas credenciais digitais.
    </AlertDescription>
  </Alert>
);

interface StatusCardProps {
  userData: UserProfileProps["userData"];
}

const StatusCard: React.FC<StatusCardProps> = ({ userData }) => (
  <Card className="bg-white">
    <CardContent className="pt-6">
      <h3 className="font-semibold mb-4">Status da Associação</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">ID do Membro</p>
          <p className="font-medium">{userData.memberId}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Data de Início</p>
          <p className="font-medium">{userData.memberSince}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <StatusBadge status={userData.paymentStatus} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default UserProfile;
