import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Video, Users, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Event } from "@/types/dashboard";

interface UpcomingEventsProps {
  events?: Event[];
  title?: string;
  description?: string;
}

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Webinar: Técnicas Avançadas em Psicoterapia",
    date: "2024-03-15",
    time: "19:00",
    type: "webinar",
    speaker: "Dra. Maria Santos",
    description: "Discussão sobre novas abordagens em psicoterapia"
  },
  {
    id: "2",
    title: "Workshop de Supervisão Clínica",
    date: "2024-03-20",
    time: "14:00",
    type: "workshop",
    speaker: "Dr. João Silva",
    description: "Sessão prática de supervisão de casos clínicos"
  },
  {
    id: "3",
    title: "Palestra: Trauma e Resiliência",
    date: "2024-03-25",
    time: "20:00",
    type: "lecture",
    speaker: "Dra. Ana Oliveira",
    description: "Abordagens contemporâneas no tratamento do trauma"
  }
];

const defaultProps = {
  title: "Próximos Eventos",
  description: "Eventos e atividades programadas para sua formação continuada"
};

const UpcomingEvents = ({ 
  events = defaultEvents,
  title = defaultProps.title,
  description = defaultProps.description
}: UpcomingEventsProps) => {
  const getEventIcon = (type: Event["type"]) => {
    switch (type) {
      case "webinar":
        return <Video className="h-4 w-4" />;
      case "workshop":
        return <Users className="h-4 w-4" />;
      case "lecture":
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventTypeLabel = (type: Event["type"]) => {
    switch (type) {
      case "webinar":
        return "Webinar";
      case "workshop":
        return "Workshop";
      case "lecture":
        return "Palestra";
      case "meeting":
        return "Reunião";
      default:
        return "Evento";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long'
    });
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4 p-3 rounded-lg border">
              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md">
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {getEventTypeLabel(event.type)}
                  </Badge>
                </div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">
                    {formatDate(event.date)} - {event.time}
                  </Badge>
                  <Badge variant="outline" className="text-primary">
                    {event.speaker}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" size="sm">
          Ver Todos os Eventos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingEvents;
