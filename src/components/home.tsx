import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import MembershipOverview from "./dashboard/MembershipOverview";
import UpcomingEvents from "./dashboard/UpcomingEvents";
import RecommendedContent from "./dashboard/RecommendedContent";
import CertificationTracker from "./dashboard/CertificationTracker";
import CommunityHighlights from "./dashboard/CommunityHighlights";
import AuthModal from "./auth/AuthModal";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Alterna a visibilidade da barra lateral (para responsividade mobile)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  // Função de login simulada
  const handleLogin = (isAdmin: boolean = false) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);

    // Redirecionar para o painel administrativo se for admin
    if (isAdmin) {
      navigate("/admin");
    }
  };

  // Função de logout simulada
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal de Autenticação - mostrado quando o usuário não está autenticado */}
      {!isAuthenticated && (
        <AuthModal defaultOpen={true} onSuccess={handleLogin} />
      )}

      {/* Layout Principal */}
      <div className="flex flex-col h-screen">
        {/* Barra de Navegação Superior */}
        <Navbar
          onMenuToggle={toggleSidebar}
          username="Maria Silva"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
          notificationCount={5}
          isAdmin={true}
        />

        {/* Área de Conteúdo Principal com Barra Lateral */}
        <div className="flex flex-1 overflow-hidden">
          {/* Barra Lateral - mostrada condicionalmente com base no estado e tamanho da tela */}
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <Sidebar />
          </div>

          {/* Conteúdo Principal do Painel */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Card de Visão Geral da Assinatura */}
              <MembershipOverview
                memberSince="15 de Janeiro, 2023"
                subscriptionStatus="active"
                nextBillingDate="15 de Junho, 2023"
                certificationProgress={25}
                membershipType="standard"
                paymentMethod="Cartão terminando em 4242"
              />

              {/* Layout de duas colunas para a seção do meio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coluna Esquerda */}
                <UpcomingEvents />

                {/* Coluna Direita */}
                <RecommendedContent />
              </div>

              {/* Layout de duas colunas para a seção inferior */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coluna Esquerda */}
                <CertificationTracker
                  membershipMonths={3}
                  certificationEligible={false}
                />

                {/* Coluna Direita */}
                <CommunityHighlights />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
