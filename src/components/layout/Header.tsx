import { Shield, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import AdminLoginModal from "./admin/AdminLoginModal";
import { Link } from "react-router-dom";

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Clicou no Shield");
    setIsLoginModalOpen(true);
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/">
          <img src="/UBPTC Logo" alt="UBPTC Logo" className="h-8" />
        </Link>

        {/* Barra de busca */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="Buscar recursos, eventos, membros..."
            className="w-full px-4 py-2 rounded-full bg-gray-100"
          />
        </div>

        {/* Botões da direita */}
        <div className="flex items-center gap-4">
          <Button variant="primary">Associe-se</Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAdminClick}
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
