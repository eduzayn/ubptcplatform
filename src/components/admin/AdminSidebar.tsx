import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  FileText,
  BookOpen,
  Layers,
  Settings,
  Home,
  LogOut,
  Award,
  UserPlus,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  className?: string;
}

const AdminSidebar = ({ className = "" }: AdminSidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      icon: <Home className="mr-2 h-5 w-5" />,
      label: "Painel Administrativo",
      path: "/admin",
    },
    {
      icon: <Users className="mr-2 h-5 w-5" />,
      label: "Controle de Membros",
      path: "/admin/members",
    },
    {
      icon: <FileText className="mr-2 h-5 w-5" />,
      label: "Gestão de Conteúdo",
      path: "/admin/content",
    },
    {
      icon: <Layers className="mr-2 h-5 w-5" />,
      label: "Módulo de Cursos",
      path: "/admin/courses",
    },
    {
      icon: <BookOpen className="mr-2 h-5 w-5" />,
      label: "Biblioteca Digital",
      path: "/admin/library",
    },
    {
      icon: <Calendar className="mr-2 h-5 w-5" />,
      label: "Gestão de Eventos",
      path: "/admin/events",
    },
    {
      icon: <Award className="mr-2 h-5 w-5" />,
      label: "Credenciais Digitais",
      path: "/admin/credentials",
    },
    {
      icon: <UserPlus className="mr-2 h-5 w-5" />,
      label: "Usuários do Sistema",
      path: "/admin/users",
    },
    {
      icon: <Settings className="mr-2 h-5 w-5" />,
      label: "Configurações",
      path: "/admin/settings",
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-[280px] flex-col bg-white p-4 shadow-md",
        className,
      )}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-center py-4">
          <h2 className="text-xl font-bold text-primary">Painel Admin</h2>
        </div>

        <Separator />

        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-primary",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <Separator className="my-4" />
          <Link to="/">
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground"
            >
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Site
            </Button>
          </Link>
          <Button
            variant="outline"
            className="mt-4 w-full justify-start text-muted-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
