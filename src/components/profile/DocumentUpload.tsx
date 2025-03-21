import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Upload, Check, AlertCircle, FileText } from "lucide-react";

interface DocumentUploadProps {
  onDocumentsComplete: (complete: boolean) => void;
}

const DocumentUpload = ({ onDocumentsComplete }: DocumentUploadProps) => {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Documento de Identidade", status: "uploaded" },
    { id: 2, name: "CPF", status: "uploaded" },
    { id: 3, name: "Diploma", status: "pending" },
    { id: 4, name: "Certificado de Especialização", status: "pending" },
  ]);

  const handleUpload = (id: number) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === id ? { ...doc, status: "uploaded" } : doc,
    );
    setDocuments(updatedDocuments);

    // Verificar se todos os documentos foram enviados
    const allUploaded = updatedDocuments.every(
      (doc) => doc.status === "uploaded",
    );
    onDocumentsComplete(allUploaded);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Documentação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-4 rounded-md bg-muted/50">
            <p className="text-sm">
              Para validar sua associação e emitir sua credencial digital,
              precisamos que você envie os seguintes documentos:
            </p>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.status === "uploaded"
                        ? "Documento enviado"
                        : "Documento pendente"}
                    </p>
                  </div>
                </div>
                {doc.status === "uploaded" ? (
                  <Badge className="bg-green-50 text-green-600">
                    <Check className="mr-1 h-3 w-3" /> Enviado
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpload(doc.id)}
                  >
                    <Upload className="mr-1 h-3 w-3" /> Enviar
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md bg-amber-50">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium">Atenção</p>
                <p className="text-xs text-muted-foreground">
                  Todos os documentos serão verificados pela nossa equipe. O
                  processo pode levar até 48 horas úteis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
