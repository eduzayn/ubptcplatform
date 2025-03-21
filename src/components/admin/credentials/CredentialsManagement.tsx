import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Download,
  Eye,
  QrCode,
  Printer,
  Mail,
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

const mockCredentials = [
  {
    id: 1,
    memberName: "Maria Silva",
    memberId: "UBPTC-2023-7845",
    email: "maria.silva@example.com",
    profession: "Psicóloga",
    specialization: "Psicanálise",
    issueDate: "15/01/2023",
    expiryDate: "15/01/2024",
    status: "Ativo",
    credentialType: "Profissional",
  },
  {
    id: 2,
    memberName: "João Santos",
    memberId: "UBPTC-2023-8921",
    email: "joao.santos@example.com",
    profession: "Psiquiatra",
    specialization: "Neuropsiquiatria",
    issueDate: "03/02/2023",
    expiryDate: "03/02/2024",
    status: "Ativo",
    credentialType: "Profissional",
  },
  {
    id: 3,
    memberName: "Ana Oliveira",
    memberId: "UBPTC-2023-9034",
    email: "ana.oliveira@example.com",
    profession: "Terapeuta",
    specialization: "Terapia Cognitivo-Comportamental",
    issueDate: "22/03/2023",
    expiryDate: "22/03/2024",
    status: "Suspenso",
    credentialType: "Profissional",
  },
  {
    id: 4,
    memberName: "Carlos Pereira",
    memberId: "UBPTC-2023-7123",
    email: "carlos.pereira@example.com",
    profession: "Psicólogo",
    specialization: "Psicologia Analítica",
    issueDate: "10/04/2023",
    expiryDate: "10/04/2024",
    status: "Ativo",
    credentialType: "Profissional",
  },
  {
    id: 5,
    memberName: "Fernanda Lima",
    memberId: "UBPTC-2023-6547",
    email: "fernanda.lima@example.com",
    profession: "Psicanalista",
    specialization: "Psicanálise Infantil",
    issueDate: "05/05/2023",
    expiryDate: "05/05/2024",
    status: "Ativo",
    credentialType: "Profissional",
  },
];

const mockStudentCredentials = [
  {
    id: 1,
    memberName: "Maria Silva",
    memberId: "EST-UBPTC-2023-7845",
    email: "maria.silva@example.com",
    course: "Formação Continuada UBPTC",
    issueDate: "15/01/2023",
    expiryDate: "31/12/2023",
    status: "Ativo",
    credentialType: "Estudante",
  },
  {
    id: 2,
    memberName: "João Santos",
    memberId: "EST-UBPTC-2023-8921",
    email: "joao.santos@example.com",
    course: "Formação Continuada UBPTC",
    issueDate: "03/02/2023",
    expiryDate: "31/12/2023",
    status: "Ativo",
    credentialType: "Estudante",
  },
  {
    id: 3,
    memberName: "Ana Oliveira",
    memberId: "EST-UBPTC-2023-9034",
    email: "ana.oliveira@example.com",
    course: "Formação Continuada UBPTC",
    issueDate: "22/03/2023",
    expiryDate: "31/12/2023",
    status: "Suspenso",
    credentialType: "Estudante",
  },
  {
    id: 4,
    memberName: "Carlos Pereira",
    memberId: "EST-UBPTC-2023-7123",
    email: "carlos.pereira@example.com",
    course: "Formação Continuada UBPTC",
    issueDate: "10/04/2023",
    expiryDate: "31/12/2023",
    status: "Ativo",
    credentialType: "Estudante",
  },
  {
    id: 5,
    memberName: "Fernanda Lima",
    memberId: "EST-UBPTC-2023-6547",
    email: "fernanda.lima@example.com",
    course: "Formação Continuada UBPTC",
    issueDate: "05/05/2023",
    expiryDate: "31/12/2023",
    status: "Ativo",
    credentialType: "Estudante",
  },
];

const CredentialsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("professional");
  const [selectedCredentials, setSelectedCredentials] = useState<number[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "Suspenso":
        return <Badge className="bg-red-500">Suspenso</Badge>;
      case "Expirado":
        return <Badge className="bg-yellow-500">Expirado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredProfessionalCredentials = mockCredentials.filter(
    (credential) =>
      credential.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credential.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credential.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredStudentCredentials = mockStudentCredentials.filter(
    (credential) =>
      credential.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credential.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credential.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleCredentialSelection = (id: number) => {
    if (selectedCredentials.includes(id)) {
      setSelectedCredentials(
        selectedCredentials.filter((credId) => credId !== id),
      );
    } else {
      setSelectedCredentials([...selectedCredentials, id]);
    }
  };

  const handleBulkDownload = () => {
    console.log("Downloading credentials:", selectedCredentials);
    // Implementation for bulk download
  };

  const handleBulkPrint = () => {
    console.log("Printing credentials:", selectedCredentials);
    // Implementation for bulk printing
  };

  const handleBulkEmail = () => {
    console.log("Emailing credentials:", selectedCredentials);
    // Implementation for bulk emailing
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Credenciais</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleBulkDownload}
            disabled={selectedCredentials.length === 0}
          >
            <Download className="mr-2 h-4 w-4" /> Download (
            {selectedCredentials.length})
          </Button>
          <Button
            variant="outline"
            onClick={handleBulkPrint}
            disabled={selectedCredentials.length === 0}
          >
            <Printer className="mr-2 h-4 w-4" /> Imprimir (
            {selectedCredentials.length})
          </Button>
          <Button
            variant="outline"
            onClick={handleBulkEmail}
            disabled={selectedCredentials.length === 0}
          >
            <Mail className="mr-2 h-4 w-4" /> Enviar por Email (
            {selectedCredentials.length})
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credenciais Emitidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nome, ID ou email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="ml-2">
              <Filter className="mr-2 h-4 w-4" /> Filtrar
            </Button>
          </div>

          <Tabs defaultValue="professional" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="professional">
                Credenciais Profissionais
              </TabsTrigger>
              <TabsTrigger value="student">
                Credenciais de Estudante
              </TabsTrigger>
            </TabsList>

            <TabsContent value="professional">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCredentials(
                                filteredProfessionalCredentials.map(
                                  (c) => c.id,
                                ),
                              );
                            } else {
                              setSelectedCredentials([]);
                            }
                          }}
                          checked={
                            selectedCredentials.length ===
                              filteredProfessionalCredentials.length &&
                            filteredProfessionalCredentials.length > 0
                          }
                        />
                      </TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>ID Profissional</TableHead>
                      <TableHead>Profissão</TableHead>
                      <TableHead>Especialização</TableHead>
                      <TableHead>Data de Emissão</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProfessionalCredentials.map((credential) => (
                      <TableRow key={credential.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedCredentials.includes(
                              credential.id,
                            )}
                            onChange={() =>
                              toggleCredentialSelection(credential.id)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {credential.memberName}
                        </TableCell>
                        <TableCell>{credential.memberId}</TableCell>
                        <TableCell>{credential.profession}</TableCell>
                        <TableCell>{credential.specialization}</TableCell>
                        <TableCell>{credential.issueDate}</TableCell>
                        <TableCell>{credential.expiryDate}</TableCell>
                        <TableCell>
                          {getStatusBadge(credential.status)}
                        </TableCell>
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
                                <QrCode className="mr-2 h-4 w-4" />
                                <span>Ver QR Code</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                <span>Imprimir</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Enviar por Email</span>
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

            <TabsContent value="student">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCredentials(
                                filteredStudentCredentials.map((c) => c.id),
                              );
                            } else {
                              setSelectedCredentials([]);
                            }
                          }}
                          checked={
                            selectedCredentials.length ===
                              filteredStudentCredentials.length &&
                            filteredStudentCredentials.length > 0
                          }
                        />
                      </TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>ID Estudante</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Data de Emissão</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudentCredentials.map((credential) => (
                      <TableRow key={credential.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedCredentials.includes(
                              credential.id,
                            )}
                            onChange={() =>
                              toggleCredentialSelection(credential.id)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {credential.memberName}
                        </TableCell>
                        <TableCell>{credential.memberId}</TableCell>
                        <TableCell>{credential.course}</TableCell>
                        <TableCell>{credential.issueDate}</TableCell>
                        <TableCell>{credential.expiryDate}</TableCell>
                        <TableCell>
                          {getStatusBadge(credential.status)}
                        </TableCell>
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
                                <QrCode className="mr-2 h-4 w-4" />
                                <span>Ver QR Code</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                <span>Imprimir</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Enviar por Email</span>
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

export default CredentialsManagement;
