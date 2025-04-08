import { createSignal } from "solid-js";

interface User {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  [key: string]: any;
}

export const [user, setUser] = createSignal<User | null>(null);
export const [isAuthenticated, setIsAuthenticated] = createSignal(false);
