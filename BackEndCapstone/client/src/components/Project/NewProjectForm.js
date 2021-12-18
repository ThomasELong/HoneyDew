import React, { useContext, useRef } from "react";
import styles from "../Styles";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { ProjectContext } from "../../providers/ProjectProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { TaskCategoryContext } from "../../providers/TaskCategoryProvider";

const NewProjectForm = () => {
  const history = useNavigate();
  const { addProject } = useContext(ProjectContext);

  const name = useRef();
  const details = useRef();

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const submitNewProjectForm = () => {

    if (!name) {
      window.alert("Please add a name for your project");
    } else if (!details) {
      window.alert("Please add some details for your project");
    } else {
      const NewProject = {
        name: name.current.value,
        projectNote: details.current.value,
        userProfileId: userProfile.id,
        createdDate: new Date()
      };
      addProject(NewProject)
      history(`/`)

    }
  }

  return (
    <>
      <h2 className="container">Create Your Project</h2>
      <div className="newProjectContainer">
        <Form>
          <FormGroup>
            <Label for="title">Name</Label>
            <Input
              placeholder="What's your project's name?"
              id="new-project-name"
              type="text"
              innerRef={name}
            />
          </FormGroup>

          <FormGroup>
            <Label for="new-project-note">Details</Label>
            <Input
              placeholder="Add some project details here."
              id="projectNote"
              type="textarea"
              innerRef={details}
            />
          </FormGroup>

          <FormGroup>
            <div className="newProjectSaveBtn">
              <Button style={styles.saveButton}
                onClick={(e) => {
                  e.preventDefault();
                  submitNewProjectForm();
                }}>
                Save</Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </>
  );
}

export default NewProjectForm
