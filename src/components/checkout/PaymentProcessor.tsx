import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CreditCard, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentProcessorProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  amount?: number;
  description?: string;
  benefits?: string[];
}

const PaymentProcessor = ({
  onSuccess = () => {},
  onCancel = () => {},
  amount = 49.9,
  description = "Assinatura Mensal",
  benefits = [
    "Acesso a todos os conteúdos",
    "Eventos e supervisões semanais",
    "Carteirinha de membro e estudante",
    "Certificação após 12 meses",
  ],
}: PaymentProcessorProps) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.cardNumber.trim()) {
      setError("Número do cartão é obrigatório");
      return false;
    }
    if (!formData.cardName.trim()) {
      setError("Nome no cartão é obrigatório");
      return false;
    }
    if (!formData.expiryDate.trim()) {
      setError("Data de validade é obrigatória");
      return false;
    }
    if (!formData.cvv.trim()) {
      setError("CVV é obrigatório");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulação de processamento de pagamento
    try {
      // Simulando uma chamada de API com um timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulando sucesso do pagamento
      setIsProcessing(false);
      onSuccess();
      navigate("/profile");
    } catch (err) {
      setIsProcessing(false);
      setError("Erro ao processar pagamento. Tente novamente.");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="bg-accent/50 p-4 rounded-md mb-4">
          <h4 className="font-medium mb-2">{description}</h4>
          <p className="text-sm text-muted-foreground mb-1">
            R$ {amount.toFixed(2).replace(".", ",")} por mês
          </p>
          <ul className="text-sm space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  className="pl-10"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Nome no Cartão</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="Nome como está no cartão"
                  className="pl-10"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Validade</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/AA"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                />
              </div>
            </div>
            <div className="flex justify-between gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-1/2"
                disabled={isProcessing}
              >
                Voltar
              </Button>
              <Button type="submit" className="w-1/2" disabled={isProcessing}>
                {isProcessing ? "Processando..." : "Finalizar Assinatura"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentProcessor;
