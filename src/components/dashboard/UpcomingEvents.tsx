import React from "react";
import { format } from "date-fns";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  attendees: number;
  registered: boolean;
  type: "workshop" | "supervision" | "presentation";
}

interface UpcomingEventsProps {
  events?: Event[];
  className?: string;
}

const UpcomingEvents = ({
  events = [
    {
      id: "1",
      title: "Sessão de Supervisão Clínica",
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      time: "19:00 - 20:30",
      attendees: 24,
      registered: true,
      type: "supervision",
    },
    {
      id: "2",
      title: "Workshop: Abordagens Informadas por Trauma",
      date: new Date(Date.now() + 86400000 * 5), // 5 days from now
      time: "14:00 - 16:00",
      attendees: 42,
      registered: false,
      type: "workshop",
    },
    {
      id: "3",
      title: "Apresentação de Membro: Estudos de Caso",
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      time: "18:30 - 20:00",
      attendees: 18,
      registered: false,
      type: "presentation",
    },
  ],
  className = "",
}: UpcomingEventsProps) => {
  return (
    <Card className={`w-full h-full bg-white ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Próximos Eventos</CardTitle>
        <CardDescription>
          Suas sessões agendadas de desenvolvimento profissional
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-base">{event.title}</h4>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getEventTypeBadgeColor(event.type)}`}
              >
                {formatEventType(event.type)}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{format(event.date, "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{event.attendees} participantes</span>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button
                variant={event.registered ? "secondary" : "default"}
                size="sm"
              >
                {event.registered ? "Inscrito" : "Inscrever-se"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-between">
          Ver todos os eventos
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper functions
const getEventTypeBadgeColor = (type: Event["type"]): string => {
  switch (type) {
    case "workshop":
      return "bg-blue-100 text-blue-800";
    case "supervision":
      return "bg-purple-100 text-purple-800";
    case "presentation":
      return "bg-green-100 text-green-800";
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
    default:
      return type;
  }
};

export default UpcomingEvents;
