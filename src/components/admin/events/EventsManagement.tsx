import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import EventCreationModal from "@/components/events/EventCreationModal";

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

const mockEvents: Event[] = [
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
];

const getEventTypeBadge = (type: Event["type"]): string => {
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

const EventsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>(mockEvents);

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

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestão de Eventos</h1>
        <EventCreationModal onEventCreate={handleCreateEvent} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eventos Programados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar eventos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="ml-2">
              <Filter className="mr-2 h-4 w-4" /> Filtrar
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Participantes</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>
                      <Badge className={getEventTypeBadge(event.type)}>
                        {formatEventType(event.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(event.date, "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      {event.startTime} - {event.endTime}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {event.isOnline ? "Online" : "Presencial"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {event.attendees}/{event.maxAttendees}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Visualizar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Excluir</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsManagement;
