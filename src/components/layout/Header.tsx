import { Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AdminLoginModal from "@/components/admin/AdminLoginModal";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove qualquer token existente
    localStorage.removeItem('adminToken');
    
    // Força a abertura do modal
    setIsLoginModalOpen(true);
    
    // Previne a navegação
    if (e.target instanceof HTMLElement) {
      const link = e.target.closest('a');
      if (link) {
        e.preventDefault();
      }
    }
    
    // Se tentar navegar para /admin, impede
    if (window.location.pathname.includes('/admin')) {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <img 
            src="/UBPTC-logo.png" 
            alt="UBPTC Logo" 
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex-1 mx-8">
          <input
            type="search"
            placeholder="Buscar recursos, eventos, membros..."
            className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Associe-se
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          {/* Mudança importante aqui: removido qualquer Link em volta do botão */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAdminClick}
            className="hover:bg-gray-100"
          >
            <Shield className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
}

export default Header;
