import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface AccountSettingsProps {
  onPhotoUpload?: (file: File) => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onPhotoUpload }) => {
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onPhotoUpload) {
      onPhotoUpload(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Foto de perfil" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo-upload">
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Camera className="mr-2 h-4 w-4" />
                  Alterar foto
                </span>
              </Button>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" placeholder="Seu nome completo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Biografia</Label>
          <Textarea
            id="bio"
            placeholder="Conte um pouco sobre você..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-end">
          <Button>Salvar alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
