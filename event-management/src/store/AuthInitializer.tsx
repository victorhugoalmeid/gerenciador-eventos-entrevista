// src/store/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { initializeFromStorage } from "@/features/auth/authSlice";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeFromStorage());
  }, [dispatch]);

  return <>{children}</>;
}