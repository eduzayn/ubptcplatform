import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Calendar,
  Award,
  Users,
  Settings,
  LogOut,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      icon: <Home className="mr-2 h-5 w-5" />,
      label: "Painel",
      path: "/",
    },
    {
      icon: <Layers className="mr-2 h-5 w-5" />,
      label: "Cursos",
      path: "/courses",
    },
    {
      icon: <BookOpen className="mr-2 h-5 w-5" />,
      label: "Biblioteca Digital",
      path: "/library",
    },
    {
      icon: <Calendar className="mr-2 h-5 w-5" />,
      label: "Calendário de Eventos",
      path: "/events",
    },
    {
      icon: <Users className="mr-2 h-5 w-5" />,
      label: "Comunidade",
      path: "/community",
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
          <h2 className="text-xl font-bold text-primary">UBPTC</h2>
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
          <div className="rounded-md bg-muted p-4">
            <h3 className="mb-2 text-sm font-medium">Status da Assinatura</h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Ativa - R$49,90/mês
            </p>
            <div className="mb-2 flex items-center">
              <div className="mr-2 h-2 w-full rounded-full bg-muted-foreground/20">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <span className="text-xs font-medium">3/12</span>
            </div>
            <p className="text-xs text-muted-foreground">
              9 meses até elegibilidade para certificação
            </p>
          </div>

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

export default Sidebar;
