import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, Download } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CredentialType } from "@/types/dashboard";

interface CredentialUserData {
  name: string;
  cpf: string;
  profession?: string;
  specialization?: string;
  memberId: string;
  memberSince: string;
  avatarUrl?: string;
  paymentStatus: "active" | "suspended";
}

interface CredentialCardProps {
  type: CredentialType;
  userData: CredentialUserData;
  onQrCodeClick: (type: CredentialType) => void;
}

interface StyleConfig {
  border: string;
  background: string;
  textColor: string;
  title: string;
}

const getStyleConfig = (type: CredentialType): StyleConfig => ({
  border: type === "professional" ? "border-primary/20" : "border-blue-200",
  background: type === "professional" ? "bg-primary" : "bg-blue-500",
  textColor: type === "professional" ? "text-primary" : "text-blue-500",
  title: type === "professional" ? "Credencial Profissional" : "Credencial de Estudante"
});

const CredentialCard: React.FC<CredentialCardProps> = ({
  type,
  userData,
  onQrCodeClick,
}) => {
  const styles = getStyleConfig(type);
  const isProfessional = type === "professional";

  const getInitials = (name: string): string => 
    name.split(" ").map((part) => part[0]).join("");

  const renderHeader = () => (
    <div className={`${styles.background} text-white p-4`}>
      <h3 className="font-bold">{styles.title}</h3>
    </div>
  );

  const renderUserInfo = () => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userData.avatarUrl} alt={userData.name} />
          <AvatarFallback className={`${styles.background} text-white`}>
            {getInitials(userData.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">{userData.name}</p>
          <p className="text-xs text-muted-foreground">
            {isProfessional ? userData.profession : "Estudante UBPTC"}
          </p>
        </div>
      </div>
      <div 
        className="cursor-pointer" 
        onClick={() => onQrCodeClick(type)}
        role="button"
        aria-label="Mostrar QR Code"
      >
        <QrCode className={`h-10 w-10 ${styles.textColor}`} />
      </div>
    </div>
  );

  const renderCredentialDetails = () => (
    <div className="space-y-2 mt-4">
      <DetailRow label="CPF" value={userData.cpf} />
      <DetailRow 
        label={`ID ${isProfessional ? "Profissional" : "Estudante"}`}
        value={isProfessional ? userData.memberId : `EST-${userData.memberId}`}
      />
      {isProfessional && userData.specialization && (
        <DetailRow label="Especialização" value={userData.specialization} />
      )}
      {!isProfessional && (
        <DetailRow label="Curso" value="Formação Continuada UBPTC" />
      )}
    </div>
  );

  const renderFooter = () => (
    <div className="mt-6 flex justify-between items-center">
      <div>
        <p className="text-xs text-muted-foreground">
          {isProfessional
            ? `Emitido em: ${userData.memberSince}`
            : `Válido até: 31/12/${new Date().getFullYear()}`}
        </p>
        <Badge
          variant={userData.paymentStatus === "active" ? "default" : "destructive"}
          className="mt-1"
        >
          {userData.paymentStatus === "active" ? "Ativo" : "Suspenso"}
        </Badge>
      </div>
      <DownloadButtons />
    </div>
  );

  return (
    <Card className={`border-2 ${styles.border} overflow-hidden`}>
      {renderHeader()}
      <CardContent className="pt-6">
        {renderUserInfo()}
        {renderCredentialDetails()}
        {renderFooter()}
      </CardContent>
    </Card>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-sm font-medium">{label}:</span>
    <span className="text-sm">{value}</span>
  </div>
);

const DownloadButtons: React.FC = () => (
  <div className="flex gap-2">
    <Button size="sm" className="gap-1">
      <Download className="h-4 w-4" /> PDF
    </Button>
    <Button size="sm" variant="outline" className="gap-1">
      <Download className="h-4 w-4" /> Imagem
    </Button>
  </div>
);

export default CredentialCard;
