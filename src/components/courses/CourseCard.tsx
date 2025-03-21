import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users } from "lucide-react";

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  enrolled: number;
  progress?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  onClick?: () => void;
}

const CourseCard = ({
  id = "1",
  title = "Introdução à Psicanálise Contemporânea",
  description = "Fundamentos e aplicações práticas da psicanálise no contexto atual",
  instructor = "Dr. Carlos Mendes",
  duration = "8 horas",
  enrolled = 128,
  progress = 0,
  image = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  category = "Psicanálise",
  isNew = false,
  isFeatured = false,
  onClick = () => {},
}: CourseProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
            Novo
          </Badge>
        )}
        {isFeatured && (
          <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">
            Destaque
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{instructor}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{enrolled} alunos</span>
          </div>
        </div>

        {progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full">
          {progress > 0 ? "Continuar" : "Começar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
