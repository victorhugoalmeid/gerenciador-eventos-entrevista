// src/store/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { AuthInitializer } from "./AuthInitializer";

type ReduxProviderProps = {
  children: React.ReactNode;
};

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
