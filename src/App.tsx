import { Router, Route, useNavigate } from '@solidjs/router';
import Project from './pages/Projects';
import Skills from './pages/Skills';
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

  return (<>
    {/* <nav class="nav">
      <a href='/projects' class="nav-link">Projects</a>
      <a href='/skills' class="nav-link">Skills</a>
    </nav> */}
    <Router>
      <Route path="/*" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      {/* <Route path="/projects" component={Project} />
      <Route path="/skills" component={Skills} /> */}
      {/* <h1>welcome</h1> */}
   
      
    </Router></>
  )
}

export default App;