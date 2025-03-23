import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Key, Save, UserCog } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const permissions: Permission[] = [
  // Membros
  {
    id: "members_view",
    name: "Visualizar Membros",
    description: "Permite visualizar a lista de membros",
    module: "members",
  },
  {
    id: "members_create",
    name: "Criar Membros",
    description: "Permite adicionar novos membros",
    module: "members",
  },
  {
    id: "members_edit",
    name: "Editar Membros",
    description: "Permite editar informações de membros",
    module: "members",
  },
  {
    id: "members_delete",
    name: "Excluir Membros",
    description: "Permite excluir membros",
    module: "members",
  },

  // Conteúdo
  {
    id: "content_view",
    name: "Visualizar Conteúdo",
    description: "Permite visualizar o conteúdo do site",
    module: "content",
  },
  {
    id: "content_create",
    name: "Criar Conteúdo",
    description: "Permite adicionar novo conteúdo",
    module: "content",
  },
  {
    id: "content_edit",
    name: "Editar Conteúdo",
    description: "Permite editar conteúdo existente",
    module: "content",
  },
  {
    id: "content_delete",
    name: "Excluir Conteúdo",
    description: "Permite excluir conteúdo",
    module: "content",
  },

  // Cursos
  {
    id: "courses_view",
    name: "Visualizar Cursos",
    description: "Permite visualizar cursos",
    module: "courses",
  },
  {
    id: "courses_create",
    name: "Criar Cursos",
    description: "Permite criar novos cursos",
    module: "courses",
  },
  {
    id: "courses_edit",
    name: "Editar Cursos",
    description: "Permite editar cursos existentes",
    module: "courses",
  },
  {
    id: "courses_delete",
    name: "Excluir Cursos",
    description: "Permite excluir cursos",
    module: "courses",
  },

  // Biblioteca
  {
    id: "library_view",
    name: "Visualizar Biblioteca",
    description: "Permite visualizar itens da biblioteca",
    module: "library",
  },
  {
    id: "library_create",
    name: "Adicionar à Biblioteca",
    description: "Permite adicionar itens à biblioteca",
    module: "library",
  },
  {
    id: "library_edit",
    name: "Editar Itens da Biblioteca",
    description: "Permite editar itens da biblioteca",
    module: "library",
  },
  {
    id: "library_delete",
    name: "Excluir Itens da Biblioteca",
    description: "Permite excluir itens da biblioteca",
    module: "library",
  },

  // Credenciais
  {
    id: "credentials_view",
    name: "Visualizar Credenciais",
    description: "Permite visualizar credenciais",
    module: "credentials",
  },
  {
    id: "credentials_create",
    name: "Emitir Credenciais",
    description: "Permite emitir novas credenciais",
    module: "credentials",
  },
  {
    id: "credentials_revoke",
    name: "Revogar Credenciais",
    description: "Permite revogar credenciais",
    module: "credentials",
  },

  // Usuários
  {
    id: "users_view",
    name: "Visualizar Usuários",
    description: "Permite visualizar usuários do sistema",
    module: "users",
  },
  {
    id: "users_create",
    name: "Criar Usuários",
    description: "Permite criar novos usuários",
    module: "users",
  },
  {
    id: "users_edit",
    name: "Editar Usuários",
    description: "Permite editar usuários existentes",
    module: "users",
  },
  {
    id: "users_delete",
    name: "Excluir Usuários",
    description: "Permite excluir usuários",
    module: "users",
  },

  // Configurações
  {
    id: "settings_view",
    name: "Visualizar Configurações",
    description: "Permite visualizar configurações do sistema",
    module: "settings",
  },
  {
    id: "settings_edit",
    name: "Editar Configurações",
    description: "Permite editar configurações do sistema",
    module: "settings",
  },
];

