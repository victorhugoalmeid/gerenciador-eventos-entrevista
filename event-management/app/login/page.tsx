// app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { login } from "@/features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("admin@events.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      const nextRole = resultAction.payload.user.role;

      if (nextRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.05fr,0.95fr] items-center">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-brand">
            <div className="absolute inset-0 bg-grid-slate bg-[length:28px_28px] opacity-30" />
            <div className="relative space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-100 ring-1 ring-indigo-400/40">
                Gestão de Eventos
              </span>
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                Crie, organize e acompanhe eventos com segurança.
              </h1>
              <p className="text-slate-200/90 leading-relaxed">
                Controle total com painel administrativo, fluxo de aprovação e visualização de eventos futuros e passados. Autenticação por perfis para garantir acessos corretos.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100">
                  <p className="font-semibold text-white">Admin</p>
                  <p className="text-slate-200/90">Crie, edite e remova eventos, com visão completa do calendário.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100">
                  <p className="font-semibold text-white">Leitor</p>
                  <p className="text-slate-200/90">Explore eventos em destaque, filtre por categoria e acompanhe datas.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/60 bg-white/95 p-8 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="mb-6">
              <p className="text-sm font-medium text-indigo-600">Acesso seguro</p>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "#0f172a" }}>
                Gestão de Eventos – Login
              </Typography>
              <p className="mt-2 text-sm text-slate-600">
                Use suas credenciais ou as contas de demonstração abaixo.
              </p>
              <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-700">
                <p><span className="font-semibold">Admin:</span> admin@events.com / admin123</p>
                <p><span className="font-semibold">Leitor:</span> reader@events.com / reader123</p>
              </div>
            </div>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} className="space-y-4">
              <TextField
                label="E-mail"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                label="Senha"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 1,
                  py: 1.4,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
