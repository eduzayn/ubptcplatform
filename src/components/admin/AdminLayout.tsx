import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import AdminSidebar from "./AdminSidebar";
import AdminLoginModal from "./AdminLoginModal";
import ProtectedRoute from "./ProtectedRoute";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
        throw new Error('Falha na autenticação');
      }

      const { token, user } = await response.json();
      localStorage.setItem('adminToken', token);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col h-screen">
          <Navbar
            onMenuToggle={toggleSidebar}
            username="Administrador"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
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

        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
