import { Router, Route, useNavigate } from '@solidjs/router';
import Login from "./components/Login";
import { isAuthenticated } from "./auth";
import { onMount } from "solid-js";
import Dashboard from './components/Dashboard';


// Protection wrapper for routes
function ProtectedRoute(props: { children: any }) {
  const navigate = useNavigate();

  onMount(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  });

  return isAuthenticated() ? props.children : null;
}

function App() {

  return (
    <>
      <Router>
        <Route path="/*" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </>
  )
}

export default App;