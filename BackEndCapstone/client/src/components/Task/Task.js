import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { TaskContext } from "../../providers/TaskProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Task = ({ task }) => {

  const { updateTask, deleteTask } = useContext(TaskContext)
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState();
  const [taskPriority, setTaskPriority] = useState();
  const [ taskComplete, setTaskComplete] = useState();
  const [taskCategory, setTaskCategory] = useState();

  const toggleEdit = () => {
    setEditModal(!editModal)
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal)
  };

  const submitForm = () => {
    updateTask({
      id: task.id,
      taskTitle: taskTitle,
      taskPriority: taskPriority,
      taskComplete: taskComplete,
      taskCategory: taskCategory,
      projectId: task.projectId
    });
    toggleEdit();
  }

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{task.taskTitle}</p>
        <Button onClick={toggleEdit}>Edit</Button>
        <Button onClick={toggleDelete}>Delete</Button>
      </Card>

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <div className="form-group">
            <input
              type="text"
              id="taskTitle"
              onChange={e => setTaskTitle(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={task.taskTitle}
            />
            <input
              type="text"
              id="taskPriority"
              onChange={e => setTaskPriority(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
            />
            <input
              type="text"
              id="taskComplete"
              onChange={e => setTaskComplete(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
            />
            <input
              type="text"
              id="taskCategory"
              onChange={e => setTaskCategory(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={task.taskCategory}
            />
            
                <div className="">
                    <Button
                        type="submit"
                        size="sm"
                        color="info"
                        onClick={(evt) => {
                        evt.preventDefault();
                        submitForm(task);
                        }}
                        className="btn mt-4"
                        >
                        Save
                    </Button>
                </div>
            </div>
          </ModalBody>
         </Modal>
    
      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>
              Are you sure you want to delete "{task.taskTitle}"?
                    </h3>
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(e) => {
                  e.preventDefault();
                  deleteTask(task.id)
                }
                }
                className="btn mt-4"
              >
                Yes
                      </Button>
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={toggleDelete}
              >No</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

    </>
  );
};

export default Task;