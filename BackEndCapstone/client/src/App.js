import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from './components/ApplicationViews';
import { UserProfileProvider } from './providers/UserProfileProvider';
import { ProjectProvider } from './providers/ProjectProvider';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
   <Router>
      <UserProfileProvider>
        <ProjectProvider>
          <Header />
          <ApplicationViews />
        </ProjectProvider>
      </UserProfileProvider>
    </Router>
    </div>
  );
}

export default App;
