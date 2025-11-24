import authReducer, {
  AuthState,
  logout,
  initializeFromStorage,
} from "@/features/auth/authSlice";

describe("authSlice", () => {
  const initial: AuthState = {
    isAuthenticated: false,
    token: null,
    email: null,
    role: null,
    loading: false,
    error: null,
  };

  it("deve iniciar corretamente", () => {
    const state = authReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initial);
  });

  it("deve realizar logout limpando estado", () => {
    const loggedState: AuthState = {
      isAuthenticated: true,
      token: "abc123",
      email: "teste@teste.com",
      role: "admin",
      loading: false,
      error: null,
    };

    const result = authReducer(loggedState, logout());
    expect(result).toEqual(initial);
  });

  it("deve inicializar estado a partir do localStorage", () => {
    const user = {
      email: "admin@events.com",
      role: "admin",
    };

    // mocks
    localStorage.setItem("token", "fake123");
    localStorage.setItem("user", JSON.stringify(user));

    const state = authReducer(initial, initializeFromStorage());

    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe("fake123");
    expect(state.email).toBe("admin@events.com");
    expect(state.role).toBe("admin");
  });
});
//vhaa Aqui eu testo o comportamento síncrono do slice — inicialização, logout e hidratação do estado.