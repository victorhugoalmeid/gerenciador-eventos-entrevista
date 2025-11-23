// src/services/authService.ts
import { api } from "./api";

export type UserRole = "admin" | "reader";

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Gera um JWT fake só pra cumprir o requisito
function generateFakeToken(user: User): string {
  const payload = {
    email: user.email,
    role: user.role,
    ts: Date.now(),
  };

  return btoa(JSON.stringify(payload));
}

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.get<User[]>("/users", {
    params: { email, password },
  });

  const user = response.data[0];

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const token = generateFakeToken(user);

  return { token, user };
}