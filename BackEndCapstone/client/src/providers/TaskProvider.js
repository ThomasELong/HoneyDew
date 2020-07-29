import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {

  const apiUrl = "/api/task";
  const [tasks, setTasks] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getTask = (id) => {
    return getToken().then((token) =>
        fetch(apiUrl + `/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};


      const getTasksByProjectId = (id) =>
      getToken().then((token) =>
        fetch(apiUrl + `/getbyprojectid/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) =>setTasks(res))
      );

  const getAllTasks = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setTasks));

  const getTaskById = (id) =>
    getToken().then((token) =>
      fetch(`/api/task/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));


  const addTask = (task) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
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
        }).then(getTask(task.id))
      );

  
 




  return (
    <TaskContext.Provider value={{ tasks, getTaskById, addTask, getAllTasks, getTasksByProjectId, updateTask }}> 
      {props.children}
    </TaskContext.Provider>
  );
};