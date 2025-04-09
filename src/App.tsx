import { Router, Route, useNavigate } from '@solidjs/router';
import { isAuthenticated } from "./auth";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';

export function ProtectedRoute(props: { component: any }) {
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate("/", { replace: true });
    return null;
  }

  const Component = props.component;
  return <Component />;
}

function App() {

  return (
    <>
      <Router>
        <Route path="/*" component={Login} />
        <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      </Router>
    </>
  )
}

export default App;