import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from './components/ApplicationViews';
import { UserProfileProvider } from './providers/UserProfileProvider';
import { ProjectProvider } from './providers/ProjectProvider';
import Header from './components/Header';
import { TaskProvider } from './providers/TaskProvider';


function App() {
  return (
    <div className="App">
   <Router>
      <UserProfileProvider>
        <ProjectProvider>
          <TaskProvider>
          <Header />
          <ApplicationViews />
          </TaskProvider>
        </ProjectProvider>
      </UserProfileProvider>
    </Router>
    </div>
  );
}

export default App;

