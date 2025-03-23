import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
<<<<<<< HEAD
import { supabase } from "@/lib/supabase";
=======
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
import {
  CreditCard,
  User,
  Mail,
  Lock,
  Building,
  GraduationCap,
<<<<<<< HEAD
  CreditCard as CPFIcon,
=======
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

<<<<<<< HEAD
// Admin login schema
const adminLoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(11, { message: "CPF inválido" })
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
      message: "Formato de CPF inválido",
    }),
});

=======
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
// Signup form schema with multi-step validation
const personalInfoSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

const professionalInfoSchema = z.object({
  profession: z.string().min(2, { message: "Profissão é obrigatória" }),
  institution: z.string().optional(),
  graduationYear: z.string().optional(),
  specialization: z.string().optional(),
});

const paymentInfoSchema = z.object({
  cardNumber: z.string().min(16, { message: "Número do cartão inválido" }),
  cardName: z.string().min(2, { message: "Nome no cartão é obrigatório" }),
  expiryDate: z.string().min(5, { message: "Data de expiração inválida" }),
  cvv: z.string().min(3, { message: "CVV inválido" }),
});

interface AuthModalProps {
  defaultOpen?: boolean;
  trigger?: React.ReactNode;
  onSuccess?: (isAdmin?: boolean) => void;
}

const AuthModal = ({
  defaultOpen = true,
  trigger,
  onSuccess = () => {},
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState("login");
  const [signupStep, setSignupStep] = useState(1);

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

<<<<<<< HEAD
  // Admin login form
  const adminLoginForm = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

=======
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
  // Signup forms for each step
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const professionalInfoForm = useForm<z.infer<typeof professionalInfoSchema>>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      profession: "",
      institution: "",
      graduationYear: "",
      specialization: "",
    },
  });

  const paymentInfoForm = useForm<z.infer<typeof paymentInfoSchema>>({
    resolver: zodResolver(paymentInfoSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    // Handle login logic here
    onSuccess(false); // Pass false to indicate regular user login
  };

  const handleNextStep = async () => {
    if (signupStep === 1) {
      const valid = await personalInfoForm.trigger();
      if (valid) setSignupStep(2);
    } else if (signupStep === 2) {
      const valid = await professionalInfoForm.trigger();
      if (valid) setSignupStep(3);
    }
  };

  const handlePrevStep = () => {
    if (signupStep > 1) setSignupStep(signupStep - 1);
  };

  const onSignupComplete = async (data: z.infer<typeof paymentInfoSchema>) => {
    const personalData = personalInfoForm.getValues();
    const professionalData = professionalInfoForm.getValues();

    const completeData = {
      ...personalData,
      ...professionalData,
      payment: data,
    };

    console.log("Complete signup data:", completeData);
    // Handle signup and subscription logic here
  };

  return (
    <Dialog defaultOpen={defaultOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            UBPTC - União Brasileira de Psicanalistas e Terapêutas Clínicos
          </DialogTitle>
          <DialogDescription className="text-center">
            Acesse sua conta ou cadastre-se para fazer parte da nossa
            comunidade.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="signup">Associe-se</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="seu@email.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="******"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm">
              <a href="#" className="text-primary hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4">
<<<<<<< HEAD
            <Form {...adminLoginForm}>
              <form
                onSubmit={adminLoginForm.handleSubmit(async (data) => {
                  console.log("Admin login data:", data);
                  // Verificar se o administrador existe no banco de dados
                  try {
                    const { data: profiles, error } = await supabase
                      .from("profiles")
                      .select("*")
                      .eq("email", data.email)
                      .eq("cpf", data.password.replace(/[^0-9]/g, ""))
                      .eq("role", "admin")
                      .single();

                    if (error) {
                      console.error("Erro ao verificar administrador:", error);
                      adminLoginForm.setError("email", {
                        message:
                          "Erro ao verificar credenciais. Tente novamente.",
                      });
                      return;
                    }

                    if (!profiles) {
                      adminLoginForm.setError("email", {
                        message:
                          "Administrador não encontrado ou credenciais inválidas",
                      });
                      return;
                    }

                    // Login bem-sucedido
                    onSuccess(true); // Pass true to indicate admin login

                    // Fechar o modal após login bem-sucedido
                    const closeButton = document.querySelector(
                      '[data-state="open"] button[aria-label="Close"]',
                    );
                    if (closeButton) {
                      (closeButton as HTMLButtonElement).click();
                    }
                  } catch (err) {
                    console.error("Erro ao fazer login:", err);
                    adminLoginForm.setError("email", {
                      message:
                        "Erro ao verificar credenciais. Tente novamente.",
                    });
=======
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit((data) => {
                  console.log("Admin login data:", data);
                  // Handle admin login logic here
                  onSuccess(true); // Pass true to indicate admin login
                  // Fechar o modal após login bem-sucedido
                  const closeButton = document.querySelector(
                    '[data-state="open"] button[aria-label="Close"]',
                  );
                  if (closeButton) {
                    (closeButton as HTMLButtonElement).click();
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
                  }
                })}
                className="space-y-4"
              >
                <div className="bg-primary/10 p-3 rounded-md mb-4">
                  <p className="text-sm text-center font-medium">
                    Acesso restrito para administradores
                  </p>
                </div>
                <FormField
<<<<<<< HEAD
                  control={adminLoginForm.control}
=======
                  control={loginForm.control}
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Administrativo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="admin@ubptc.org"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
<<<<<<< HEAD
                  control={adminLoginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CPFIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="000.000.000-00"
=======
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="******"
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary/90 hover:bg-primary"
                >
                  Acessar Painel Administrativo
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            {signupStep === 1 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Informações Pessoais</h3>
                  <div className="text-sm text-muted-foreground">
                    Passo 1 de 3
                  </div>
                </div>

                <Form {...personalInfoForm}>
                  <form className="space-y-4">
                    <FormField
                      control={personalInfoForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Seu nome completo"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="seu@email.com"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="password"
                                placeholder="******"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="password"
                                placeholder="******"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full"
                    >
                      Próximo
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {signupStep === 2 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Informações Profissionais
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    Passo 2 de 3
                  </div>
                </div>

                <Form {...professionalInfoForm}>
                  <form className="space-y-4">
                    <FormField
                      control={professionalInfoForm.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profissão</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Ex: Psicólogo, Psiquiatra, Terapeuta"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={professionalInfoForm.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instituição de Formação</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Nome da instituição"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={professionalInfoForm.control}
                      name="graduationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano de Formação</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Ex: 2020"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={professionalInfoForm.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Especialização</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Ex: Psicanálise, TCC, Neuropsicologia"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  </form>
                </Form>
              </div>
            )}

            {signupStep === 3 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Informações de Pagamento
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    Passo 3 de 3
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-2">Assinatura Mensal</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    R$ 49,90 por mês
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Acesso a todos
                      os conteúdos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Eventos e
                      supervisões semanais
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Carteirinha de
                      membro e estudante
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Certificação
                      após 12 meses
                    </li>
                  </ul>
                </div>

                <Form {...paymentInfoForm}>
                  <form
                    onSubmit={paymentInfoForm.handleSubmit(onSignupComplete)}
                    className="space-y-4"
                  >
                    <FormField
                      control={paymentInfoForm.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do Cartão</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="0000 0000 0000 0000"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={paymentInfoForm.control}
                      name="cardName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome no Cartão</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Nome como está no cartão"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={paymentInfoForm.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Validade</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/AA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={paymentInfoForm.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                      <Button type="submit" className="w-1/2">
                        Finalizar Assinatura
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
