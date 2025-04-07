import { useAuth } from "../context/AuthContext";
import { useNavigate } from "@solidjs/router";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Logout</h1>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
