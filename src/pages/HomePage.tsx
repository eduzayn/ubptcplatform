import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Bem-vindo à Plataforma ABPBE
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Associação Brasileira de Psicologia Baseada em Evidências
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/courses">
              Explorar Cursos
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/association">
              Sobre a Associação
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Cursos</h2>
          <p className="text-muted-foreground mb-4">
            Acesse nossa biblioteca de cursos e treinamentos especializados.
          </p>
          <Button variant="link" asChild>
            <Link to="/courses">Ver Cursos</Link>
          </Button>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Biblioteca</h2>
          <p className="text-muted-foreground mb-4">
            Explore nossa coleção de recursos e materiais científicos.
          </p>
          <Button variant="link" asChild>
            <Link to="/library">Acessar Biblioteca</Link>
          </Button>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Comunidade</h2>
          <p className="text-muted-foreground mb-4">
            Conecte-se com outros profissionais e participe de discussões.
          </p>
          <Button variant="link" asChild>
            <Link to="/community">Participar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
