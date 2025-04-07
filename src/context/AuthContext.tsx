import { createContext, useContext, createSignal, JSX } from "solid-js";
import { getToken, login, logout } from "../utils/auth";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: { children: JSX.Element }) {
  const [token, setToken] = createSignal<string | null>(getToken());

  const handleLogin = (token: string) => {
    login(token);
    setToken(token);
  };

  const handleLogout = () => {
    logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token: token(), login: handleLogin, logout: handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
