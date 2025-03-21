import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { MessageCircle, Users, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunityMember {
  id: string;
  name: string;
  profession: string;
  avatarUrl?: string;
  joinedDate: string;
}

interface DiscussionTopic {
  id: string;
  title: string;
  replies: number;
  category: string;
}

interface UpcomingPresentation {
  id: string;
  title: string;
  presenter: string;
  date: string;
  avatarUrl?: string;
}

interface CommunityHighlightsProps {
  newMembers?: CommunityMember[];
  popularTopics?: DiscussionTopic[];
  upcomingPresentations?: UpcomingPresentation[];
}

const CommunityHighlights = ({
  newMembers = [
    {
      id: "1",
      name: "Ana Silva",
      profession: "Psicóloga",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      joinedDate: "2 dias atrás",
    },
    {
      id: "2",
      name: "Carlos Mendes",
      profession: "Psicanalista",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      joinedDate: "5 dias atrás",
    },
    {
      id: "3",
      name: "Juliana Costa",
      profession: "Terapeuta",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
      joinedDate: "1 semana atrás",
    },
  ],
  popularTopics = [
    {
      id: "1",
      title: "Abordagens terapêuticas para ansiedade em adolescentes",
      replies: 24,
      category: "Clínica",
    },
    {
      id: "2",
      title: "Experiências com terapia online durante a pandemia",
      replies: 18,
      category: "Prática",
    },
    {
      id: "3",
      title: "Recomendações de leituras sobre trauma complexo",
      replies: 15,
      category: "Recursos",
    },
  ],
  upcomingPresentations = [
    {
      id: "1",
      title: "Estudos de caso em Psicanálise Contemporânea",
      presenter: "Dr. Roberto Almeida",
      date: "Próxima terça, 19h",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
    {
      id: "2",
      title: "Mindfulness na prática clínica",
      presenter: "Dra. Patrícia Lopes",
      date: "Quinta-feira, 20h",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
    },
  ],
}: CommunityHighlightsProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" />
          Destaques da Comunidade
        </CardTitle>
        <CardDescription className="text-gray-500">
          Atividades recentes e interações da nossa comunidade
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* New Members Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Users className="h-4 w-4 text-indigo-500" />
            Novos Membros
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {newMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-1"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Popular Topics Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <MessageCircle className="h-4 w-4 text-indigo-500" />
            Tópicos Populares
          </h3>
          <div className="space-y-2">
            {popularTopics.map((topic) => (
              <div key={topic.id} className="bg-gray-50 rounded-lg p-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {topic.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200"
                      >
                        {topic.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {topic.replies} respostas
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Upcoming Presentations Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Award className="h-4 w-4 text-indigo-500" />
            Apresentações de Membros
          </h3>
          <div className="space-y-2">
            {upcomingPresentations.map((presentation) => (
              <div
                key={presentation.id}
                className="flex items-center gap-3 bg-gray-50 rounded-lg p-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={presentation.avatarUrl}
                    alt={presentation.presenter}
                  />
                  <AvatarFallback>
                    {presentation.presenter.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {presentation.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">
                      {presentation.presenter}
                    </span>
                    <span className="text-xs text-indigo-600 font-medium">
                      {presentation.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityHighlights;
