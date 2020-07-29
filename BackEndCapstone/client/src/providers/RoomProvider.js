import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const RoomContext = React.createContext();

export const RoomProvider = (props) => {

  const apiUrl = "/api/room";
  const [rooms, setRooms] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getRoom = (id) => {
    return getToken().then((token) =>
        fetch(apiUrl + `/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};

      const getRoomsByProjectId = (id) =>
      getToken().then((token) =>
        fetch(apiUrl + `/getbyproject/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) =>setRooms(res))
      );

  const getAllRooms = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setRooms)
      );

  const getRoomById = (id) =>
    getToken().then((token) =>
      fetch(`/api/room/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));


  return (
    <RoomContext.Provider value={{ rooms, getRoom, getRoomById, getAllRooms, getRoomsByProjectId }}> 
      {props.children}
    </RoomContext.Provider>
  );
};