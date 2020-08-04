import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from './components/ApplicationViews';
import { UserProfileProvider } from './providers/UserProfileProvider';
import { ProjectProvider } from './providers/ProjectProvider';
import Header from './components/Header';
import { TaskProvider } from './providers/TaskProvider';
import { TaskCategoryProvider } from './providers/TaskCategoryProvider';
import { TaskNoteProvider } from './providers/TaskNoteProvider';


function App() {
  return (
    <div className="App">
      <Router>
        <UserProfileProvider>
          <ProjectProvider>
            <TaskProvider>
              <TaskCategoryProvider>
                <TaskNoteProvider>
                  <Header />
                  <ApplicationViews />
                </TaskNoteProvider>
              </TaskCategoryProvider>
            </TaskProvider>
          </ProjectProvider>
        </UserProfileProvider>
      </Router>
    </div>
  );
}

export default App;

