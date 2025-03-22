-- Criar tabela de perfis se não existir
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  cpf TEXT UNIQUE,
  role TEXT NOT NULL DEFAULT 'user',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar realtime para a tabela profiles
alter publication supabase_realtime add table profiles;

-- Criar políticas de acesso para a tabela profiles
DROP POLICY IF EXISTS "Admins can read all profiles";
CREATE POLICY "Admins can read all profiles"
ON profiles FOR SELECT
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

DROP POLICY IF EXISTS "Users can read their own profile";
CREATE POLICY "Users can read their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Inserir um administrador de exemplo (apenas para ambiente de desenvolvimento)
INSERT INTO profiles (id, email, full_name, cpf, role, status)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'admin@ubptc.org', 'Administrador UBPTC', '12345678900', 'admin', 'active')
ON CONFLICT (email) DO NOTHING;