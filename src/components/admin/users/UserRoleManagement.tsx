import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useUserRoles, type UserRole } from "@/lib/hooks";
import { signUp, supabase } from "@/lib/supabase";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  UserCog,
  Trash2,
  UserPlus,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  created_at: string;
  last_sign_in_at: string | null;
  status: "active" | "inactive" | "pending";
}

const UserRoleManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);
  const [newRole, setNewRole] = useState<UserRole>("profissional");
  const [newStatus, setNewStatus] = useState<"active" | "inactive" | "pending">(
    "active",
  );
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    cpf: "",
    role: "profissional" as UserRole,
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const { getAllUsers, updateUserRole, loading: roleLoading } = useUserRoles();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Garantir que a lista filtrada seja atualizada quando a lista de usuários mudar
  useEffect(() => {
    if (
      users.length > 0 &&
      filteredUsers.length === 0 &&
      !searchTerm &&
      roleFilter === "all" &&
      statusFilter === "all"
    ) {
      setFilteredUsers([...users]);
    }
  }, [users, filteredUsers, searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await getAllUsers();
    if (error) {
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setUsers(data);
      setFilteredUsers(data); // Garantir que a lista filtrada também seja atualizada
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let result = [...users];

    // Aplicar filtro de pesquisa
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.full_name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term),
      );
    }

    // Aplicar filtro de papel
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Aplicar filtro de status
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(result);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setNewStatus(user.status);
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleApproveUser = (user: User) => {
    setSelectedUser(user);
    setIsApproveDialogOpen(true);
  };

  const handleRejectUser = (user: User) => {
    setSelectedUser(user);
    setIsRejectDialogOpen(true);
  };

  const handleSaveUserChanges = async () => {
    if (!selectedUser) return;

    // Simulação de atualização de papel
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, role: newRole, status: newStatus };
      }
      return user;
    });

    // Em um cenário real, você chamaria updateUserRole aqui
    // const { error } = await updateUserRole(selectedUser.id, newRole);

    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    toast({
      title: "Usuário atualizado",
      description: `As permissões de ${selectedUser.full_name} foram atualizadas com sucesso.`,
    });
  };

  const handleApproveConfirm = async () => {
    if (!selectedUser) return;

    setProcessingAction(true);

    try {
      // Em um ambiente real, você atualizaria o status no banco de dados
      // const { error } = await supabase
      //   .from("profiles")
      //   .update({ status: "active", updated_at: new Date().toISOString() })
      //   .eq("id", selectedUser.id);
      //
      // if (error) throw error;

      // Simulação de aprovação
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser.id) {
          return { ...user, status: "active" };
        }
        return user;
      });

      setUsers(updatedUsers);
      setFilteredUsers(
        updatedUsers.filter((user) => {
          // Aplicar os mesmos filtros atuais
          const matchesSearch =
            !searchTerm ||
            user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesRole = roleFilter === "all" || user.role === roleFilter;
          const matchesStatus =
            statusFilter === "all" || user.status === statusFilter;

          return matchesSearch && matchesRole && matchesStatus;
        }),
      );

      setIsApproveDialogOpen(false);
      toast({
        title: "Usuário aprovado",
        description: `${selectedUser.full_name} foi aprovado com sucesso e agora está ativo no sistema.`,
      });
    } catch (err: any) {
      toast({
        title: "Erro ao aprovar usuário",
        description: err.message || "Ocorreu um erro ao aprovar o usuário.",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  const handleRejectConfirm = async () => {
    if (!selectedUser) return;

    setProcessingAction(true);

    try {
      // Em um ambiente real, você atualizaria o status no banco de dados
      // const { error } = await supabase
      //   .from("profiles")
      //   .update({ status: "inactive", updated_at: new Date().toISOString() })
      //   .eq("id", selectedUser.id);
      //
      // if (error) throw error;

      // Simulação de rejeição
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser.id) {
          return { ...user, status: "inactive" };
        }
        return user;
      });

      setUsers(updatedUsers);
      setFilteredUsers(
        updatedUsers.filter((user) => {
          // Aplicar os mesmos filtros atuais
          const matchesSearch =
            !searchTerm ||
            user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesRole = roleFilter === "all" || user.role === roleFilter;
          const matchesStatus =
            statusFilter === "all" || user.status === statusFilter;

          return matchesSearch && matchesRole && matchesStatus;
        }),
      );

      setIsRejectDialogOpen(false);
      toast({
        title: "Usuário rejeitado",
        description: `${selectedUser.full_name} foi rejeitado e marcado como inativo no sistema.`,
      });
    } catch (err: any) {
      toast({
        title: "Erro ao rejeitar usuário",
        description: err.message || "Ocorreu um erro ao rejeitar o usuário.",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedUser) return;

    // Simulação de exclusão
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Usuário excluído",
      description: `${selectedUser.full_name} foi removido do sistema.`,
    });
  };

  const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChangeForNewUser = (role: string) => {
    setNewUser((prev) => ({
      ...prev,
      role: role as UserRole,
    }));
  };

  const handleAddUser = async () => {
    // Validação básica
    if (!newUser.fullName || !newUser.email || !newUser.cpf) {
      toast({
        title: "Erro ao criar usuário",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      toast({
        title: "Erro ao criar usuário",
        description: "Formato de e-mail inválido.",
        variant: "destructive",
      });
      return;
    }

    // Validar CPF (apenas números)
    const cpfRegex = /^\d+$/;
    if (!cpfRegex.test(newUser.cpf)) {
      toast({
        title: "Erro ao criar usuário",
        description: "O CPF deve conter apenas números, sem pontos ou traços.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingUser(true);

    try {
      // Criar usuário no Supabase Auth
      const { data, error } = await signUp(
        newUser.email,
        newUser.cpf, // Usando CPF como senha
        {
          full_name: newUser.fullName,
          role: newUser.role,
          cpf: newUser.cpf,
        },
      );

      if (error) {
        throw error;
      }

      // Adicionar usuário à lista local
      const newUserData: User = {
        id: data?.user?.id || `temp-${Date.now()}`,
        full_name: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        created_at: new Date().toISOString(),
        last_sign_in_at: null,
        status: "pending",
      };

      // Armazenar o nome do usuário antes de limpar o formulário
      const userName = newUser.fullName;

      // Atualizar a lista de usuários e a lista filtrada
      setUsers((prev) => [newUserData, ...prev]);
      setFilteredUsers((prev) => [newUserData, ...prev]);

      // Fechar o modal e limpar o formulário
      setIsAddUserDialogOpen(false);
      setNewUser({
        fullName: "",
        email: "",
        cpf: "",
        role: "profissional" as UserRole,
      });

      // Atualizar a lista de usuários após um pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        fetchUsers();
      }, 500);

      toast({
        title: "Usuário criado com sucesso",
        description: `${userName} foi adicionado ao sistema. Um e-mail de confirmação foi enviado.`,
      });
    } catch (err: any) {
      toast({
        title: "Erro ao criar usuário",
        description: err.message || "Ocorreu um erro ao criar o usuário.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Nunca";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatLastAccess = (dateString: string | null) => {
    if (!dateString) return "Nunca";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Hoje";
    } else if (diffDays === 1) {
      return "Ontem";
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`;
    } else {
      return date.toLocaleDateString("pt-BR");
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Administrador
          </Badge>
        );
      case "gestor":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Gestor
          </Badge>
        );
      case "profissional":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Profissional
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Usuário
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" /> Ativo
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="mr-1 h-3 w-3" /> Inativo
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Pendente
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gerenciamento de Usuários</CardTitle>
            <CardDescription>
              Gerencie os usuários e suas permissões no sistema
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Adicionar Usuário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os papéis</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="gestor">Gestor</SelectItem>
                  <SelectItem value="profissional">Profissional</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                Carregando usuários...
              </span>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.full_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          {formatLastAccess(user.last_sign_in_at)}
                        </TableCell>
                        <TableCell>{formatDate(user.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditUser(user)}
                              >
                                <UserCog className="mr-2 h-4 w-4" />
                                Alterar Permissões
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "pending" && (
                                <>
                                  <DropdownMenuItem
                                    className="text-green-600"
                                    onClick={() => handleApproveUser(user)}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Aprovar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleRejectUser(user)}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Rejeitar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                </>
                              )}
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteUser(user)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Nenhum usuário encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>

      {/* Dialog para editar usuário */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Altere as permissões e o status do usuário.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">Informações do Usuário</h4>
                <p className="text-sm">
                  <span className="font-medium">Nome:</span>{" "}
                  {selectedUser.full_name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {selectedUser.email}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Função</h4>
                <Select
                  value={newRole}
                  onValueChange={(value) => setNewRole(value as UserRole)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                    <SelectItem value="profissional">Profissional</SelectItem>
                    <SelectItem value="user">Usuário</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Status</h4>
                <Select
                  value={newStatus}
                  onValueChange={(value) =>
                    setNewStatus(value as "active" | "inactive" | "pending")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveUserChanges} disabled={roleLoading}>
              {roleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog para confirmar exclusão */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              usuário {selectedUser?.full_name} e removerá seus dados do
              sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog para confirmar aprovação */}
      <AlertDialog
        open={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aprovar Usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a aprovar {selectedUser?.full_name}. Isso
              permitirá que o usuário acesse o sistema com as permissões
              atribuídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processingAction}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApproveConfirm}
              className="bg-green-600 hover:bg-green-700"
              disabled={processingAction}
            >
              {processingAction ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processando...
                </>
              ) : (
                "Aprovar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog para confirmar rejeição */}
      <AlertDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejeitar Usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a rejeitar {selectedUser?.full_name}. O usuário
              será marcado como inativo e não poderá acessar o sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processingAction}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={processingAction}
            >
              {processingAction ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processando...
                </>
              ) : (
                "Rejeitar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog para adicionar novo usuário */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo usuário no sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                name="fullName"
                value={newUser.fullName}
                onChange={handleAddUserChange}
                placeholder="Nome completo do usuário"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleAddUserChange}
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF (apenas números)</Label>
              <Input
                id="cpf"
                name="cpf"
                value={newUser.cpf}
                onChange={handleAddUserChange}
                placeholder="00000000000"
                maxLength={11}
              />
              <p className="text-xs text-muted-foreground">
                O CPF será usado como senha inicial para acesso ao sistema.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              <Select
                value={newUser.role}
                onValueChange={handleRoleChangeForNewUser}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="gestor">Gestor</SelectItem>
                  <SelectItem value="profissional">Profissional</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddUserDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleAddUser} disabled={isCreatingUser}>
              {isCreatingUser ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando...
                </>
              ) : (
                "Criar Usuário"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserRoleManagement;
