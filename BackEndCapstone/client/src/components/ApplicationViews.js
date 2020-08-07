import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Welcome from "./Welcome"
import Login from "./Login";
import Register from "./Register";
import UserDashboard from "./UserProjectDashboard";
import ProjectDetails from "./Project/ProjectDetails";
import TaskDetails from "./Task/TaskDetails"
import NewProjectForm from "./Project/NewProjectForm";
import TaskNoteDetails from "./TaskNote/TaskNoteDetails";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
            {isLoggedIn ? <UserDashboard /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/newProjectForm" exact>
            {isLoggedIn ? <NewProjectForm /> : <Redirect to="/welcome" />}
        </Route>

        <Route path={`/project/:id`} exact>
            {isLoggedIn ? <ProjectDetails /> : <Redirect to="/welcome" />}
        </Route>

        <Route path={`/taskDetails/:id`} exact>
            {isLoggedIn ? <TaskDetails /> : <Redirect to="/welcome" />}
        </Route>

        <Route path={`/taskNoteDetails/:id`} exact>
            {isLoggedIn ? <TaskNoteDetails /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/welcome">
          <Welcome />
        </Route>

        <Route path="/login">
          <Login />
        </Route>


        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};