const defaultRoles: Role[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Controle total da ferramenta",
    permissions: permissions.map((p) => p.id),
  },
  {
    id: "manager",
    name: "Gestor",
    description:
      "Controle parcial apenas das áreas que têm informações sobre os associados",
    permissions: [
      "members_view",
      "members_edit",
      "content_view",
      "content_edit",
      "courses_view",
      "library_view",
      "credentials_view",
      "users_view",
    ],
  },
  {
    id: "professional",
    name: "Profissional",
    description: "Acesso à parte de construção dos cursos e biblioteca digital",
    permissions: [
      "courses_view",
      "courses_create",
      "courses_edit",
      "library_view",
      "library_create",
      "library_edit",
    ],
  },
];

const UserRoleSettings = () => {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordPolicyDialogOpen, setIsPasswordPolicyDialogOpen] =
    useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90,
  });

  const handleRoleSelect = (role: Role) => {
    setSelectedRole({ ...role });
    setIsEditDialogOpen(true);
  };

  const handlePermissionToggle = (permissionId: string) => {
    if (!selectedRole) return;

    const updatedPermissions = selectedRole.permissions.includes(permissionId)
      ? selectedRole.permissions.filter((id) => id !== permissionId)
      : [...selectedRole.permissions, permissionId];

    setSelectedRole({
      ...selectedRole,
      permissions: updatedPermissions,
    });
  };

  const handleSaveRole = () => {
    if (!selectedRole) return;

    const updatedRoles = roles.map((role) =>
      role.id === selectedRole.id ? selectedRole : role,
    );

    setRoles(updatedRoles);
    setIsEditDialogOpen(false);
  };

  const handlePasswordPolicyChange = (field: string, value: any) => {
    setPasswordPolicy({
      ...passwordPolicy,
      [field]: value,
    });
  };

  const handleSavePasswordPolicy = () => {
    // Here you would typically save the password policy to your backend
    console.log("Password policy saved:", passwordPolicy);
    setIsPasswordPolicyDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Configurações de Usuários e Permissões
        </h1>
      </div>

      <Tabs defaultValue="roles">
        <TabsList className="mb-4">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Funções e Permissões
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Key className="h-4 w-4" /> Política de Senhas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Funções de Usuário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome da Função</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Permissões</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">
                          {role.name}
                        </TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline">
                              {role.permissions.length} permissões
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRoleSelect(role)}
                          >
                            Editar Permissões
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Edit Role Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Editar Permissões: {selectedRole?.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedRole?.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  {[
                    "members",
                    "content",
                    "courses",
                    "library",
                    "credentials",
                    "users",
                    "settings",
                  ].map((module) => (
                    <div key={module} className="border rounded-md p-4">
                      <h3 className="font-medium mb-3 capitalize">
                        {module === "members"
                          ? "Membros"
                          : module === "content"
                            ? "Conteúdo"
                            : module === "courses"
                              ? "Cursos"
                              : module === "library"
                                ? "Biblioteca"
                                : module === "credentials"
                                  ? "Credenciais"
                                  : module === "users"
                                    ? "Usuários"
                                    : "Configurações"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions
                          .filter((p) => p.module === module)
                          .map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-start space-x-2"
                            >
                              <Checkbox
                                id={permission.id}
                                checked={selectedRole?.permissions.includes(
                                  permission.id,
                                )}
                                onCheckedChange={() =>
                                  handlePermissionToggle(permission.id)
                                }
                              />
                              <div className="grid gap-1.5">
                                <Label
                                  htmlFor={permission.id}
                                  className="font-medium"
                                >
                                  {permission.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSaveRole}>
                  <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Política de Senhas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Requisitos de Senha
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="minLength">Comprimento mínimo</Label>
                          <div className="flex items-center">
                            <Input
                              id="minLength"
                              type="number"
                              value={passwordPolicy.minLength}
                              onChange={(e) =>
                                handlePasswordPolicyChange(
                                  "minLength",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-16 text-right"
                              min={6}
                              max={20}
                            />
                            <span className="ml-2">caracteres</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="requireUppercase"
                            checked={passwordPolicy.requireUppercase}
                            onCheckedChange={(checked) =>
                              handlePasswordPolicyChange(
                                "requireUppercase",
                                checked,
                              )
                            }
                          />
                          <Label htmlFor="requireUppercase">
                            Exigir letras maiúsculas
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="requireLowercase"
                            checked={passwordPolicy.requireLowercase}
                            onCheckedChange={(checked) =>
                              handlePasswordPolicyChange(
                                "requireLowercase",
                                checked,
                              )
                            }
                          />
                          <Label htmlFor="requireLowercase">
                            Exigir letras minúsculas
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="requireNumbers"
                            checked={passwordPolicy.requireNumbers}
                            onCheckedChange={(checked) =>
                              handlePasswordPolicyChange(
                                "requireNumbers",
                                checked,
                              )
                            }
                          />
                          <Label htmlFor="requireNumbers">Exigir números</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="requireSpecialChars"
                            checked={passwordPolicy.requireSpecialChars}
                            onCheckedChange={(checked) =>
                              handlePasswordPolicyChange(
                                "requireSpecialChars",
                                checked,
                              )
                            }
                          />
                          <Label htmlFor="requireSpecialChars">
                            Exigir caracteres especiais
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Expiração de Senha
                      </h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="expiryDays">Expirar senhas após</Label>
                        <div className="flex items-center">
                          <Input
                            id="expiryDays"
                            type="number"
                            value={passwordPolicy.expiryDays}
                            onChange={(e) =>
                              handlePasswordPolicyChange(
                                "expiryDays",
                                parseInt(e.target.value),
                              )
                            }
                            className="w-16 text-right"
                            min={0}
                            max={365}
                          />
                          <span className="ml-2">dias</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Defina como 0 para desativar a expiração de senha
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">
                        Políticas por Função
                      </h3>
                      <div className="space-y-3">
                        {roles.map((role) => (
                          <div
                            key={role.id}
                            className="flex items-center justify-between border-b pb-2"
                          >
                            <div>
                              <p className="font-medium">{role.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {role.description}
                              </p>
                            </div>
                            <Badge
                              variant={
                                role.id === "admin"
                                  ? "destructive"
                                  : role.id === "manager"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {role.id === "admin"
                                ? "Política Rigorosa"
                                : role.id === "manager"
                                  ? "Política Padrão"
                                  : "Política Básica"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Redefinição de Senha</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure as opções para redefinição de senha pelos
                        usuários
                      </p>
                    </div>
                    <Button onClick={() => setIsPasswordPolicyDialogOpen(true)}>
                      <UserCog className="mr-2 h-4 w-4" /> Configurar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password Reset Policy Dialog */}
          <Dialog
            open={isPasswordPolicyDialogOpen}
            onOpenChange={setIsPasswordPolicyDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurações de Redefinição de Senha</DialogTitle>
                <DialogDescription>
                  Configure como os usuários podem redefinir suas senhas
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allowSelfReset" defaultChecked />
                    <Label htmlFor="allowSelfReset">
                      Permitir que usuários redefinam suas próprias senhas
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="requireEmailVerification" defaultChecked />
                    <Label htmlFor="requireEmailVerification">
                      Exigir verificação por e-mail
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="notifyAdmins" />
                    <Label htmlFor="notifyAdmins">
                      Notificar administradores sobre redefinições de senha
                    </Label>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Label htmlFor="tokenExpiry">
                      Expiração do link de redefinição
                    </Label>
                    <div className="flex items-center">
                      <Input
                        id="tokenExpiry"
                        type="number"
                        defaultValue={24}
                        className="w-16 text-right"
                        min={1}
                        max={72}
                      />
                      <span className="ml-2">horas</span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsPasswordPolicyDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSavePasswordPolicy}>
                  <Save className="mr-2 h-4 w-4" /> Salvar Configurações
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>

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
