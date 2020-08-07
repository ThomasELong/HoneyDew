import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {

  const apiUrl = "/api/task";
  const [tasks, setTasks] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getTask = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const getTasksByProjectId = (id) => {
    return getToken().then((token) => {
      if (id === null || id === "") {
        setTasks([])
      } else {
      fetch(`${apiUrl}/getbyprojectid/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setTasks(res))
    }}
    )};

    const getTasksByCategoryId = (id) => {
      return getToken().then((token) =>
        fetch(`${apiUrl}/getbycategoryid/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((resp) => resp.json())
      );
    };

  const getAllTasks = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setTasks));

  const addTask = (task) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      }).then((resp) => {
        return resp.json();
      }));

  const updateTask = (task) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${task.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }).then((resp) => {
          return resp})
    );
  

  const deleteTask = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then(getTasksByProjectId));
    }

  return (
    <TaskContext.Provider value={{ tasks, getTask, addTask, getAllTasks, getTasksByProjectId, getTasksByCategoryId, updateTask, deleteTask }}>
      {props.children}
    </TaskContext.Provider>
  );
};
