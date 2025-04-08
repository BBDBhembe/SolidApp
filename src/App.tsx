import { Router, Route } from '@solidjs/router';
import Project from './pages/Projects';
import Skills from './pages/Skills';

function App() {

  return (<>
    <nav class="nav">
      <a href='/projects' class="nav-link">Projects</a>
      <a href='/skills' class="nav-link">Skills</a>
    </nav>
    <Router>
      <Route path="/projects" component={Project} />
      <Route path="/skills" component={Skills} />
      <h1>welcome</h1>
    </Router></>
  )
}

export default App;