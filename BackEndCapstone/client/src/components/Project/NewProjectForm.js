import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, ButtonToggle, FormGroup, Modal, ModalHeader, ModalBody, Input, Label, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { ProjectContext } from "../../providers/ProjectProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { TaskCategoryContext } from "../../providers/TaskCategoryProvider";

const NewProjectForm = () => {
  const history = useHistory();
  const { addProject } = useContext(ProjectContext);

  const name = useRef();
  const details = useRef();
 


  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));


  const submitNewProjectForm = () => {

    if (!details) {
      window.alert("Please add some details for your project");
    } else if (!name) {
      window.alert("Please add the name of your project");
    } else {
      const NewProject = {
        name: name.current.value,
        projectNote: details.current.value,
        userProfileId: userProfile.id,
        createdDate: new Date()
      };
      addProject(NewProject)
        history.push(`/`)

    }
  }

  return (
    <>
      <h2 className="container">Create Your Project</h2>
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
          <Button outline color="primary"
            onClick={(e) => {
              e.preventDefault();
              submitNewProjectForm();
            }}>
            Save</Button>
        </FormGroup>
      </Form>
    </>
  );
}

export default NewProjectForm
