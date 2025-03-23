import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, cpf } = req.body;

    // Aqui você deve implementar a validação com seu banco de dados
    // Este é apenas um exemplo
    const isValidAdmin = await validateAdminCredentials(email, cpf);

    if (!isValidAdmin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ 
      token,
      user: {
        name: "Administrador", // Você pode pegar isso do banco de dados
        email,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function validateAdminCredentials(email: string, cpf: string) {
  // Implemente a validação com seu banco de dados
  // Por enquanto, vamos retornar true para teste
  return true;
}
