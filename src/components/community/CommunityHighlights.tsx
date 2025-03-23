import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, BookOpen } from "lucide-react";

interface CommunityMember {
  id: string;
  name: string;
  avatarUrl: string;
  initials: string;
}

interface TopicItem {
  id: string;
  title: string;
  category: string;
  responseCount: number;
}

interface PresentationItem {
  id: string;
  title: string;
  presenter: {
    name: string;
    title: string;
    avatarUrl: string;
    initials: string;
  };
  datetime: string;
}

interface CommunityHighlightsProps {
  newMembers?: CommunityMember[];
  popularTopics?: TopicItem[];
  upcomingPresentations?: PresentationItem[];
}

const defaultMembers: CommunityMember[] = [
  {
    id: "1",
    name: "Ana Silva",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    initials: "AS",
  },
  {
    id: "2",
    name: "Carlos Mendes",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    initials: "CM",
  },
  {
    id: "3",
    name: "Juliana Costa",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
    initials: "JC",
  },
];

const defaultTopics: TopicItem[] = [
  {
    id: "1",
    title: "Abordagens terapêuticas para ansiedade em adolescentes",
    category: "Clínica",
    responseCount: 24,
  },
  {
    id: "2",
    title: "Experiências com terapia online durante a pandemia",
    category: "Prática",
    responseCount: 18,
  },
  {
    id: "3",
    title: "Recomendações de leituras sobre trauma complexo",
    category: "Recursos",
    responseCount: 15,
  },
];

const defaultPresentations: PresentationItem[] = [
  {
    id: "1",
    title: "Estudos de caso em Psicanálise Contemporânea",
    presenter: {
      name: "Dr. Roberto Almeida",
      title: "Próxima terça, 19h",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      initials: "RA",
    },
    datetime: "Próxima terça, 19h",
  },
  {
    id: "2",
    title: "Mindfulness na prática clínica",
    presenter: {
      name: "Dra. Patrícia Lopes",
      title: "Quinta-feira, 20h",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
      initials: "PL",
    },
    datetime: "Quinta-feira, 20h",
  },
];

const CommunityHighlights = ({
  newMembers = defaultMembers,
  popularTopics = defaultTopics,
  upcomingPresentations = defaultPresentations,
}: CommunityHighlightsProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Destaques da Comunidade</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Atividades recentes e interações da nossa comunidade
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Novos Membros */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
            <Users className="h-4 w-4 text-primary" />
            Novos Membros
          </h3>
          <div className="flex flex-wrap gap-4">
            {newMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatarUrl} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <span className="text-xs">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tópicos Populares */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
            <MessageSquare className="h-4 w-4 text-primary" />
            Tópicos Populares
          </h3>
          <div className="space-y-3">
            {popularTopics.map((topic) => (
              <div key={topic.id} className="border rounded-md p-3">
                <h4 className="font-medium text-sm">{topic.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs">
                    {topic.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {topic.responseCount} respostas
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apresentações de Membros */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4 text-primary" />
            Apresentações de Membros
          </h3>
          <div className="space-y-3">
            {upcomingPresentations.map((presentation) => (
              <div key={presentation.id} className="flex items-start gap-3 border rounded-md p-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={presentation.presenter.avatarUrl} />
                  <AvatarFallback>{presentation.presenter.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{presentation.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {presentation.presenter.name}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {presentation.datetime}
                  </Badge>
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
