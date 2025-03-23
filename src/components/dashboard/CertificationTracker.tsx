import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, AlertCircle } from "lucide-react";

interface CertificationRequirement {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  progress?: number;
}

interface CertificationTrackerProps {
  requirements: CertificationRequirement[];
}

const CertificationTracker: React.FC<CertificationTrackerProps> = ({
  requirements,
}) => {
  const totalRequirements = requirements.length;
  const completedRequirements = requirements.filter((req) => req.completed).length;
  const progress = (completedRequirements / totalRequirements) * 100;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Rastreamento de Certificação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Progresso da Certificação
              </p>
              <p className="text-sm text-muted-foreground">
                {completedRequirements} de {totalRequirements} requisitos
                completados
              </p>
            </div>
            <div className="text-sm font-medium">
              {Math.round(progress)}%
            </div>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="space-y-4">
            {requirements.map((requirement) => (
              <div
                key={requirement.id}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div className="mt-1">
                  {requirement.completed ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{requirement.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {requirement.description}
                  </p>
                  {requirement.progress !== undefined && (
                    <Progress
                      value={requirement.progress}
                      className="h-1 mt-2"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationTracker;
