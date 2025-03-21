import React from "react";
import { Progress } from "../ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CheckCircle, Clock, Award, BookOpen } from "lucide-react";

interface CertificationRequirement {
  id: string;
  name: string;
  completed: boolean;
  description: string;
}

interface CertificationTrackerProps {
  membershipMonths?: number;
  completedRequirements?: CertificationRequirement[];
  totalRequirements?: CertificationRequirement[];
  certificationEligible?: boolean;
}

const CertificationTracker = ({
  membershipMonths = 5,
  completedRequirements = [
    {
      id: "1",
      name: "Introdução à Psicanálise",
      completed: true,
      description: "Módulo básico sobre fundamentos da psicanálise",
    },
    {
      id: "2",
      name: "Técnicas Terapêuticas",
      completed: true,
      description: "Abordagens práticas para sessões terapêuticas",
    },
    {
      id: "3",
      name: "Estudos de Caso",
      completed: true,
      description: "Análise de casos clínicos reais",
    },
  ],
  totalRequirements = [
    {
      id: "1",
      name: "Introdução à Psicanálise",
      completed: true,
      description: "Módulo básico sobre fundamentos da psicanálise",
    },
    {
      id: "2",
      name: "Técnicas Terapêuticas",
      completed: true,
      description: "Abordagens práticas para sessões terapêuticas",
    },
    {
      id: "3",
      name: "Estudos de Caso",
      completed: true,
      description: "Análise de casos clínicos reais",
    },
    {
      id: "4",
      name: "Supervisão Clínica",
      completed: false,
      description: "Participação em sessões de supervisão",
    },
    {
      id: "5",
      name: "Trabalho Final",
      completed: false,
      description: "Apresentação de trabalho de conclusão",
    },
  ],
  certificationEligible = false,
}: CertificationTrackerProps) => {
  const progressPercentage = Math.round(
    (completedRequirements.length / totalRequirements.length) * 100,
  );

  const monthsRemaining = 12 - membershipMonths;

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Progresso da Certificação
          </CardTitle>
          <Badge
            variant={certificationEligible ? "default" : "outline"}
            className="ml-2"
          >
            {certificationEligible
              ? "Elegível"
              : `${monthsRemaining} meses restantes`}
          </Badge>
        </div>
        <CardDescription>
          Complete os requisitos e mantenha sua assinatura por 12 meses para
          obter sua certificação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progresso dos módulos</span>
            <span className="text-sm font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Tempo de associação: {membershipMonths} de 12 meses
            </span>
          </div>
          <Progress value={(membershipMonths / 12) * 100} className="h-2" />
        </div>

        <div className="space-y-3 mt-4">
          <h4 className="text-sm font-semibold">
            Requisitos para certificação:
          </h4>
          {totalRequirements.map((req) => (
            <div
              key={req.id}
              className="flex items-start gap-2 p-2 rounded-md bg-slate-50"
            >
              {req.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium">{req.name}</p>
                <p className="text-xs text-muted-foreground">
                  {req.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {certificationEligible ? (
            <Button className="w-full">
              <Award className="mr-2 h-4 w-4" /> Solicitar Certificação
            </Button>
          ) : (
            <Button variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" /> Ver Próximos Módulos
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationTracker;
