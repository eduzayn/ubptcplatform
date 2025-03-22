-- Criar tabela profiles se não existir
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_sign_in_at TIMESTAMP WITH TIME ZONE
);

-- Habilitar segurança em nível de linha
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Criar política para profiles
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON profiles;
CREATE POLICY "Usuários podem ver seu próprio perfil"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Criar política para administradores verem todos os perfis
DROP POLICY IF EXISTS "Administradores podem ver todos os perfis" ON profiles;
CREATE POLICY "Administradores podem ver todos os perfis"
    ON profiles FOR SELECT
    USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Criar política para administradores atualizarem todos os perfis
DROP POLICY IF EXISTS "Administradores podem atualizar todos os perfis" ON profiles;
CREATE POLICY "Administradores podem atualizar todos os perfis"
    ON profiles FOR UPDATE
    USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Criar tabela role_permissions
CREATE TABLE IF NOT EXISTS role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    permission TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(role, permission)
);

-- Habilitar segurança em nível de linha
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Criar política para role_permissions
DROP POLICY IF EXISTS "Qualquer pessoa pode ver permissões de papéis" ON role_permissions;
CREATE POLICY "Qualquer pessoa pode ver permissões de papéis"
    ON role_permissions FOR SELECT
    USING (true);

-- Criar política para administradores gerenciarem permissões de papéis
DROP POLICY IF EXISTS "Administradores podem gerenciar permissões de papéis" ON role_permissions;
CREATE POLICY "Administradores podem gerenciar permissões de papéis"
    ON role_permissions FOR ALL
    USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Adicionar publicação realtime
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE role_permissions;
