import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  BookOpen,
  FileText,
  Headphones,
} from "lucide-react";
import RecommendedContent from "../dashboard/RecommendedContent";

interface EbookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  fileSize: string;
  category: string;
  downloadUrl: string;
  publishDate: string;
}

const ebooksData: EbookItem[] = [
  {
    id: "1",
    title: "Fundamentos da Psicanálise",
    author: "Dr. Carlos Mendes",
    description:
      "Uma introdução abrangente aos conceitos-chave da psicanálise moderna e suas aplicações clínicas.",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
    fileSize: "12.5 MB",
    category: "Psicanálise",
    downloadUrl: "#",
    publishDate: "10/05/2023",
  },
  {
    id: "2",
    title: "Manual de Terapia Cognitiva",
    author: "Dra. Ana Silva",
    description:
      "Guia prático com técnicas e ferramentas da TCC para aplicação em diversos contextos clínicos.",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80",
    fileSize: "8.2 MB",
    category: "TCC",
    downloadUrl: "#",
    publishDate: "15/04/2023",
  },
  {
    id: "3",
    title: "Introdução à Psicologia Analítica",
    author: "Dr. Roberto Jung",
    description:
      "Explore os conceitos fundamentais da psicologia analítica de Carl Jung e sua aplicação terapêutica.",
    coverImage:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80",
    fileSize: "5.7 MB",
    category: "Psicologia Analítica",
    downloadUrl: "#",
    publishDate: "20/03/2023",
  },
  {
    id: "4",
    title: "Neurociência e Comportamento",
    author: "Dra. Patrícia Lopes",
    description:
      "Compreenda a relação entre o cérebro e o comportamento humano com foco em aplicações clínicas.",
    coverImage:
      "https://images.unsplash.com/photo-1559757175-7cb036bd4d31?w=300&q=80",
    fileSize: "10.3 MB",
    category: "Neurociência",
    downloadUrl: "#",
    publishDate: "05/05/2023",
  },
  {
    id: "5",
    title: "Psicoterapia Breve: Métodos e Técnicas",
    author: "Dr. Fernando Costa",
    description:
      "Metodologias e técnicas para intervenções terapêuticas de curta duração com resultados eficazes.",
    coverImage:
      "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=300&q=80",
    fileSize: "7.8 MB",
    category: "Psicoterapia",
    downloadUrl: "#",
    publishDate: "01/04/2023",
  },
  {
    id: "6",
    title: "Terapia Familiar Sistêmica",
    author: "Dra. Mariana Santos",
    description:
      "Abordagem completa sobre intervenções terapêuticas no contexto familiar e de relacionamentos.",
    coverImage:
      "https://images.unsplash.com/photo-1529473814998-077b4fec6770?w=300&q=80",
    fileSize: "9.1 MB",
    category: "Terapia Familiar",
    downloadUrl: "#",
    publishDate: "15/02/2023",
  },
];

const categories = [
  "Todos",
  "Psicanálise",
  "TCC",
  "Psicologia Analítica",
  "Neurociência",
  "Psicoterapia",
  "Terapia Familiar",
];

