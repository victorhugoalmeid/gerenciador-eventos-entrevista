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
    <AppBar
      position="static"
      elevation={0}
      square
      sx={{
        background: "linear-gradient(120deg, #0f172a, #1d4ed8)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          px: { xs: 2, sm: 3 },
          minHeight: 76,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: 700,
            letterSpacing: 0.2,
          }}
          onClick={handleGoHome}
        >
          Gestão de Eventos
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                px: 2.5,
                py: 1,
                bgcolor: "rgba(255,255,255,0.08)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
              }}
            >
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
