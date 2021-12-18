import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
      <Routes>
        <Route path="/" exact element={isLoggedIn ? <UserDashboard /> : <Welcome />} />

        <Route path="/newProjectForm" exact element={isLoggedIn ? <NewProjectForm /> : <Welcome />} />

        <Route path={`/project/:id`} exact element={isLoggedIn ? <ProjectDetails /> : <Welcome />} />

        <Route path={`/taskDetails/:id`} exact element={isLoggedIn ? <TaskDetails /> : <Welcome />} />

        <Route path={`/taskNoteDetails/:id`} exact element={isLoggedIn ? <TaskNoteDetails /> : <Welcome />} />

        <Route path="/welcome" element={<Welcome />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Routes>
    </main>
  );
};