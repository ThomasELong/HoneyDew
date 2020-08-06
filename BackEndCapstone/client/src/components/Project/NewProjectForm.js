import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, ButtonToggle, FormGroup, Modal, ModalHeader, ModalBody, Input, Label, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { ProjectContext } from "../../providers/ProjectProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { TaskCategoryContext } from "../../providers/TaskCategoryProvider";

const NewProjectForm = () => {
  const history = useHistory();
  const { addProject, getProjectById, addedProject, setProject } = useContext(ProjectContext);
  const { tasks, addTask, getTasksByProjectId } = useContext(TaskContext);
  const { taskCategories, getAllTaskCategories } = useContext(TaskCategoryContext);

  const [name, setName] = useState();
  const [projectNote, setprojectNote] = useState();
  // const [taskCategoryDropdown, setTaskCategoryDropdown] = useState(false);
  // const [addTaskModal, setAddTaskModal] = useState(false);
  // const [addTaskButton, setAddTaskButton] = useState(false);
  // const [taskCategory, setTaskCategory] = useState({});
  // const [taskPriority, setTaskPriority] = useState();
  // const [taskTitle, setTaskTitle] = useState();

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getAllTaskCategories()
    console.log(addedProject)
    console.log(tasks)
  }, []);

  // const toggleTaskCategoryDropdown = () => {
  //   setTaskCategoryDropdown(!taskCategoryDropdown);
  // };

  // const toggleAddTask = () => {
  //   setAddTaskModal(!addTaskModal);
  // };

  // const toggleAddTaskButton = () => {
  //   setAddTaskButton(!addTaskButton);
  // }

  // const clearAddedProject = () => {
  //   setProject({});
  // }

  const submitNewProjectForm = () => {

    if (!projectNote) {
      window.alert("Please add some details for your project");
    } else if (!name) {
      window.alert("Please add the name of your project");
    } else {
      const NewProject = {
        name: name,
        projectNote: projectNote,
        userProfileId: userProfile.id,
        createdDate: new Date()
      };
      addProject(NewProject)
        .catch((err) => alert(`An error ocurred: ${err.message}`))
        .then(() => (getTasksByProjectId(addedProject)))             
        .then(history.push(`/`))

    }
  }

  return (
    <>
      <h2>Create Your Project</h2>
      <Form>
        <FormGroup>
          <Label for="title">Name</Label>
          <Input
            placeholder="What's your project's name?"
            id="new-project-name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="new-project-note">Details</Label>
          <Input
            placeholder="Add some project details here."
            id="projectNote"
            type="textarea"
            onChange={(e) => setprojectNote(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Button
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
