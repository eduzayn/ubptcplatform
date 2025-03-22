import { createClient } from "@supabase/supabase-js";

// Inicializa o cliente Supabase com as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Verifica se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Variáveis de ambiente do Supabase não encontradas. A funcionalidade de banco de dados pode não funcionar corretamente.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funções auxiliares para autenticação
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (
  email: string,
  password: string,
  userData: any,
) => {
  try {
    // Verificar se o usuário já existe
    const { data: existingUsers, error: checkError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .limit(1);

    if (checkError) {
      console.error("Erro ao verificar usuário existente:", checkError);
    } else if (existingUsers && existingUsers.length > 0) {
      return {
        data: null,
        error: { message: "Este e-mail já está cadastrado no sistema." },
      };
    }

    // Simular criação de usuário para ambiente de teste
    // Em um ambiente real, descomente o código abaixo e remova a simulação
    /*
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    */

    // Simulação para ambiente de teste
    const mockUserId = `user-${Date.now()}`;
    const mockUser = {
      id: mockUserId,
      email: email,
      user_metadata: userData,
    };
    const data = { user: mockUser, session: null };
    const error = null;

    if (!error && data.user) {
      // Criar perfil do usuário na tabela profiles
      // Em um ambiente real, use o código abaixo
      /*
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          full_name: userData.full_name,
          email: email,
          role: userData.role || "user",
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          cpf: userData.cpf,
        },
      ]);
      */

      // Simulação para ambiente de teste
      const profileError = null;

      if (profileError) {
        console.error("Erro ao criar perfil:", profileError);
        return { data, error: profileError };
      }
    }

    return { data, error };
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    return { data: null, error: err };
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};
