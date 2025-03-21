import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Users, MessageSquare, BookOpen, Calendar } from "lucide-react";
import CommunityHighlights from "./CommunityHighlights";

const CommunityPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("highlights");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={toggleSidebar}
          username="Maria Silva"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
          notificationCount={5}
          isAdmin={false}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Comunidade UBPTC</h1>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Buscar na comunidade..."
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" /> Novo Tópico
                  </Button>
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger
                    value="highlights"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" /> Destaques
                  </TabsTrigger>
                  <TabsTrigger
                    value="forums"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" /> Fóruns
                  </TabsTrigger>
                  <TabsTrigger
                    value="members"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" /> Membros
                  </TabsTrigger>
                  <TabsTrigger
                    value="events"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" /> Eventos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="highlights" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <CommunityHighlights />
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                      {/* Status da Assinatura */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">
                            Status da Assinatura
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <Badge className="bg-green-100 text-green-800">
                              Ativa
                            </Badge>
                            <span className="text-sm font-medium">
                              R$49,90/mês
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full rounded-full"
                                style={{ width: "25%" }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>3/12</span>
                              <span>
                                9 meses até elegibilidade para certificação
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Membros Ativos */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">
                            Membros Ativos
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Ana",
                              "Carlos",
                              "Juliana",
                              "Roberto",
                              "Patricia",
                              "Fernando",
                              "Mariana",
                              "Lucas",
                            ].map((name) => (
                              <Avatar
                                key={name}
                                className="h-10 w-10 border-2 border-white hover:ring-2 hover:ring-primary cursor-pointer"
                              >
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                                />
                                <AvatarFallback>
                                  {name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            <Avatar className="h-10 w-10 bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer">
                              <span className="text-xs">+42</span>
                            </Avatar>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Próximos Eventos */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">
                            Próximos Eventos
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-md p-2 flex-shrink-0">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                Estudos de caso em Psicanálise
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Terça-feira, 19h • Online
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-md p-2 flex-shrink-0">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                Mindfulness na prática clínica
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Quinta-feira, 20h • Online
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="forums" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-bold mb-4">
                        Fóruns de Discussão
                      </h2>
                      <p className="text-muted-foreground">
                        Esta seção está em desenvolvimento.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="members" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-bold mb-4">
                        Diretório de Membros
                      </h2>
                      <p className="text-muted-foreground">
                        Esta seção está em desenvolvimento.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-bold mb-4">
                        Eventos da Comunidade
                      </h2>
                      <p className="text-muted-foreground">
                        Esta seção está em desenvolvimento.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
