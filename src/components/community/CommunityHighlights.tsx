import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, BookOpen } from "lucide-react";

const CommunityHighlights = () => {
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
            <div className="flex flex-col items-center gap-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ana" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="text-xs">Ana Silva</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <span className="text-xs">Carlos Mendes</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
              <span className="text-xs">Juliana Costa</span>
            </div>
          </div>
        </div>

        {/* Tópicos Populares */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
            <MessageSquare className="h-4 w-4 text-primary" />
            Tópicos Populares
          </h3>
          <div className="space-y-3">
            <div className="border rounded-md p-3">
              <h4 className="font-medium text-sm">
                Abordagens terapêuticas para ansiedade em adolescentes
              </h4>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="text-xs">
                  Clínica
                </Badge>
                <span className="text-xs text-muted-foreground">
                  24 respostas
                </span>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <h4 className="font-medium text-sm">
                Experiências com terapia online durante a pandemia
              </h4>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="text-xs">
                  Prática
                </Badge>
                <span className="text-xs text-muted-foreground">
                  18 respostas
                </span>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <h4 className="font-medium text-sm">
                Recomendações de leituras sobre trauma complexo
              </h4>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="text-xs">
                  Recursos
                </Badge>
                <span className="text-xs text-muted-foreground">
                  15 respostas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Apresentações de Membros */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4 text-primary" />
            Apresentações de Membros
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 border rounded-md p-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto" />
                <AvatarFallback>RA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium text-sm">
                  Estudos de caso em Psicanálise Contemporânea
                </h4>
                <p className="text-xs text-muted-foreground">
                  Dr. Roberto Almeida
                </p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  Próxima terça, 19h
                </Badge>
              </div>
            </div>
            <div className="flex items-start gap-3 border rounded-md p-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia" />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium text-sm">
                  Mindfulness na prática clínica
                </h4>
                <p className="text-xs text-muted-foreground">
                  Dra. Patrícia Lopes
                </p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  Quinta-feira, 20h
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityHighlights;
