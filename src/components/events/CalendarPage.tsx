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
import EventCreationModal from "./EventCreationModal";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  isOnline: boolean;
  type: "workshop" | "supervision" | "presentation" | "meeting";
  description: string;
  attendees: number;
  maxAttendees: number;
  registered: boolean;
}

const eventsData: Event[] = [
  {
    id: "1",
    title: "Sessão de Supervisão Clínica",
    date: addDays(new Date(), 2),
    startTime: "19:00",
    endTime: "20:30",
    location: "Zoom",
    isOnline: true,
    type: "supervision",
    description:
      "Supervisão clínica com discussão de casos apresentados pelos associados.",
    attendees: 24,
    maxAttendees: 30,
    registered: true,
  },
  {
    id: "2",
    title: "Workshop: Abordagens Informadas por Trauma",
    date: addDays(new Date(), 5),
    startTime: "14:00",
    endTime: "16:00",
    location: "Zoom",
    isOnline: true,
    type: "workshop",
    description:
      "Workshop prático sobre técnicas terapêuticas para trabalhar com pacientes que sofreram traumas.",
    attendees: 42,
    maxAttendees: 50,
    registered: false,
  },
  {
    id: "3",
    title: "Apresentação de Membro: Estudos de Caso",
    date: addDays(new Date(), 7),
    startTime: "18:30",
    endTime: "20:00",
    location: "Zoom",
    isOnline: true,
    type: "presentation",
    description:
      "Apresentação de estudos de caso por membros experientes da associação.",
    attendees: 18,
    maxAttendees: 40,
    registered: false,
  },
  {
    id: "4",
    title: "Encontro Presencial: Networking",
    date: addDays(new Date(), 10),
    startTime: "17:00",
    endTime: "19:00",
    location: "Centro de Convenções - Sala 204",
    isOnline: false,
    type: "meeting",
    description:
      "Encontro presencial para networking entre os associados da UBPTC.",
    attendees: 15,
    maxAttendees: 30,
    registered: false,
  },
  {
    id: "5",
    title: "Workshop: Técnicas de Entrevista Clínica",
    date: addDays(new Date(), 12),
    startTime: "09:00",
    endTime: "12:00",
    location: "Zoom",
    isOnline: true,
    type: "workshop",
    description:
      "Workshop intensivo sobre técnicas avançadas de entrevista clínica.",
    attendees: 35,
    maxAttendees: 40,
    registered: true,
  },
];

const getEventTypeBadgeColor = (type: Event["type"]): string => {
  switch (type) {
    case "workshop":
      return "bg-blue-100 text-blue-800";
    case "supervision":
      return "bg-purple-100 text-purple-800";
    case "presentation":
      return "bg-green-100 text-green-800";
    case "meeting":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatEventType = (type: Event["type"]): string => {
  switch (type) {
    case "workshop":
      return "Workshop";
    case "supervision":
      return "Supervisão";
    case "presentation":
      return "Apresentação";
    case "meeting":
      return "Encontro";
    default:
      return type;
  }
};

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <Badge className={getEventTypeBadgeColor(event.type)}>
            {formatEventType(event.type)}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {format(event.date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{event.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {event.isOnline ? (
                <Video className="h-4 w-4 text-muted-foreground" />
              ) : (
                <MapPin className="h-4 w-4 text-muted-foreground" />
              )}
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.attendees}/{event.maxAttendees} participantes
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={event.registered ? "secondary" : "default"}
          className="w-full"
        >
          {event.registered ? "Inscrito" : "Inscrever-se"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const CalendarPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>(eventsData);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCreateEvent = (
    newEventData: Omit<Event, "id" | "attendees" | "registered">,
  ) => {
    const newEvent: Event = {
      ...newEventData,
      id: `${events.length + 1}`,
      attendees: 0,
      registered: false,
    };

    setEvents([newEvent, ...events]);
  };

  // Filter events for the selected date
  const eventsForSelectedDate = events.filter((event) =>
    isSameDay(event.date, date),
  );

  // Get all dates that have events
  const eventDates = events.map((event) => event.date);

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
                <EventCreationModal onEventCreate={handleCreateEvent} />
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
                        modifiers={{
                          hasEvent: eventDates,
                        }}
                        modifiersClassNames={{
                          hasEvent: "bg-primary/20 font-bold",
                        }}
                      />
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">
                        Próximos Eventos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {events.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-start gap-3">
                          <div className="bg-muted rounded-md p-2 flex-shrink-0">
                            <CalendarIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(event.date, "dd/MM/yyyy")} •{" "}
                              {event.startTime}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                      >
                        Ver todos
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Events for Selected Date */}
                <div className="w-full md:w-2/3">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold">
                          Eventos em{" "}
                          {format(date, "dd 'de' MMMM, yyyy", { locale: ptBR })}
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
                      {eventsForSelectedDate.length > 0 ? (
                        <div className="space-y-4">
                          {eventsForSelectedDate.map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">
                            Nenhum evento nesta data
                          </h3>
                          <p className="text-muted-foreground">
                            Selecione outra data ou consulte os próximos eventos
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Todos os Eventos</h2>
                    <div className="space-y-4">
                      {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
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

export default CalendarPage;
