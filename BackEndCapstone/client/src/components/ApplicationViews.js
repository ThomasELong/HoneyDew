import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import NewProjectForm from "./NewProjectForm";
import UserDashboard from "./UserProjectDashboard";
import ProjectDetails from "./ProjectDetails";
import TaskDetails from "./TaskDetails"


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
            {isLoggedIn ? <UserDashboard /> : <Redirect to="/login" />}
        </Route>

        <Route path="/newProjectForm" exact>
            {isLoggedIn ? <NewProjectForm /> : <Redirect to="/login" />}
        </Route>

        <Route path={`/project/:id`} exact>
            {isLoggedIn ? <ProjectDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path={`/project/taskDetails/:id`} exact>
            {isLoggedIn ? <TaskDetails /> : <Redirect to="/login" />}
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