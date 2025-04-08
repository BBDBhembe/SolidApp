import { user, setUser, setIsAuthenticated } from "../auth";

export default function Dashboard(props: { onLogout: () => void }) {
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    props.onLogout();
  };

  return (
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard, {user()?.name || 'User'}!</p>
      <p>You are now signed in and can access all protected features.</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}