import React, { useEffect, useContext, useState, useRef } from "react";
import styles from "../Styles";
import { Button, CardBody, Form, Modal, ModalBody, Card, CardTitle, CardText, CardGroup } from "reactstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TaskContext } from "../../providers/TaskProvider"
import { TaskNoteContext } from "../../providers/TaskNoteProvider";


const TaskDetails = () => {
  const { getTask, deleteTask, updateTask, addTask } = useContext(TaskContext)
  const { tasknotes, addTaskNote, getTaskNotesByTaskId } = useContext(TaskNoteContext)
  const { id } = useParams();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [addTaskNoteModal, setAddTaskNoteModal] = useState(false);
  const [taskNoteTitle, setTaskNoteTitle] = useState();
  const [taskNoteContent, setTaskNoteContent] = useState();
  const [task, setTask] = useState({})

  const history = useNavigate();
  const updatedTaskTitle = useRef();
  const updatedTaskPriority = useRef();

  useEffect(() => {
    getTask(id)
      .then(setTask)
    getTaskNotesByTaskId(id)
  }, []);

  const toggleAddTaskNoteModal = () => {
    setAddTaskNoteModal(!addTaskNoteModal)
  }

  const projectId = task.projectId

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleTaskComplete = () => {
    task.taskComplete = !task.taskComplete;
    updateTask(task)
      .then((res) => {
        (setTask(res))
      })
      .then(() => (window.location.reload()))

  };
  useEffect(() => {
    getTask(id)
      .then(setTask)
    getTaskNotesByTaskId(id)
  }, []);

  const submitEditTaskForm = () => {
    if (!updatedTaskPriority) {
      window.alert("Please add a priority for this task.");
    } else if (!updatedTaskTitle) {
      window.alert("Please add a title for this task");
    } else {
      updateTask({
        id: task.id,
        taskTitle: updatedTaskTitle.current.value,
        taskPriority: updatedTaskPriority.current.value,
        taskComplete: task.taskComplete,
        taskCategoryId: task.taskCategoryId,
        projectId: task.projectId
      }).then(() => history(`/project/${task.projectId}`));
    }
  };

  const submitNewTaskNoteForm = () => {
    if (!taskNoteTitle) {
      window.alert("Please add a title for this note")
    } else if (!taskNoteContent) {
      window.alert("Please add content for this note")
    } else {
      const NewTaskNote = {
        title: taskNoteTitle,
        content: taskNoteContent,
        taskId: (id),
        createdDate: new Date()
      };
      addTaskNote(NewTaskNote)
        .then(() => (getTaskNotesByTaskId(id)),
          toggleAddTaskNoteModal())
    }
  }

  const formattedDate = (date) => {
    if (date === undefined) {
      return ""
    } else {
      const unformatedDate = date.split("T")[0];
      const [year, month, day] = unformatedDate.split("-");
      return month + "/" + day + "/" + year;
    }
  }

  return (
    <>
      <section className="container">
        <div>
          <div className="taskHeader">
            <h2>{task.taskTitle}</h2>
            <h4>Priority: {task.taskPriority}</h4>
          </div>
          <button onClick={toggleTaskComplete} className={task.taskComplete === true ? "trueColor" : "falseColor"}>Complete</button>

          <div className="container">
            <CardGroup>
              {(tasknotes.length > 0) &&
                tasknotes.map((tasknote) => (
                  <div>
                    <Card tag={Link} to={`/taskNoteDetails/${tasknote.id}`} key={tasknote.id}>
                      <CardBody>
                        <CardTitle>{tasknote.title}</CardTitle>
                        <CardText>{tasknote.content}</CardText>
                        <CardText>{formattedDate(tasknote.createdDate)}</CardText>
                      </CardBody>
                    </Card>
                  </div>
                ))}
            </CardGroup>
          </div>
        </div>
        <div className="taskButtonContainer">
          <div>
            <Button style={styles.addNewTaskButton} onClick={toggleAddTaskNoteModal}>Add A New Task Note</Button>
            <Button style={styles.editTaskButton} onClick={toggleEdit}>Edit</Button>
            <Button style={styles.deleteTaskButton} onClick={toggleDelete}>Delete</Button>
          </div>
        </div>
      </section>


      {/* This modal edits a task */}
      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <Form>
            <div className="form-group">
              <label htmlFor="taskTitle">Task Title </label>
              <input
                type="text"
                id="taskTitle"
                ref={updatedTaskTitle}
                required
                autoFocus
                className="form-control mt-4"
                defaultValue={task.taskTitle}
              />
              <div>
                <label htmlfor="taskPriority">Priority</label>
                <select
                  name='taskPriority'
                  ref={updatedTaskPriority}
                  id='taskPriority'
                  className='form-control'
                  placeholder='taskPriority'
                  defaultValue={task.taskPriority}
                  required>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Minimal">Minimal</option>
                </select>
              </div>
              <div className="">
                <Button
                  type="submit"
                  size="sm"
                  color="info"
                  onClick={(evt) => {
                    evt.preventDefault();
                    submitEditTaskForm(task);
                    toggleEdit()
                  }}
                  className="btn mt-4"
                >
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>


      {/* This modal deletes a task */}
      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Are you sure you want to delete "{task.taskTitle}"?</h3>
            <div className="">
              <Button
                style={styles.yesDeleteButton}

                onClick={(e) => {
                  e.preventDefault();
                  deleteTask(task.id)
                    .then(() => history(`/project/${projectId}`))
                }}
              >
                Yes
              </Button>
              <Button
                style={styles.noDeleteButton}

                onClick={toggleDelete}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* This modal adds and submits and new task note */}
      <Modal isOpen={addTaskNoteModal} toggle={toggleAddTaskNoteModal}>
        <ModalBody>
          <div className="form-group">
            <input
              placeholder="Add a title for this note"
              type="text-area"
              id="taskTitle"
              required
              autoFocus
              className="form-control mt-4"
              onChange={(e) => setTaskNoteTitle(e.target.value)}
            />
            <input
              placeholder="Add some content for this note"
              type="text-area"
              id="taskNoteContent"
              required
              className="form-control mt-4"
              onChange={(e) => setTaskNoteContent(e.target.value)}
            />

            <div className="">
              <Button
                type="submit"
                style={styles.addNewTaskButton}
                onClick={(e) => {
                  e.preventDefault();
                  submitNewTaskNoteForm();

                }}
                className="btn mt-4"
              >
                Save
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};



export default TaskDetails;





