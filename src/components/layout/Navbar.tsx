import { useState } from 'react';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLoginModal } from '@/components/admin/AdminLoginModal';
import { MainNav } from '@/components/MainNav';

export function Navbar() {
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminClick = () => {
    setShowAdminModal(true);
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAdminClick}
            className="h-9 w-9"
          >
            <Shield className="h-5 w-5" />
          </Button>
        </div>
        <AdminLoginModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
        />
      </div>
    </div>
  );
}
