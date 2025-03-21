import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FileText, Download, Eye, Calendar, CheckCircle } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: "approved" | "pending" | "rejected";
  fileUrl?: string;
}

interface DocumentsArchiveProps {
  documents?: Document[];
}

const DocumentsArchive = ({
  documents = [
    {
      id: "doc1",
      name: "RG",
      type: "image/jpeg",
      uploadDate: "15/03/2023",
      status: "approved",
      fileUrl: "#",
    },
    {
      id: "doc2",
      name: "CPF",
      type: "image/jpeg",
      uploadDate: "15/03/2023",
      status: "approved",
      fileUrl: "#",
    },
    {
      id: "doc3",
      name: "Comprovante de Endereço",
      type: "application/pdf",
      uploadDate: "15/03/2023",
      status: "approved",
      fileUrl: "#",
    },
    {
      id: "doc4",
      name: "Certificado de Conclusão do Curso",
      type: "application/pdf",
      uploadDate: "15/03/2023",
      status: "approved",
      fileUrl: "#",
    },
    {
      id: "doc5",
      name: "Atestado de Bons Antecedentes",
      type: "application/pdf",
      uploadDate: "15/03/2023",
      status: "approved",
      fileUrl: "#",
    },
  ],
}: DocumentsArchiveProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-50 text-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> Aprovado
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-50 text-yellow-600">
            Pendente de Aprovação
          </Badge>
        );
      case "rejected":
        return <Badge className="bg-red-50 text-red-600">Rejeitado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Documentos Enviados</h3>
            <Badge className="bg-green-50 text-green-600">
              <CheckCircle className="mr-1 h-3 w-3" /> Verificação Completa
            </Badge>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Enviado em: {doc.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(doc.status)}
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-md bg-blue-50 border border-blue-200 mt-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">
                  Documentação Verificada
                </h4>
                <p className="text-sm text-blue-700">
                  Todos os seus documentos foram verificados e aprovados pela
                  nossa equipe. Sua credencial digital está disponível na aba
                  "Credenciais".
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsArchive;