const EbookCard = ({ ebook }: { ebook: EbookItem }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={ebook.coverImage}
          alt={ebook.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary">
          {ebook.category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{ebook.title}</CardTitle>
        <CardDescription className="text-sm">{ebook.author}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {ebook.description}
        </p>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Tamanho: {ebook.fileSize}</span>
          <span>Publicado: {ebook.publishDate}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2">
          <Download className="h-4 w-4" /> Download
        </Button>
      </CardFooter>
    </Card>
  );
};

const LibraryPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState("ebooks");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const filteredEbooks = ebooksData.filter((ebook) => {
    const matchesSearch =
      ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ebook.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" || ebook.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        <Navbar
          onMenuToggle={toggleSidebar}
          username="Maria Silva"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
          notificationCount={5}
          isAdmin={true}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showSidebar ? "block" : "hidden"} md:block flex-shrink-0`}
          >
            <Sidebar />
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Hero Section */}
              <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 mb-8">
                <div className="max-w-3xl">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Biblioteca Digital UBPTC
                  </h1>
                  <p className="text-lg mb-6">
                    Acesse nossa coleção de e-books, artigos e recursos
                    educacionais para aprimorar seus conhecimentos.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10">
                  <BookOpen className="h-64 w-64" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-96">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Buscar por título, autor ou descrição..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={
                            selectedCategory === category
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="whitespace-nowrap"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Content Tabs */}
                  <Tabs
                    defaultValue="ebooks"
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="mb-6">
                      <TabsTrigger
                        value="ebooks"
                        className="flex items-center gap-2"
                      >
                        <BookOpen className="h-4 w-4" /> E-books
                      </TabsTrigger>
                      <TabsTrigger
                        value="articles"
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" /> Artigos
                      </TabsTrigger>
                      <TabsTrigger
                        value="podcasts"
                        className="flex items-center gap-2"
                      >
                        <Headphones className="h-4 w-4" /> Podcasts
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ebooks">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredEbooks.map((ebook) => (
                          <EbookCard key={ebook.id} ebook={ebook} />
                        ))}
                      </div>
                      {filteredEbooks.length === 0 && (
                        <div className="text-center py-12">
                          <h3 className="text-lg font-medium">
                            Nenhum e-book encontrado
                          </h3>
                          <p className="text-muted-foreground">
                            Tente ajustar seus filtros ou termos de busca
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="articles">
                      <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">
                          Artigos em breve
                        </h3>
                        <p className="text-muted-foreground">
                          Estamos preparando uma coleção de artigos científicos
                          para você.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="podcasts">
                      <div className="text-center py-12">
                        <Headphones className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">
                          Podcasts em breve
                        </h3>
                        <p className="text-muted-foreground">
                          Estamos preparando uma série de podcasts com
                          especialistas da área.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Recommended Content */}
                  <RecommendedContent
                    title="Conteúdo Recomendado"
                    description="Materiais educacionais personalizados com base em seus interesses e caminho de certificação"
                    items={[
                      {
                        id: "1",
                        title: "Fundamentos da Teoria Psicanalítica",
                        description:
                          "Uma introdução abrangente aos conceitos-chave da psicanálise moderna",
                        type: "ebook",
                        thumbnail:
                          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
                        url: "/library/ebook/1",
                      },
                      {
                        id: "2",
                        title:
                          "Estudos de Caso Clínicos em Transtornos de Ansiedade",
                        description:
                          "Abordagens práticas para tratar ansiedade em ambientes clínicos",
                        type: "article",
                        thumbnail:
                          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&q=80",
                        url: "/library/article/2",
                      },
                      {
                        id: "3",
                        title: "A Relação Terapêutica",
                        description:
                          "Explorando a dinâmica das interações cliente-terapeuta",
                        type: "podcast",
                        thumbnail:
                          "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&q=80",
                        url: "/library/podcast/3",
                      },
                    ]}
                  />

                  {/* Most Popular */}
                  <Card className="w-full bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle>Mais Populares</CardTitle>
                      <CardDescription>
                        Os materiais mais acessados este mês
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {ebooksData.slice(0, 3).map((ebook) => (
                          <div
                            key={ebook.id}
                            className="flex items-start space-x-4"
                          >
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <img
                                src={ebook.coverImage}
                                alt={ebook.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {ebook.title}
                              </h4>
                              <p className="mt-1 text-xs text-gray-600 line-clamp-1">
                                {ebook.author}
                              </p>
                              <div className="mt-1 flex items-center">
                                <Badge variant="outline" className="text-xs">
                                  {ebook.category}
                                </Badge>
                                <span className="ml-2 text-xs text-gray-500">
                                  {ebook.fileSize}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" size="sm">
                        Ver Todos
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
