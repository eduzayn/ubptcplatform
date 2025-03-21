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
  Download,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockEbooks = [
  {
    id: 1,
    title: "Fundamentos da Psicanálise",
    author: "Dr. Carlos Mendes",
    format: "PDF",
    size: "12.5 MB",
    uploadDate: "10/05/2023",
    downloads: 87,
  },
  {
    id: 2,
    title: "Manual de Terapia Cognitiva",
    author: "Dra. Ana Silva",
    format: "PDF",
    size: "8.2 MB",
    uploadDate: "15/04/2023",
    downloads: 124,
  },
  {
    id: 3,
    title: "Introdução à Psicologia Analítica",
    author: "Dr. Roberto Jung",
    format: "EPUB",
    size: "5.7 MB",
    uploadDate: "20/03/2023",
    downloads: 56,
  },
];

const mockVideos = [
  {
    id: 1,
    title: "Técnicas de Entrevista Clínica",
    presenter: "Dra. Maria Oliveira",
    duration: "45:32",
    format: "MP4",
    size: "256 MB",
    uploadDate: "05/05/2023",
    views: 145,
  },
  {
    id: 2,
    title: "Workshop: Análise de Sonhos",
    presenter: "Dr. João Santos",
    duration: "1:23:15",
    format: "MP4",
    size: "512 MB",
    uploadDate: "01/04/2023",
    views: 98,
  },
  {
    id: 3,
    title: "Palestra: Neurociência e Psicoterapia",
    presenter: "Dr. Carlos Neuro",
    duration: "58:22",
    format: "MP4",
    size: "320 MB",
    uploadDate: "15/03/2023",
    views: 210,
  },
];

const LibraryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ebooks");

  const filteredEbooks = mockEbooks.filter(
    (ebook) =>
      ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ebook.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredVideos = mockVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.presenter.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Biblioteca Digital</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo da Biblioteca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por título ou autor..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="ml-2">
              <Filter className="mr-2 h-4 w-4" /> Filtrar
            </Button>
          </div>

          <Tabs defaultValue="ebooks" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="ebooks">E-books</TabsTrigger>
              <TabsTrigger value="videos">Vídeos</TabsTrigger>
            </TabsList>

            <TabsContent value="ebooks">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead>Formato</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Data de Upload</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEbooks.map((ebook) => (
                      <TableRow key={ebook.id}>
                        <TableCell className="font-medium">
                          {ebook.title}
                        </TableCell>
                        <TableCell>{ebook.author}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ebook.format}</Badge>
                        </TableCell>
                        <TableCell>{ebook.size}</TableCell>
                        <TableCell>{ebook.uploadDate}</TableCell>
                        <TableCell>{ebook.downloads}</TableCell>
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
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
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
            </TabsContent>

            <TabsContent value="videos">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Apresentador</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead>Formato</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Data de Upload</TableHead>
                      <TableHead>Visualizações</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVideos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="font-medium">
                          {video.title}
                        </TableCell>
                        <TableCell>{video.presenter}</TableCell>
                        <TableCell>{video.duration}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{video.format}</Badge>
                        </TableCell>
                        <TableCell>{video.size}</TableCell>
                        <TableCell>{video.uploadDate}</TableCell>
                        <TableCell>{video.views}</TableCell>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryManagement;
