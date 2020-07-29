import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from './components/ApplicationViews';
import { UserProfileProvider } from './providers/UserProfileProvider';
import { ProjectProvider } from './providers/ProjectProvider';
import { RoomProvider } from './providers/RoomProvider';
import NewProjectForm from './components/NewProjectForm';


function App() {
  return (
    <div className="App">
   <Router>
      <UserProfileProvider>
        <ProjectProvider>
          <RoomProvider>
          <ApplicationViews />
          <NewProjectForm />
          </RoomProvider>
          </ProjectProvider>
      </UserProfileProvider>
    </Router>
    </div>
  );
}

export default App;
