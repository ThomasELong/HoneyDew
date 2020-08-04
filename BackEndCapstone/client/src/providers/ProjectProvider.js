import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ProjectContext = React.createContext();

export const ProjectProvider = (props) => {
  const apiUrl = "/api/project";
  const [projects, setProjects] = useState([]);
  const [ addedProject, setProject ] = useState({})
  const { getToken } = useContext(UserProfileContext);

  const getAllProjects = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(resp => resp.json())
        .then(setProjects)
    )};

  const getProjectById = (id) => {
   return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
      );
    }; 

    const getProjectsByUser = () => {
      getToken().then((token) =>
        fetch(`${apiUrl}/getbyuser`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then(setProjects)
      );
    };

  const addProject = (project) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }).then((resp) => resp.json())
        .then((resp) => {
         return setProject(resp.id)
        })
      );


  const updateProject = (project) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${project.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })
    );

  const deleteProject = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getProjectsByUser)
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        addedProject,
        projects,
        getAllProjects,
        getProjectsByUser,
        getProjectById,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};