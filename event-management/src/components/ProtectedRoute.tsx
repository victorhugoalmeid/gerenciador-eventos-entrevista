// src/components/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import type { UserRole } from "@/services/authService";
import { CircularProgress, Box } from "@mui/material";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, role, loading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // se tem roles permitidas e role atual não está entre elas, redireciona
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      router.push("/events"); // fallback neutro
    }
  }, [isAuthenticated, role, allowedRoles, router, loading]);

  // Se não autenticado > loading simples
  if (loading || !isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
//Centralizei a lógica de autorização em um componente ProtectedRoute, que verifica autenticação e papel do usuário via Redux
//e decide se mantém a página, redireciona ou mostra um loading.
//Isso vai evitar duplicar lógica de proteção em cada página.