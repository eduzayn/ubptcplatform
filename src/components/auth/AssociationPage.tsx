import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  CreditCard,
  User,
  Mail,
  Lock,
  Building,
  GraduationCap,
} from "lucide-react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import PaymentProcessor from "../checkout/PaymentProcessor";

const AssociationPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    institution: "",
    graduationYear: "",
    specialization: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Avançar para a próxima etapa (pagamento)
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={toggleSidebar}
          username="Visitante"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Visitor"
          notificationCount={0}
          isAdmin={false}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
              <Card className="w-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">
                    UBPTC - União Brasileira de Psicanalistas e Terapêutas
                    Clínicos
                  </CardTitle>
                  <CardDescription>
                    Acesse sua conta ou cadastre-se para fazer parte da nossa
                    comunidade.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">
                          {currentStep === 1 && "Informações Pessoais"}
                          {currentStep === 2 && "Informações Profissionais"}
                          {currentStep === 3 && "Informações de Pagamento"}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          Passo {currentStep} de 3
                        </div>
                      </div>

                      {currentStep === 1 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Nome Completo</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="fullName"
                                name="fullName"
                                placeholder="Seu nome completo"
                                className="pl-10"
                                value={formData.fullName}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                name="email"
                                placeholder="seu@email.com"
                                className="pl-10"
                                value={formData.email}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="******"
                                className="pl-10"
                                value={formData.password}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                              Confirmar Senha
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="******"
                                className="pl-10"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full"
                          >
                            Próximo
                          </Button>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="profession">Profissão</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="profession"
                                name="profession"
                                placeholder="Ex: Psicólogo, Psiquiatra, Terapeuta"
                                className="pl-10"
                                value={formData.profession}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="institution">
                              Instituição de Formação
                            </Label>
                            <div className="relative">
                              <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="institution"
                                name="institution"
                                placeholder="Nome da instituição"
                                className="pl-10"
                                value={formData.institution}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="graduationYear">
                              Ano de Formação
                            </Label>
                            <div className="relative">
                              <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="graduationYear"
                                name="graduationYear"
                                placeholder="Ex: 2020"
                                className="pl-10"
                                value={formData.graduationYear}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="specialization">
                              Especialização
                            </Label>
                            <div className="relative">
                              <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="specialization"
                                name="specialization"
                                placeholder="Ex: Psicanálise, TCC, Neuropsicologia"
                                className="pl-10"
                                value={formData.specialization}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="flex justify-between gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handlePrevStep}
                              className="w-1/2"
                            >
                              Voltar
                            </Button>
                            <Button
                              type="button"
                              onClick={handleNextStep}
                              className="w-1/2"
                            >
                              Próximo
                            </Button>
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-4">
                          <PaymentProcessor
                            onCancel={handlePrevStep}
                            onSuccess={() => {
                              // Redirecionar para a página de perfil após pagamento bem-sucedido
                              navigate("/profile");
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Benefícios da Associação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>
                          Acesso à biblioteca digital com e-books, artigos e
                          materiais exclusivos
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>
                          Eventos e supervisões semanais com profissionais
                          renomados
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>
                          Carteira de identificação profissional digital
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>
                          Carteira de estudante para descontos em eventos e
                          cursos
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>
                          Acesso ao fórum de discussão e comunidade de
                          profissionais
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>
                          Certificação após 12 meses de associação ativa
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AssociationPage;
