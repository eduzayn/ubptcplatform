import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserData } from "@/types/user";
import UserProfile from "./UserProfile";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import DocumentUploadForm from "./DocumentUploadForm";
import DocumentsArchive from "./DocumentsArchive";
import PaymentStatus from "./PaymentStatus";
import MyCourses from "./MyCourses";
import ProfileSettings from "./ProfileSettings";
import DigitalCredentials from "./DigitalCredentials";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("personal");
  const [documentsComplete, setDocumentsComplete] = useState(false);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | undefined>(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
  );

  // ... existing code ...

  const userData: UserData = {
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
    avatarUrl: userPhotoUrl,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... existing code ... */}
      <TabsContent value="credentials" className="mt-6">
        <DigitalCredentials
          userData={{
            id: userData.id,
            name: userData.name,
            cpf: userData.cpf,
            profession: userData.profession,
            specialization: userData.specialization,
            memberSince: userData.memberSince,
            memberId: userData.memberId,
            paymentStatus: userData.paymentStatus,
            avatarUrl: userData.avatarUrl
          }}
          asaasConfirmed={true}
        />
      </TabsContent>
      {/* ... rest of the code ... */}
    </div>
  );
};

export default ProfilePage;
