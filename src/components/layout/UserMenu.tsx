import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  User,
  CreditCard,
  Award,
  Settings,
  Shield,
} from "lucide-react";

interface UserMenuProps {
  username: string;
  avatarUrl?: string;
  notificationCount?: number;
  isAdmin?: boolean;
}

const UserMenu = ({
  username,
  avatarUrl,
  notificationCount = 0,
  isAdmin = false,
}: UserMenuProps) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (tab: string) => {
    switch (tab) {
      case "profile":
        navigate("/profile?tab=personal");
        break;
      case "association":
        navigate("/profile?tab=payment");
        break;
      case "credentials":
        navigate("/profile?tab=credentials");
        break;
      case "settings":
        navigate("/profile?tab=settings");
        break;
      case "logout":
        // Implementar lógica de logout aqui
        console.log("Logout clicked");
        break;
      default:
        navigate("/profile");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-primary text-white">
              {username
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium hidden md:inline-block">{username}</span>
          {notificationCount > 0 && (
            <div className="relative">
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notificationCount}
              </div>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleMenuItemClick("profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("association")}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Status da Associação</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleMenuItemClick("credentials")}>
            <Award className="mr-2 h-4 w-4" />
            <span>Credenciais Digitais</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações da Conta</span>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem onClick={() => navigate("/admin")}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Painel Administrativo</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleMenuItemClick("logout")}
          className="text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
