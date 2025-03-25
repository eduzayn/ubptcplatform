import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoginModalOpen(true);
        return;
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    if (!isAuthenticated) {
      window.location.href = '/';
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AdminLoginModal 
          isOpen={isLoginModalOpen}
          onClose={handleCloseModal}
        />
        <Navigate to="/" state={{ from: location }} replace />
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
