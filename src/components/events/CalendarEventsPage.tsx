import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Plus,
} from "lucide-react";
import UpcomingEvents from "../dashboard/UpcomingEvents";

const CalendarEventsPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
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
          isAdmin={true}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Calendário de Eventos</h1>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Calendar Section */}
                <div className="w-full md:w-1/3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Calendário de Eventos
                      </CardTitle>
                      <CardDescription>
                        Selecione uma data para ver os eventos programados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => newDate && setDate(newDate)}
                        className="rounded-md border mx-auto"
                        locale={ptBR}
                      />
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">
                        Status da Assinatura
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-green-100 text-green-800">
                          Ativa
                        </Badge>
                        <span className="text-sm font-medium">R$49,90/mês</span>
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
                </div>

                {/* Events Section */}
                <div className="w-full md:w-2/3">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold">
                          Próximos Eventos
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDate(addDays(date, -1))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDate(addDays(date, 1))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <UpcomingEvents />
                    </CardContent>
                  </Card>

                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Todos os Eventos</h2>
                    <Card>
                      <CardContent className="p-0">
                        <div className="p-6 border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold">
                                Sessão de Supervisão Clínica
                              </h3>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>Mar 23, 2025</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>19:00 - 20:30</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  <span>24 participantes</span>
                                </div>
                              </div>
                            </div>
                            <Badge>Supervisão</Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-4 text-sm text-muted-foreground">
                            <Video className="h-4 w-4" />
                            <span>Zoom</span>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600"
                            >
                              Inscrito
                            </Badge>
                          </div>
                        </div>

                        <div className="p-6 border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold">
                                Workshop: Abordagens Informadas por Trauma
                              </h3>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>Mar 26, 2025</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>14:00 - 16:00</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  <span>42 participantes</span>
                                </div>
                              </div>
                            </div>
                            <Badge>Workshop</Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-4 text-sm text-muted-foreground">
                            <Video className="h-4 w-4" />
                            <span>Zoom</span>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button size="sm">Inscrever-se</Button>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold">
                                Apresentação de Membro: Estudos de Caso
                              </h3>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>Mar 28, 2025</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>18:30 - 20:00</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  <span>18 participantes</span>
                                </div>
                              </div>
                            </div>
                            <Badge>Apresentação</Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-4 text-sm text-muted-foreground">
                            <Video className="h-4 w-4" />
                            <span>Zoom</span>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button size="sm">Inscrever-se</Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center border-t">
                        <Button variant="ghost" className="gap-1">
                          Ver todos os eventos{" "}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CalendarEventsPage;
