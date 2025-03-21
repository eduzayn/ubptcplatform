import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Upload,
  Check,
  AlertCircle,
  FileText,
  X,
  Camera,
  Info,
} from "lucide-react";
import { Progress } from "../ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface DocumentType {
  id: string;
  name: string;
  status: "pending" | "uploading" | "uploaded" | "error" | "rejected";
  progress?: number;
  file?: File;
  qualityCheck?: {
    isLegible: boolean;
    hasNoDamage: boolean;
    isCorrectlyPositioned: boolean;
    isComplete: boolean;
  };
  rejectionReason?: string;
}

interface DocumentUploadFormProps {
  onDocumentsComplete?: (complete: boolean) => void;
}

const DocumentUploadForm = ({
  onDocumentsComplete,
}: DocumentUploadFormProps) => {
  const [documents, setDocuments] = useState<DocumentType[]>([
    { id: "rg", name: "RG", status: "pending" },
    { id: "cpf", name: "CPF", status: "pending" },
    { id: "address", name: "Comprovante de Endereço", status: "pending" },
    {
      id: "certificate",
      name: "Certificado de Conclusão do Curso",
      status: "pending",
    },
    {
      id: "background",
      name: "Atestado de Bons Antecedentes",
      status: "pending",
    },
    {
      id: "photo",
      name: "Foto 3x4",
      status: "pending",
    },
  ]);

  const checkDocumentQuality = (file: File, docId: string) => {
    // Simulando verificação de qualidade do documento
    // Em um cenário real, isso seria feito com análise de imagem/IA
    return new Promise<{
      passed: boolean;
      qualityCheck: {
        isLegible: boolean;
        hasNoDamage: boolean;
        isCorrectlyPositioned: boolean;
        isComplete: boolean;
      };
      rejectionReason?: string;
    }>((resolve) => {
      // Simulando verificação de qualidade do documento
      // Em um cenário real, isso seria feito com análise de imagem/IA
      setTimeout(() => {
        // Simulando uma verificação aleatória para demonstração
        // Na implementação real, isso seria substituído por análise real do documento
        const isPhoto = docId === "photo";
        const randomQuality = Math.random();

        // Para demonstração, vamos fazer com que a maioria dos documentos passe, mas alguns falhem
        const passed = randomQuality > 0.2;

        // Criando um objeto de verificação de qualidade
        const qualityCheck = {
          isLegible: randomQuality > 0.15,
          hasNoDamage: randomQuality > 0.2,
          isCorrectlyPositioned: randomQuality > 0.25,
          isComplete: randomQuality > 0.1,
        };

        // Determinando a razão da rejeição, se houver
        let rejectionReason = "";
        if (!qualityCheck.isLegible) {
          rejectionReason =
            "Documento ilegível. Por favor, envie uma imagem mais clara.";
        } else if (!qualityCheck.hasNoDamage) {
          rejectionReason =
            "Documento com rasuras ou danos. Por favor, envie um documento íntegro.";
        } else if (!qualityCheck.isCorrectlyPositioned) {
          rejectionReason =
            "Documento mal posicionado. Por favor, centralize o documento na imagem.";
        } else if (!qualityCheck.isComplete) {
          rejectionReason =
            "Documento incompleto ou cortado. Por favor, envie o documento completo.";
        }

        // Para a foto 3x4, verificações específicas
        if (isPhoto && !passed) {
          rejectionReason =
            "A foto não atende aos requisitos do formato 3x4. Certifique-se de que o rosto está centralizado e bem iluminado.";
        }

        resolve({
          passed,
          qualityCheck,
          rejectionReason: passed ? undefined : rejectionReason,
        });
      }, 1500);
    });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    docId: string,
  ) => {
    // Emitir evento personalizado para foto 3x4 quando for enviada
    const emitPhotoUploadEvent = (photoFile: File) => {
      const photoUrl = URL.createObjectURL(photoFile);
      const photoEvent = new CustomEvent("photo3x4Uploaded", {
        detail: { photoUrl },
      });
      window.dispatchEvent(photoEvent);
    };
    const file = event.target.files?.[0];
    if (!file) return;

    // Se for uma foto 3x4, emitir evento
    if (docId === "photo") {
      emitPhotoUploadEvent(file);
    }

    // Atualiza o documento com status de uploading e inicia o progresso
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === docId
          ? { ...doc, status: "uploading", file, progress: 0 }
          : doc,
      ),
    );

    // Simula o upload com progresso
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      if (progress <= 100) {
        setDocuments((docs) =>
          docs.map((doc) => (doc.id === docId ? { ...doc, progress } : doc)),
        );
      }

      if (progress >= 100) {
        clearInterval(interval);

        // Após o upload, verificar a qualidade do documento
        checkDocumentQuality(file, docId)
          .then((qualityResult) => {
            if (qualityResult.passed) {
              // Documento passou na verificação de qualidade
              setDocuments((docs) =>
                docs.map((doc) =>
                  doc.id === docId
                    ? {
                        ...doc,
                        status: "uploaded",
                        progress: 100,
                        qualityCheck: qualityResult.qualityCheck,
                      }
                    : doc,
                ),
              );

              // Verifica se todos os documentos foram enviados e aprovados
              const updatedDocs = documents.map((doc) =>
                doc.id === docId ? { ...doc, status: "uploaded" } : doc,
              );
              const allUploaded = updatedDocs.every(
                (doc) => doc.status === "uploaded",
              );
              if (onDocumentsComplete) {
                onDocumentsComplete(allUploaded);
              }
            } else {
              // Documento falhou na verificação de qualidade
              setDocuments((docs) =>
                docs.map((doc) =>
                  doc.id === docId
                    ? {
                        ...doc,
                        status: "rejected",
                        progress: 100,
                        qualityCheck: qualityResult.qualityCheck,
                        rejectionReason: qualityResult.rejectionReason,
                      }
                    : doc,
                ),
              );
            }
          })
          .catch((error) => {
            console.error("Erro na verificação de qualidade:", error);
            setDocuments((docs) =>
              docs.map((doc) =>
                doc.id === docId
                  ? { ...doc, status: "error", progress: 100 }
                  : doc,
              ),
            );
          });
      }
    }, 300);
  };

  const cancelUpload = (docId: string) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === docId
          ? { ...doc, status: "pending", progress: 0, file: undefined }
          : doc,
      ),
    );
  };

  const removeDocument = (docId: string) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === docId
          ? { ...doc, status: "pending", progress: 0, file: undefined }
          : doc,
      ),
    );
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Documentação Obrigatória
        </CardTitle>
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
                className="flex items-center justify-between p-4 border rounded-md hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.status === "pending" && "Documento pendente"}
                      {doc.status === "uploading" && "Enviando documento..."}
                      {doc.status === "uploaded" &&
                        "Documento enviado com sucesso"}
                      {doc.status === "error" && "Erro ao enviar documento"}
                    </p>
                    {doc.status === "uploading" &&
                      doc.progress !== undefined && (
                        <Progress
                          value={doc.progress}
                          className="h-1 w-40 mt-1"
                        />
                      )}
                  </div>
                </div>

                {doc.status === "pending" ? (
                  <div>
                    <input
                      type="file"
                      id={`file-${doc.id}`}
                      className="hidden"
                      accept={
                        doc.id === "photo"
                          ? ".jpg,.jpeg,.png"
                          : ".pdf,.jpg,.jpeg,.png"
                      }
                      onChange={(e) => handleFileChange(e, doc.id)}
                    />
                    <div className="flex flex-col gap-1">
                      <label htmlFor={`file-${doc.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="cursor-pointer"
                          asChild
                        >
                          <span>
                            {doc.id === "photo" ? (
                              <>
                                <Camera className="mr-1 h-3 w-3" /> Selecionar
                                foto 3x4
                              </>
                            ) : (
                              <>
                                <Upload className="mr-1 h-3 w-3" /> Selecionar
                                arquivo
                              </>
                            )}
                          </span>
                        </Button>
                      </label>
                      {doc.id === "photo" && (
                        <p className="text-xs text-muted-foreground">
                          Formato 3x4, fundo branco, rosto centralizado
                        </p>
                      )}
                    </div>
                  </div>
                ) : doc.status === "uploading" ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => cancelUpload(doc.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                ) : doc.status === "uploaded" ? (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-50 text-green-600">
                      <Check className="mr-1 h-3 w-3" /> Verificado
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeDocument(doc.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : doc.status === "rejected" ? (
                  <div className="flex flex-col items-end gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className="bg-red-50 text-red-600 cursor-help">
                            <AlertCircle className="mr-1 h-3 w-3" /> Rejeitado
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{doc.rejectionReason}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500"
                      onClick={() => removeDocument(doc.id)}
                    >
                      Tentar novamente
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500"
                    onClick={() => removeDocument(doc.id)}
                  >
                    Tentar novamente
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-4 border rounded-md bg-amber-50">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium">Atenção</p>
                <p className="text-sm text-muted-foreground">
                  Todos os documentos passam por verificação automática de
                  qualidade. Certifique-se de que estão:
                </p>
                <ul className="text-sm text-muted-foreground list-disc ml-5 mt-2">
                  <li>Legíveis e sem rasuras</li>
                  <li>Completos (sem cortes)</li>
                  <li>Corretamente posicionados</li>
                  <li>Com boa iluminação</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Após a verificação automática, nossa equipe fará uma revisão
                  final em até 48 horas úteis.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-md bg-blue-50 mt-4">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Requisitos da Foto 3x4</p>
                <ul className="text-sm text-blue-700 list-disc ml-5 mt-2">
                  <li>Fundo branco ou claro</li>
                  <li>Rosto centralizado e visível</li>
                  <li>Sem óculos escuros ou adereços que cubram o rosto</li>
                  <li>Expressão neutra, olhando para a câmera</li>
                  <li>Iluminação adequada (sem sombras no rosto)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!documents.some((doc) => doc.status === "uploaded")}
              className="gap-2"
            >
              <Check className="h-4 w-4" /> Confirmar envio
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadForm;
