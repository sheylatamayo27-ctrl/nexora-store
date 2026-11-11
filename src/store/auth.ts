"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authService from "@/services/auth";
import type { AuthProvider, User } from "@/services/auth";

export type { User } from "@/services/auth";

/**
 * Sesión del usuario. Las acciones solo llaman a `src/services/auth.ts` y guardan
 * lo que devuelve: para conectar un backend real se cambia el servicio, no esto.
 * Los errores del servicio (`AuthError`, fallos de red) se propagan tal cual
 * para que cada formulario decida qué mostrar.
 *
 * Quien pinte algo según la sesión debe esperar a la hidratación (`useHydrated`):
 * el HTML del servidor no conoce el localStorage.
 */
interface AuthState {
  user: User | null;
  /**
   * Token de la sesión. Hoy es un mock, pero se guarda (y se persiste) para que,
   * con un backend real, las llamadas a la API puedan enviarlo en sus headers
   * (`Authorization: Bearer <token>`) leyéndolo con `useAuth.getState().token`.
   */
  token: string | null;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  loginWithProvider: (provider: AuthProvider) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: () => get().user !== null,
      login: async (email, password) => {
        const { user, token } = await authService.loginWithCredentials(email, password);
        set({ user, token: token ?? null });
      },
      register: async (data) => {
        const { user, token } = await authService.registerUser(data);
        set({ user, token: token ?? null });
      },
      loginWithProvider: async (provider) => {
        const { user, token } = await authService.loginWithProvider(provider);
        set({ user, token: token ?? null });
      },
      logout: async () => {
        await authService.logoutUser();
        set({ user: null, token: null });
      },
      updateProfile: (data) => set((state) => (state.user ? { user: { ...state.user, ...data } } : {})),
    }),
    {
      name: "nexora-auth",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}
