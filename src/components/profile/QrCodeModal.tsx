import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Download, Share2 } from "lucide-react";
import { CredentialType } from "@/types/dashboard";

interface QrCodeModalProps {
  open: boolean;
  onClose: () => void;
  credentialType: CredentialType;
  qrCodeData: string;
  memberId: string;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({
  open,
  onClose,
  credentialType,
  qrCodeData,
  memberId,
}) => {
  const isProfessional = credentialType === "professional";
  const title = isProfessional
    ? "Credencial Profissional"
    : "Credencial de Estudante";

  const qrCodeDisplay = (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border-2 border-gray-200 mx-auto w-64 h-64">
      <QrCode
        className={`h-48 w-48 ${isProfessional ? "text-primary" : "text-blue-500"}`}
      />
      <span className="mt-2 text-xs text-center text-muted-foreground break-all">
        {qrCodeData}
      </span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Escaneie este QR code para verificar a autenticidade da credencial.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          {qrCodeDisplay}

          <div className="text-center">
            <p className="text-sm font-medium">
              ID: {isProfessional ? memberId : `EST-${memberId}`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Esta credencial é válida apenas quando o status da assinatura está
              ativo.
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={onClose}>
            Fechar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" /> Compartilhar
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" /> Baixar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeModal;
