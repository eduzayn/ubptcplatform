import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const UserRoleSettings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações de Papéis de Usuário</h1>

      <Card>
        <CardHeader>
          <CardTitle>Papéis do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  Administrador
                </Badge>
                <span className="text-sm font-medium">
                  Acesso total ao sistema
                </span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Permissões:</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Gerenciar todos os usuários e suas permissões</li>
                <li>Configurar todos os aspectos do sistema</li>
                <li>Acesso a todos os relatórios e estatísticas</li>
                <li>Gerenciar conteúdos, eventos e biblioteca digital</li>
                <li>Aprovar ou rejeitar conteúdos enviados por membros</li>
                <li>Gerenciar credenciais digitais</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Gestor
                </Badge>
                <span className="text-sm font-medium">
                  Gerenciamento de conteúdo e membros
                </span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Permissões:</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Visualizar lista de usuários (sem alterar permissões)</li>
                <li>Gerenciar conteúdos, eventos e biblioteca digital</li>
                <li>Aprovar ou rejeitar conteúdos enviados por membros</li>
                <li>Acesso a relatórios básicos</li>
                <li>Verificar credenciais digitais</li>
                <li>Gerenciar a comunidade e fóruns de discussão</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Profissional
                </Badge>
                <span className="text-sm font-medium">
                  Membro com acesso completo
                </span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Permissões:</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Acesso a todos os conteúdos e recursos para membros</li>
                <li>Participar de eventos e workshops</li>
                <li>Acesso à biblioteca digital completa</li>
                <li>Enviar conteúdos para aprovação</li>
                <li>Participar de fóruns e comunidade</li>
                <li>Acesso às credenciais digitais profissionais</li>
                <li>Acesso ao progresso de certificação</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                  Usuário
                </Badge>
                <span className="text-sm font-medium">Acesso básico</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Permissões:</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Visualizar conteúdos públicos</li>
                <li>Participar de eventos abertos</li>
                <li>Acesso limitado à biblioteca digital</li>
                <li>Visualizar informações sobre associação</li>
                <li>Gerenciar perfil pessoal</li>
                <li>Assinar plano de membro</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoleSettings;
