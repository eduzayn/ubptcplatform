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
  FileText,
} from "lucide-react";
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

const mockCourses = [
  {
    id: 1,
    title: "Introdução à Psicanálise",
    category: "Psicanálise",
    modules: 8,
    students: 124,
    lastUpdated: "10/05/2023",
    status: "Publicado",
  },
  {
    id: 2,
    title: "Terapia Cognitivo-Comportamental",
    category: "TCC",
    modules: 12,
    students: 98,
    lastUpdated: "15/04/2023",
    status: "Publicado",
  },
  {
    id: 3,
    title: "Psicologia Junguiana",
    category: "Psicologia Analítica",
    modules: 6,
    students: 45,
    lastUpdated: "20/03/2023",
    status: "Rascunho",
  },
  {
    id: 4,
    title: "Neuropsicologia Aplicada",
    category: "Neurociência",
    modules: 10,
    students: 0,
    lastUpdated: "05/05/2023",
    status: "Em Revisão",
  },
  {
    id: 5,
    title: "Psicoterapia Breve",
    category: "Psicoterapia",
    modules: 5,
    students: 76,
    lastUpdated: "01/04/2023",
    status: "Publicado",
  },
];

const CoursesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState(mockCourses);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Publicado":
        return <Badge className="bg-green-500">Publicado</Badge>;
      case "Rascunho":
        return <Badge className="bg-yellow-500">Rascunho</Badge>;
      case "Em Revisão":
        return <Badge className="bg-blue-500">Em Revisão</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Módulo de Cursos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Criar Novo Curso
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cursos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por título ou categoria..."
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
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Módulos</TableHead>
                  <TableHead>Alunos</TableHead>
                  <TableHead>Última Atualização</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.modules}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>{course.lastUpdated}</TableCell>
                    <TableCell>{getStatusBadge(course.status)}</TableCell>
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
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Gerenciar Conteúdo</span>
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

export default CoursesManagement;
