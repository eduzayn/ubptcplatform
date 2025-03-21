import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, UserPlus, Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const mockMembers = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@example.com",
    phone: "(11) 98765-4321",
    subscriptionPlan: "Standard",
    paymentMethod: "Cartão de Crédito",
    status: "Ativo",
    joinDate: "15/01/2023",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao.santos@example.com",
    phone: "(21) 98765-4321",
    subscriptionPlan: "Premium",
    paymentMethod: "Boleto Bancário",
    status: "Ativo",
    joinDate: "03/02/2023",
  },
  {
    id: 3,
    name: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    phone: "(31) 98765-4321",
    subscriptionPlan: "Standard",
    paymentMethod: "Cartão de Crédito",
    status: "Inativo",
    joinDate: "22/03/2023",
  },
  {
    id: 4,
    name: "Carlos Pereira",
    email: "carlos.pereira@example.com",
    phone: "(41) 98765-4321",
    subscriptionPlan: "Standard",
    paymentMethod: "Pix",
    status: "Pendente",
    joinDate: "10/04/2023",
  },
  {
    id: 5,
    name: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    phone: "(51) 98765-4321",
    subscriptionPlan: "Premium",
    paymentMethod: "Cartão de Crédito",
    status: "Ativo",
    joinDate: "05/05/2023",
  },
];

const MembersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState(mockMembers);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "Inativo":
        return <Badge className="bg-red-500">Inativo</Badge>;
      case "Pendente":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Controle de Membros</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Adicionar Membro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Membros Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nome, email ou telefone..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="ml-2">
              <Filter className="mr-2 h-4 w-4" /> Filtrar
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Entrada</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.subscriptionPlan}</TableCell>
                    <TableCell>{member.paymentMethod}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Visualizar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Excluir</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersManagement;
