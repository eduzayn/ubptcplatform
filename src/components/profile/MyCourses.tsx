import React, { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Award, Play } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CertificationTracker from "../dashboard/CertificationTracker";

// Sample data for enrolled courses
const sampleCourses = [
  {
    id: 1,
    title: "Introdução à Psicanálise",
    instructor: "Dr. Carlos Mendes",
    progress: 25,
    lastAccessed: "2023-06-10T14:30:00",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80",
    totalModules: 8,
    completedModules: 2,
    totalHours: 16,
    category: "Psicanálise",
    nextLesson: "Fundamentos da Teoria Freudiana",
    certificate: false,
  },
  {
    id: 2,
    title: "Terapia Cognitivo-Comportamental",
    instructor: "Dra. Ana Silva",
    progress: 75,
    lastAccessed: "2023-06-12T10:15:00",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    totalModules: 12,
    completedModules: 9,
    totalHours: 24,
    category: "TCC",
    nextLesson: "Técnicas Avançadas de Reestruturação Cognitiva",
    certificate: false,
  },
];

const CourseCard = ({ course }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={course.progress === 100 ? "default" : "secondary"}
        >
          {course.progress === 100
            ? "Concluído"
            : `${course.progress}% Completo`}
        </Badge>
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
      <CardContent className="space-y-4 pb-2">
        <Progress value={course.progress} className="h-2" />

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>
              {course.completedModules}/{course.totalModules} módulos
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.totalHours} horas</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium">Próxima aula:</p>
          <p className="text-sm line-clamp-1">{course.nextLesson}</p>
        </div>

        <div className="text-xs text-muted-foreground">
          Último acesso: {formatDate(course.lastAccessed)}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button className="w-full" size="sm">
          <Play className="h-4 w-4 mr-1" /> Continuar
        </Button>
        {course.progress === 100 && !course.certificate ? (
          <Button variant="outline" className="w-full" size="sm">
            <Award className="h-4 w-4 mr-1" /> Certificado
          </Button>
        ) : (
          <Button variant="outline" className="w-full" size="sm">
            Detalhes
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(sampleCourses);
  const [activeTab, setActiveTab] = useState("all");
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");

  // Filter courses based on active tab
  const filteredCourses = enrolledCourses.filter((course) => {
    if (activeTab === "all") return true;
    if (activeTab === "in-progress") return course.progress < 100;
    if (activeTab === "completed") return course.progress === 100;
    return true;
  });

  // Listen for course enrollment events
  useEffect(() => {
    const handleCourseEnrolled = (event) => {
      const newCourse = event.detail.course;
      // Check if course already exists
      if (!enrolledCourses.some((course) => course.id === newCourse.id)) {
        // Add default properties for a newly enrolled course
        const courseWithDefaults = {
          ...newCourse,
          progress: 0,
          lastAccessed: new Date().toISOString(),
          totalModules: newCourse.modules || 8,
          completedModules: 0,
          totalHours: newCourse.duration
            ? parseInt(newCourse.duration) * 2
            : 16,
          nextLesson: "Introdução ao Curso",
          certificate: false,
        };
        setEnrolledCourses((prev) => [courseWithDefaults, ...prev]);
      }
    };

    window.addEventListener("courseEnrolled", handleCourseEnrolled);
    return () =>
      window.removeEventListener("courseEnrolled", handleCourseEnrolled);
  }, [enrolledCourses]);

  // Check for success message from location state
  useEffect(() => {
    if (location.state?.success) {
      setSuccessMessage(location.state.message);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Meus Cursos</h2>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

<<<<<<< HEAD
      {activeTab === "in-progress" && (
        <CertificationTracker
          membershipMonths={3}
          certificationEligible={false}
          className=""
        />
      )}
=======
      {activeTab === "in-progress" && <CertificationTracker className="mb-6" />}
>>>>>>> 4aad6eab0ea6fc2b03090df29174c9cfbfba9f8e

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <h3 className="text-lg font-medium mb-2">
            Nenhum curso{" "}
            {activeTab === "completed"
              ? "concluído"
              : activeTab === "in-progress"
                ? "em andamento"
                : "encontrado"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {activeTab === "all"
              ? "Você ainda não se matriculou em nenhum curso."
              : activeTab === "in-progress"
                ? "Você não tem cursos em andamento no momento."
                : "Você ainda não concluiu nenhum curso."}
          </p>
          {activeTab === "all" && (
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/courses")}
            >
              Explorar Cursos
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
