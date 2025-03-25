import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  // Verifica token ANTES de qualquer renderização
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.log('Sem token - redirecionando para home');
      navigate('/', { replace: true });
      return;
    }
  }, [navigate]);

  // Dupla verificação para garantir
  const token = localStorage.getItem('adminToken');
  if (!token) {
    console.log('Sem token - não renderiza nada');
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 px-6 py-8">
        <div className="mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
