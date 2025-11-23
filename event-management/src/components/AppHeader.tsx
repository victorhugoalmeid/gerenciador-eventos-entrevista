// src/components/AppHeader.tsx
"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleGoHome = () => {
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/events");
    }
  };

  if (pathname === "/login") {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={handleGoHome}
        >
          Gestão de Eventos
        </Typography>

        {isAuthenticated && (
          <Box>
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
//Criei um header simples com botão de logout integrado ao Redux. 
//O header não aparece na tela de login e redireciona conforme o papel do usuário.
//app/layout.tsx