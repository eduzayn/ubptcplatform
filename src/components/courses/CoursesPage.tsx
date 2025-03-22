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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Clock, Users, BookOpen } from "lucide-react";

const coursesData = [
  {
    id: 1,
    title: "Introdução à Psicanálise",
    instructor: "Dr. Carlos Mendes",
    description:
      "Um curso abrangente sobre os fundamentos da psicanálise moderna e suas aplicações clínicas.",
    price: 297.0,
    originalPrice: 497.0,
    duration: "8 semanas",
    level: "Iniciante",
    rating: 4.8,
    students: 1245,
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80",
    category: "Psicanálise",
    featured: true,
    modules: 8,
    certification: true,
  },
  {
    id: 2,
    title: "Terapia Cognitivo-Comportamental",
    instructor: "Dra. Ana Silva",
    description:
      "Aprenda as técnicas e ferramentas da TCC para aplicação em diversos contextos clínicos.",
    price: 347.0,
    originalPrice: 547.0,
    duration: "10 semanas",
    level: "Intermediário",
    rating: 4.9,
    students: 987,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    category: "TCC",
    featured: true,
    modules: 12,
    certification: true,
  },
  {
    id: 3,
    title: "Psicologia Junguiana",
    instructor: "Dr. Roberto Almeida",
    description:
      "Explore os conceitos fundamentais da psicologia analítica de Carl Jung e sua aplicação terapêutica.",
    price: 247.0,
    originalPrice: 397.0,
    duration: "6 semanas",
    level: "Intermediário",
    rating: 4.7,
    students: 645,
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    category: "Psicologia Analítica",
    featured: false,
    modules: 6,
    certification: true,
  },
  {
    id: 4,
    title: "Neuropsicologia Aplicada",
    instructor: "Dra. Patrícia Lopes",
    description:
      "Compreenda a relação entre o cérebro e o comportamento humano com foco em aplicações clínicas.",
    price: 397.0,
    originalPrice: 597.0,
    duration: "12 semanas",
    level: "Avançado",
    rating: 4.9,
    students: 432,
    image:
      "https://images.unsplash.com/photo-1559757175-7cb036bd4d31?w=800&q=80",
    category: "Neurociência",
    featured: false,
    modules: 10,
    certification: true,
  },
  {
    id: 5,
    title: "Psicoterapia Breve",
    instructor: "Dr. Fernando Costa",
    description:
      "Metodologias e técnicas para intervenções terapêuticas de curta duração com resultados eficazes.",
    price: 197.0,
    originalPrice: 297.0,
    duration: "4 semanas",
    level: "Intermediário",
    rating: 4.6,
    students: 789,
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
    category: "Psicoterapia",
    featured: false,
    modules: 5,
    certification: true,
  },
  {
    id: 6,
    title: "Terapia Familiar Sistêmica",
    instructor: "Dra. Mariana Santos",
    description:
      "Abordagem completa sobre intervenções terapêuticas no contexto familiar e de relacionamentos.",
    price: 347.0,
    originalPrice: 497.0,
    duration: "8 semanas",
    level: "Intermediário",
    rating: 4.8,
    students: 523,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    category: "Terapia Familiar",
    featured: true,
    modules: 8,
    certification: true,
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

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100,
  );

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {discount}% OFF
          </Badge>
        )}
        {course.featured && (
          <Badge className="absolute top-2 left-2 bg-primary">Destaque</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription className="text-sm">
              {course.instructor}
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{course.modules} módulos</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{course.students} alunos</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            R$ {course.price.toFixed(2)}
          </span>
          {course.originalPrice > course.price && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {course.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => navigate(`/checkout`, { state: { course } })}
        >
          Matricular-se
        </Button>
      </CardFooter>
    </Card>
  );
};

const CoursesPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" || course.category === selectedCategory;

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
              <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-primary to-primary-foreground text-white p-8 mb-8">
                <div className="max-w-3xl">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Cursos de Excelência para Profissionais de Saúde Mental
                  </h1>
                  <p className="text-lg mb-6">
                    Expanda seus conhecimentos e habilidades com nossos cursos
                    certificados ministrados por especialistas renomados.
                  </p>
                  <Button variant="secondary" size="lg">
                    Explorar Todos os Cursos
                  </Button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10">
                  <svg
                    width="300"
                    height="300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Buscar cursos..."
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
                        selectedCategory === category ? "default" : "outline"
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

              {/* Featured Courses */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cursos em Destaque</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses
                    .filter((course) => course.featured)
                    .map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                </div>
              </div>

              {/* All Courses */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Todos os Cursos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                {filteredCourses.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">
                      Nenhum curso encontrado
                    </h3>
                    <p className="text-muted-foreground">
                      Tente ajustar seus filtros ou termos de busca
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
