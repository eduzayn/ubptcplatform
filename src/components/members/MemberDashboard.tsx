import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Award, Users } from "lucide-react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import MembershipOverview from "../dashboard/MembershipOverview";
import RecommendedContent from "../dashboard/RecommendedContent";
import UpcomingEvents from "../dashboard/UpcomingEvents";
import CertificationTracker from "../dashboard/CertificationTracker";
import CommunityHighlights from "../dashboard/CommunityHighlights";

const MemberDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={toggleSidebar}
          username="João Silva"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Member"
          notificationCount={3}
          isAdmin={false}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold">Bem-vindo, João</h1>

<MembershipOverview
  memberSince="01/01/2023"
  membershipStatus="active"  // Padronizando para usar membershipStatus
  nextPayment="01/06/2023"  // Padronizando para usar nextPayment
  certificationProgress={65}
/>


interface MembershipOverviewProps {
  memberSince: string;
  membershipStatus: "active" | "suspended" | "pending";  // Definindo os valores possíveis
  nextPayment: string;
  certificationProgress: number;
}

const MemberDashboard = () => {
  // ... resto do código ...
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Conteúdo Recomendado
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecommendedContent />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Próximos Eventos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UpcomingEvents />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Progresso de Certificação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CertificationTracker />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Destaques da Comunidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CommunityHighlights />
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
