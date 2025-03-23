import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserRoleManagement from "./UserRoleManagement";

const UsersManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="roles">Papéis e Permissões</TabsTrigger>
          <TabsTrigger value="invites">Convites</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-6">
          <UserRoleManagement />
        </TabsContent>
        <TabsContent value="roles" className="mt-6">
          <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Papéis do Sistema</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-bold text-red-700">Administrador</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Acesso completo a todas as funcionalidades do sistema,
                  incluindo gerenciamento de usuários, configurações globais e
                  relatórios administrativos.
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-bold text-blue-700">Gestor</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Pode gerenciar conteúdos, eventos, biblioteca digital e
                  visualizar relatórios. Tem acesso limitado às configurações do
                  sistema e não pode gerenciar papéis de usuários.
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-bold text-green-700">Profissional</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Acesso às funcionalidades de membro, incluindo conteúdos,
                  eventos, biblioteca e comunidade. Pode criar e compartilhar
                  conteúdo mediante aprovação de um gestor.
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-bold text-gray-700">Usuário</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Acesso básico à plataforma. Pode visualizar conteúdos públicos
                  e participar de eventos abertos, mas não tem acesso a recursos
                  exclusivos para membros.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="invites" className="mt-6">
          <div className="p-6 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Convites Pendentes</h2>
            <p className="text-muted-foreground">
              Nenhum convite pendente no momento.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersManagement;
