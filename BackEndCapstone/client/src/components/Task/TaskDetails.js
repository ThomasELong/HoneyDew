import React, { useEffect, useContext, useState } from "react";
import { Button, CardBody, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, CardImg, Toast, ToastBody, ToastHeader, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { ProjectContext } from "../../providers/ProjectProvider";
import { TaskContext } from "../../providers/TaskProvider"
import { TaskNoteContext } from "../../providers/TaskNoteProvider";


const TaskDetails = () => {
  const { getProjectById } = useContext(ProjectContext);
  const { getTask, deleteTask, updateTask, addTask } = useContext(TaskContext)
  const { tasknotes, getTaskNotesByTaskId } = useContext(TaskNoteContext)
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { id } = useParams();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [project, setProject] = useState({});
  const [taskTitle, setTaskTitle] = useState();
  const [taskPriority, setTaskPriority] = useState()
  const [taskComplete, setTaskComplete] = useState();
  const [task, setTask] = useState({})
  const history = useHistory();
  
  useEffect(() => {
    getTaskNotesByTaskId()
    console.log(tasknotes)
  }, []);

  useEffect(() => {
      getTask(id)
      .then(setTask)
      }, []);
    
    const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const submitForm = () => {
    updateTask({
      id: task.id,
      taskTitle: taskTitle,
      taskPriority: taskPriority,
      taskComplete: taskComplete,
      taskCategoryId: task.taskCategoryId,
      projectId: task.projectId
    }).then(() => history.push(`/`));
  };

  return (
    <>
      <section className="m-4">
        <div>
          <h3>{task.taskTitle}</h3>
          <div>{task.taskPriority}</div>
         {/*  <div>
            {tasknotes.map((tasknote) => (
              <div>
                <Button tag={Link} key={tasknote.id} color="info" size="md">{tasknote.title}</Button>
              </div>
            ))}
          </div> */}
        </div>
          <Button onClick={toggleEdit}>Edit</Button>
          <Button onClick={toggleDelete}>Delete</Button>
      </section>

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title </label>
            <input
              type="text"
              id="taskTitle"
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={task.taskTitle}
            />

            <label htmlFor="taskPriority">Task Priority </label>
            <input
              type="text-area"
              id="taskPriority"
              onChange={(e) => setTaskPriority(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={task.taskPriority}
            />

            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(evt) => {
                  evt.preventDefault();
                  if (!taskPriority) {
                    window.alert("Please add notes for your project.");
                  } else if (!taskTitle) {
                    window.alert("Please add a name for your project");
                  } else {
                    submitForm(task);
                  }
                }}
                className="btn mt-4"
              >
                Save
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Are you sure you want to delete "{project.name}"?</h3>
            <div className="">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  deleteProject(project.id)
                    .then(() => {
                      toggleDelete()
                    })
                    .then(() => history.push(`/`))
                }}
                className="btn mt-4"
              >
                Yes
              </Button>
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={toggleDelete}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
    </>
  );
};



export default TaskDetails;
