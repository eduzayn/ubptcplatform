import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Landmark, QrCode } from "lucide-react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

const CheckoutPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [installments, setInstallments] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const courseData = location.state?.course || {
    id: 1,
    title: "Curso",
    price: 119.9,
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80",
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    // Reset installments when changing payment method
    if (value !== "credit-card") {
      setInstallments("1");
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);

      // Dispatch event to add course to user's courses
      const courseAddedEvent = new CustomEvent("courseEnrolled", {
        detail: { course: courseData },
      });
      window.dispatchEvent(courseAddedEvent);

      // Navigate to success page or my courses page
      navigate("/profile/my-courses", {
        state: {
          success: true,
          message: `Matrícula realizada com sucesso em: ${courseData.title}`,
          course: courseData,
        },
      });
    }, 2000);
  };

  // Calculate price based on payment method and installments
  const getPrice = () => {
    if (paymentMethod === "credit-card") {
      return 119.9;
    } else if (installments === "1") {
      return 999.9; // One-time payment
    } else {
      return 109.9; // Installment price for boleto/pix
    }
  };

  const price = getPrice();
  const totalPrice =
    paymentMethod === "credit-card"
      ? price * parseInt(installments)
      : installments === "1"
        ? price
        : price * parseInt(installments);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={toggleSidebar}
          username="Maria Silva"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
          notificationCount={5}
          isAdmin={true}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-2xl font-bold">Finalizar Matrícula</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Course Summary */}
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Resumo do Pedido
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-video relative rounded-md overflow-hidden">
                        <img
                          src={courseData.image}
                          alt={courseData.title}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div>
                        <h3 className="font-medium">{courseData.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Acesso vitalício ao curso
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Subtotal:</span>
                          <span className="text-sm">R$ {price.toFixed(2)}</span>
                        </div>

                        {paymentMethod === "credit-card" &&
                          installments !== "1" && (
                            <div className="flex justify-between">
                              <span className="text-sm">Parcelamento:</span>
                              <span className="text-sm">
                                {installments}x de R$ {price.toFixed(2)}
                              </span>
                            </div>
                          )}

                        {paymentMethod !== "credit-card" &&
                          installments !== "1" && (
                            <div className="flex justify-between">
                              <span className="text-sm">Parcelamento:</span>
                              <span className="text-sm">
                                {installments}x de R$ {price.toFixed(2)}
                              </span>
                            </div>
                          )}

                        <Separator />

                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>R$ {totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Options */}
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Forma de Pagamento
                      </CardTitle>
                      <CardDescription>
                        Escolha como deseja realizar o pagamento
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs
                        defaultValue="credit-card"
                        value={paymentMethod}
                        onValueChange={handlePaymentMethodChange}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger
                            value="credit-card"
                            className="flex items-center gap-2"
                          >
                            <CreditCard className="h-4 w-4" />
                            <span className="hidden sm:inline">
                              Cartão de Crédito
                            </span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="boleto"
                            className="flex items-center gap-2"
                          >
                            <Landmark className="h-4 w-4" />
                            <span className="hidden sm:inline">Boleto</span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="pix"
                            className="flex items-center gap-2"
                          >
                            <QrCode className="h-4 w-4" />
                            <span className="hidden sm:inline">PIX</span>
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent
                          value="credit-card"
                          className="space-y-4 mt-4"
                        >
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <Label htmlFor="card-number">
                                  Número do Cartão
                                </Label>
                                <Input
                                  id="card-number"
                                  placeholder="0000 0000 0000 0000"
                                />
                              </div>
                              <div>
                                <Label htmlFor="expiry">Validade</Label>
                                <Input id="expiry" placeholder="MM/AA" />
                              </div>
                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                              </div>
                              <div className="col-span-2">
                                <Label htmlFor="card-name">
                                  Nome no Cartão
                                </Label>
                                <Input
                                  id="card-name"
                                  placeholder="Nome como está no cartão"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="installments">Parcelamento</Label>
                              <RadioGroup
                                id="installments"
                                value={installments}
                                onValueChange={setInstallments}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2"
                              >
                                {[...Array(10)].map((_, i) => {
                                  const num = i + 1;
                                  return (
                                    <div
                                      key={num}
                                      className="flex items-center space-x-2"
                                    >
                                      <RadioGroupItem
                                        value={num.toString()}
                                        id={`installment-${num}`}
                                      />
                                      <Label
                                        htmlFor={`installment-${num}`}
                                        className="text-sm"
                                      >
                                        {num}x de R$ {(119.9).toFixed(2)}
                                        {num === 1 && " (à vista)"}
                                      </Label>
                                    </div>
                                  );
                                })}
                              </RadioGroup>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="boleto" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            <div className="grid gap-4">
                              <div>
                                <Label htmlFor="cpf">CPF</Label>
                                <Input id="cpf" placeholder="000.000.000-00" />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="boleto-installments">
                                Opções de Pagamento
                              </Label>
                              <RadioGroup
                                id="boleto-installments"
                                value={installments}
                                onValueChange={setInstallments}
                                className="grid gap-2 mt-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="1"
                                    id="boleto-single"
                                  />
                                  <Label
                                    htmlFor="boleto-single"
                                    className="text-sm"
                                  >
                                    Pagamento único: R$ 999,90
                                  </Label>
                                </div>

                                {[...Array(16)].map((_, i) => {
                                  const num = i + 1;
                                  if (num === 1) return null; // Skip 1x as it's the single payment option
                                  return (
                                    <div
                                      key={num}
                                      className="flex items-center space-x-2"
                                    >
                                      <RadioGroupItem
                                        value={num.toString()}
                                        id={`boleto-installment-${num}`}
                                      />
                                      <Label
                                        htmlFor={`boleto-installment-${num}`}
                                        className="text-sm"
                                      >
                                        {num}x de R$ 109,90
                                      </Label>
                                    </div>
                                  );
                                })}
                              </RadioGroup>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="pix" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="pix-installments">
                                Opções de Pagamento
                              </Label>
                              <RadioGroup
                                id="pix-installments"
                                value={installments}
                                onValueChange={setInstallments}
                                className="grid gap-2 mt-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="1" id="pix-single" />
                                  <Label
                                    htmlFor="pix-single"
                                    className="text-sm"
                                  >
                                    Pagamento único: R$ 999,90
                                  </Label>
                                </div>

                                {[...Array(16)].map((_, i) => {
                                  const num = i + 1;
                                  if (num === 1) return null; // Skip 1x as it's the single payment option
                                  return (
                                    <div
                                      key={num}
                                      className="flex items-center space-x-2"
                                    >
                                      <RadioGroupItem
                                        value={num.toString()}
                                        id={`pix-installment-${num}`}
                                      />
                                      <Label
                                        htmlFor={`pix-installment-${num}`}
                                        className="text-sm"
                                      >
                                        {num}x de R$ 109,90
                                      </Label>
                                    </div>
                                  );
                                })}
                              </RadioGroup>
                            </div>

                            {installments === "1" && (
                              <div className="p-4 border rounded-md bg-muted/50 flex flex-col items-center">
                                <div className="mb-4 p-4 bg-white rounded-md border">
                                  <QrCode className="h-32 w-32 mx-auto" />
                                </div>
                                <p className="text-sm text-center text-muted-foreground">
                                  Escaneie o código QR com seu aplicativo
                                  bancário ou copie o código PIX abaixo
                                </p>
                                <div className="mt-2 w-full">
                                  <Input
                                    value="00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b028-f142a1415f6f5204000053039865802BR5913UBPTC6009SAO PAULO62070503***6304E2CA"
                                    readOnly
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleCheckout}
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? "Processando..."
                          : "Finalizar Matrícula"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
