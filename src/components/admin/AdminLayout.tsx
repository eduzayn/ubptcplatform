import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import AdminSidebar from "./AdminSidebar";
import AdminLoginModal from "./AdminLoginModal";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState({
    username: "Administrador",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
  });

  useEffect(() => {
    // Verificar se já existe um token de autenticação
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setIsLoginModalOpen(true);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogin = async (email: string, cpf: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, cpf }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const { token, user } = await response.json();
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
      
      if (user) {
        setAdminData({
          username: user.name || "Administrador",
          avatarUrl: user.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
        });
      }
    } catch (error) {
      throw error;
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {}} // Não permitir fechar se não estiver autenticado
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={toggleSidebar}
          username={adminData.username}
          avatarUrl={adminData.avatarUrl}
          notificationCount={0}
          isAdmin={true}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <AdminSidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
