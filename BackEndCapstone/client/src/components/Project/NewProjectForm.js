import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, ButtonToggle, FormGroup, Modal, ModalHeader, ModalBody, Input, Label, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { ProjectContext } from "../../providers/ProjectProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { TaskCategoryContext } from "../../providers/TaskCategoryProvider";

const NewProjectForm = () => {
  const history = useHistory();
  const { addProject, getProjectById, addedProject } = useContext(ProjectContext);
  const { tasks, addTask, getTasksByProjectId } = useContext(TaskContext);
  const { taskCategories, getAllTaskCategories } = useContext(TaskCategoryContext);

  const [name, setName] = useState();
  const [projectNote, setprojectNote] = useState();
  const [taskCategoryDropdown, setTaskCategoryDropdown] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [addTaskButton, setAddTaskButton] = useState(false);
  const [taskCategory, setTaskCategory] = useState({});
  const [taskPriority, setTaskPriority] = useState();
  const [taskTitle, setTaskTitle] = useState();

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  useEffect(() => {
    getAllTaskCategories()
    console.log(addedProject)
    console.log(tasks)
  }, []);

  const toggleTaskCategoryDropdown = () => {
    setTaskCategoryDropdown(!taskCategoryDropdown);
  };

  const toggleAddTask = () => {
    setAddTaskModal(!addTaskModal);
  };

  const toggleAddTaskButton = () => {
    setAddTaskButton(!addTaskButton);
  }

  const submitNewProjectForm = () => {

    if (!projectNote) {
      window.alert("Please add some details for your project");
    } else if (!name) {
      window.alert("Please add the name of your project");
    } else {
      const NewProject = {
        name: name,
        projectNote: projectNote,
        createdDate: new Date(),
        userProfileId: userProfile.id
      };
      
      addProject(NewProject)
        .catch((err) => alert(`An error ocurred: ${err.message}`));             
        
    }
  }
  const submitNewTaskForm = () => {
    if (!taskTitle) {
      window.alert("Please add the name of this task");
    } else if (!taskPriority) {
      window.alert("Please add a priority level to this task. If unsure, add mid level priority")
    } else {
      const NewTask = {
        taskTitle: taskTitle,
        taskPriority: taskPriority,
        taskComplete: 0,
        taskCategoryId: taskCategory,
        projectId: addedProject,
        createdDate: new Date(),
      };
      
      addTask(NewTask)
      .then(() => getTasksByProjectId(addedProject));
      toggleAddTask()
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
        <div>
          {addTaskButton &&
            <>
              <div>
                { (tasks.length > 0) && 
                tasks.map((task) => (
                  <div>
                    <Button tag={Link} to={`taskDetails/${task.id}`} key={task.id} color="info" size="md">{task.taskTitle}</Button>
                  </div>
                ))}
              </div>

              <div >

                <Button toggle={toggleAddTaskButton} onClick={toggleAddTask}>Add A New Task</Button>
              </div>
            </>
          }
        </div>

        <Modal isOpen={addTaskModal} toggle={toggleAddTask}>
          <ModalBody>
            <div className="form-group">
              <input
                placeholder="What is your task's title?"
                type="text-area"
                id="taskTitle"
                required
                autoFocus
                className="form-control mt-4"
                onChange={(e) => setTaskTitle(e.target.value)}


              />
              <ButtonDropdown isOpen={taskCategoryDropdown} toggle={toggleTaskCategoryDropdown}>
                <DropdownToggle caret>Category</DropdownToggle>
                <DropdownMenu>
                  {taskCategories.map(cat =>
                    <DropdownItem value={cat.id} onClick={() => setTaskCategory(cat.id)}>{cat.type}</DropdownItem>)}
                </DropdownMenu>
              </ButtonDropdown>

              <div>
                <FormGroup tag="fieldset">
                  <legend>Task Priority</legend>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        id="taskPriority"
                        name="taskPriority"
                        value="1"
                        key="1"
                        onChange={e =>
                          setTaskPriority(e.target.value)} />
            CRITICAL
          </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        id="taskPriority"
                        name="taskPriority"
                        value="2"
                        key="2"

                        onChange={e => setTaskPriority(e.target.value)} />
            High
          </Label>
                  </FormGroup>
                  <FormGroup check disabled>
                    <Label check>
                      <Input
                        type="radio"
                        id="taskPriority"
                        name="taskPriority"
                        value="3"
                        key="3"

                        onChange={e => setTaskPriority(e.target.value)} />
            Medium
          </Label>
                  </FormGroup>
                  <FormGroup check disabled>
                    <Label check>
                      <Input
                        type="radio"
                        id="taskPriority"
                        name="taskPriority"
                        value="4"
                        key="4"

                        onChange={e => setTaskPriority(e.target.value)} />
            Low
          </Label>
                  </FormGroup>
                  <FormGroup check disabled>
                    <Label check>
                      <Input
                        type="radio"
                        id="taskPriority"
                        name="taskPriority"
                        value="5"
                        key="5"

                        onChange={e => setTaskPriority(e.target.value)} />
            Minimal
          </Label>
                  </FormGroup>
                </FormGroup>
              </div>

              <div className="">
                <Button
                  type="submit"
                  size="sm"
                  color="info"
                  onClick={(e) => {
                    e.preventDefault();
                    submitNewTaskForm();

                  }}
                  className="btn mt-4"
                >
                  Save
                            </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <FormGroup>
          <Button
            onClick={(e) => {
              e.preventDefault();
              submitNewProjectForm();
              
              toggleAddTaskButton();

            }}>
            Save</Button>
        </FormGroup>
        <FormGroup>
          <Button
            onClick={(e) => {
              e.preventDefault();
             (history.push(`/project/${addedProject}`))

            }}>
            Submit</Button>
        </FormGroup>
      </Form>
    </>
  );
}

export default NewProjectForm
