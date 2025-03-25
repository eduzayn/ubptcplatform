import jwt from 'jsonwebtoken';

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || 'seu-segredo-fallback';

interface AdminUser {
  email: string;
  name: string;
  avatarUrl: string;
}

interface LoginResponse {
  token: string;
  user: AdminUser;
}

export async function loginAdmin(email: string, cpf: string): Promise<LoginResponse> {
  try {
    // Simula uma chamada de API
    const isValid = await validateAdminCredentials(email, cpf);

    if (!isValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        email,
        name: 'Administrador',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      },
    };
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
}

export function validateAdminToken(token: string): boolean {
  try {
    if (!token) return false;
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

async function validateAdminCredentials(email: string, cpf: string): Promise<boolean> {
  // Aqui você implementaria a validação real com seu backend
  // Por enquanto, vamos usar uma validação simples
  const isValidEmail = email.endsWith('@admin.com');
  const isValidCPF = cpf.length === 11;
  
  return isValidEmail && isValidCPF;
}
