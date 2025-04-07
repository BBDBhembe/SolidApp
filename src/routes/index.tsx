import { Route, Router, Navigate } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";
import Login from "../components/LoginForm";
import Logout from "../components/LogoutForm";

export default function AppRoutes() {
  const { token } = useAuth();

  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route
        path="/logout"
        component={token ? Logout : () => <Navigate href="/login" />}
      />
    </Router>
  );
}
