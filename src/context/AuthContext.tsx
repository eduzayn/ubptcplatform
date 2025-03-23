import React from "react";
import { AuthProvider, useAuth } from "@/lib/hooks/useAuth";

export { AuthProvider, useAuth };

type AuthWrapperProps = {
  children: React.ReactNode;
};

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
