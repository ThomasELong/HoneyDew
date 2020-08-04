import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TaskCategoryContext = React.createContext();

export const TaskCategoryProvider = (props) => {

  const apiUrl = "/api/taskcategory";
  const [taskCategories, setTaskCategories] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllTaskCategories = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setTaskCategories))
  }

  const getTaskCategoryById = (id) =>
    getToken().then((token) =>
      fetch(`/api/taskcategory/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));

    
  return (
    <TaskCategoryContext.Provider value={{ taskCategories, getAllTaskCategories, getTaskCategoryById }}>
      {props.children}
    </TaskCategoryContext.Provider>
  );
};