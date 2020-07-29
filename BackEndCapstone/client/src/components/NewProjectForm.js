import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ProjectContext } from "../providers/ProjectProvider";
import { RoomContext } from "../providers/RoomProvider";

export default function NewProjectForm() {
  const history = useHistory();
  const { addProject } = useContext(ProjectContext);
  const { rooms, getAllRooms } = useContext(RoomContext);

  const [name, setName] = useState();
  const [projectNote, setprojectNote] = useState();
  const [room, setRoom] = useState();

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

useEffect(() => {
    getAllRooms();
}, []);

  const submitNewProjectForm = (e) => {
    e.preventDefault();
    if (!projectNote) {
      window.alert("Please add some details for your project");
    } else if (!name) {
      window.alert("Please add the name of your project");
    } else if (!room) {
      window.alert("Please add a room to your project");
    } else {
      const NewProject = {
        name: name,
        projectNote: projectNote,
        roomId: parseInt(room),
        createdDate: new Date(),
        userProfileId: userProfile.id
      };
      addProject(NewProject)
        .then(history.push(`/project/`))
        .catch((err) => alert(`An error ocurred: ${err.message}`));
    }
  };

  return (
      <>
      <h2>Create Your Project</h2>
    <Form onSubmit={submitNewProjectForm}>
      <FormGroup>
        <Label for="title">Name</Label>
        <Input
          placeholder="Name"
          id="new-project-name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="new-project-note">Details</Label>
        <Input
          placeholder="projectNote"
          id="new-post-note"
          type="textarea"
          onChange={(e) => setprojectNote(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="select"
          name="select"
          id="new-post-room"
          onChange={(e) => setRoom(e.target.value)}
        >
          <option key="0" value="0">
            Add A Room
          </option>
          {rooms.map((r) => (
            <option value={r.id} key={r.id}>
              {r.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
    </>
  );
}