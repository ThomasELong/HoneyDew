import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from './components/ApplicationViews';
import { UserProfileProvider } from './providers/UserProfileProvider';


function App() {
  return (
    <div className="App">
   <Router>
      <UserProfileProvider>
          <ApplicationViews />
      </UserProfileProvider>
    </Router>
    </div>
  );
}

export default App;
