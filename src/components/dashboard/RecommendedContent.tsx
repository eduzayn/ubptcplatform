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
import { BookOpen, Headphones, FileText, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { ContentItem } from "@/types/dashboard";

interface RecommendedContentProps {
  items?: ContentItem[];
  title?: string;
  description?: string;
}

const defaultItems: ContentItem[] = [
  {
    id: "1",
    title: "Fundamentos da Teoria Psicanalítica",
    description: "Uma introdução abrangente aos conceitos-chave da psicanálise moderna",
    type: "ebook",
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
    url: "/library/ebook/1",
  },
  {
    id: "2",
    title: "Estudos de Caso Clínicos em Transtornos de Ansiedade",
    description: "Abordagens práticas para tratar ansiedade em ambientes clínicos",
    type: "article",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&q=80",
    url: "/library/article/2",
  },
  {
    id: "3",
    title: "A Relação Terapêutica",
    description: "Explorando a dinâmica das interações cliente-terapeuta",
    type: "podcast",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&q=80",
    url: "/library/podcast/3",
  },
];

const RecommendedContent = ({
  items = defaultItems,
  title = "Conteúdo Recomendado",
  description = "Materiais educacionais personalizados com base em seus interesses e caminho de certificação",
}: RecommendedContentProps) => {
  const getTypeIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "ebook":
        return <BookOpen className="h-4 w-4" />;
      case "podcast":
        return <Headphones className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: ContentItem["type"]) => {
    switch (type) {
      case "ebook":
        return "E-Book";
      case "podcast":
        return "Podcast";
      case "article":
        return "Artigo";
      default:
        return "Resource";
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                      item.type === "ebook"
                        ? "bg-blue-100 text-blue-800"
                        : item.type === "podcast"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800",
                    )}
                  >
                    {getTypeIcon(item.type)}
                    <span className="ml-1">{getTypeLabel(item.type)}</span>
                  </span>
                </div>
                <h4 className="mt-1 font-medium">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" size="sm">
          Ver Todas as Recomendações
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendedContent;
