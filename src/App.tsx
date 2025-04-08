import { Router, Route } from '@solidjs/router';
import Project from './pages/Projects';
import Skills from './pages/Skills';

function App() {

  return (
    <Router>
      <nav class="nav">
        <a href='/projects' class="nav-link">Projects</a>
        <a href='/skills' class="nav-link">Skills</a>
      </nav>
      <Route path="/projects" component={Project} />
      <Route path="/skills" component={Skills} />
    </Router>
  )
}

export default App;