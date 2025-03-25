import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Upload,
  Menu,
  Shield,
  Bell
} from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: string;
  lastModified: string;
}

const ContentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dummyContent: ContentItem[] = [
    {
      id: "1",
      title: "Introdução à Psicanálise",
      type: "Curso",
      status: "Publicado",
      lastModified: "2024-02-20"
    },
    // Adicione mais itens conforme necessário
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar conteúdo..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Conteúdo
            </Button>
          </div>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4">Título</th>
                  <th className="text-left p-4">Tipo</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Última Modificação</th>
                  <th className="text-right p-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {dummyContent.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4">{item.title}</td>
                    <td className="p-4">{item.type}</td>
                    <td className="p-4">{item.status}</td>
                    <td className="p-4">{item.lastModified}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
