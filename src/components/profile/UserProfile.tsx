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
import { UserData } from "@/types/user";

interface UserProfileProps {
  userData?: UserData;
  onBack?: () => void;
}

const defaultUserData: UserData = {
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

const UserProfile = ({
  userData = defaultUserData,
  onBack = () => {},
}: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showQrInfo, setShowQrInfo] = useState(false);
  const [credentialType, setCredentialType] = useState<"professional" | "student">("professional");
  const [documentsComplete, setDocumentsComplete] = useState(false);
  const [asaasConfirmed, setAsaasConfirmed] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | undefined>(userData.avatarUrl);

  const handleQrCodeClick = (type: "professional" | "student") => {
    setCredentialType(type);
    setShowQrInfo(true);
  };

  const handleDocumentsComplete = (complete: boolean) => {
    setDocumentsComplete(complete);
    console.log("Documentos completos:", complete);
  };

  React.useEffect(() => {
    const handlePhotoUpload = (event: CustomEvent<{ photoUrl: string }>) => {
      const { photoUrl } = event.detail;
      setUserPhoto(photoUrl);
    };

    window.addEventListener("photo3x4Uploaded", handlePhotoUpload as EventListener);

    return () => {
      window.removeEventListener("photo3x4Uploaded", handlePhotoUpload as EventListener);
    };
  }, []);

  // ... rest of the component remains the same ...
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-4">
        {/* ... existing CardHeader content ... */}
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* ... existing Tabs content ... */}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
