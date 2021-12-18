import React, { useEffect, useContext, useState, useRef } from "react";
import styles from "../Styles";
import { Button,  Modal, ModalBody } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { TaskNoteContext } from "../../providers/TaskNoteProvider";


const TaskNoteDetails = () => {
  const { getTaskNote, updateTaskNote, deleteTaskNote } = useContext(TaskNoteContext)
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { id } = useParams();
  const [noteEditModal, setNoteEditModal] = useState(false);
  const [noteDeleteModal, setNoteDeleteModal] = useState(false);

  const [addTaskNoteModal, setAddTaskNoteModal] = useState(false);
  const [taskNote, setTaskNote] = useState({})
  const noteTitle = useRef()
  const noteContent = useRef()

  const history = useNavigate();

  useEffect(() => {
    getTaskNote(id)
      .then(setTaskNote)
  }, []);

  const taskId = taskNote.taskId

  const toggleNoteEdit = () => {
    setNoteEditModal(!noteEditModal);
  };

  const toggleNoteDelete = () => {
    setNoteDeleteModal(!noteDeleteModal);
  };


  const submitEditTaskNoteForm = () => {
      updateTaskNote({
        id: taskNote.id,
        title: noteTitle.current.value,
        content: noteContent.current.value,
        taskId: taskId,
        createdDate: taskNote.createdDate
      }).then(() => history(`/taskDetails/${taskId}`));
    }
  

  return (
    <>
      <section className="m-4">
        <div>
          <h3>{taskNote.title}</h3>
          <div>{taskNote.content}</div>
        </div>
        <Button style={styles.editTaskButton} onClick={toggleNoteEdit}>Edit</Button>
        <Button style={styles.deleteTaskButton} onClick={toggleNoteDelete}>Delete</Button>

      </section>

      {/* This modal edits a task note */}
      <Modal isOpen={noteEditModal} toggle={toggleNoteEdit}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="noteTitle">Note Title </label>
            <input
              type="text"
              id="noteTitle"
              ref={noteTitle}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={taskNote.title}
            />

            <label htmlFor="noteContent">Note Content </label>
            <input
              type="text-area"
              id="noteContent"
              ref={noteContent}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={taskNote.content}
            />

            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(evt) => {
                  evt.preventDefault();
                  submitEditTaskNoteForm(taskNote);

                }}
                className="btn mt-4"
              >
                Save
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>


      {/* This modal deletes a task note */}
      <Modal isOpen={noteDeleteModal} toggle={toggleNoteDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Are you sure you want to delete "{taskNote.title}"?</h3>
            <div className="">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  deleteTaskNote(taskNote.id)
                    .then(() => history(`/taskDetails/${taskId}`))
                }}
                className="btn mt-4"
              >
                Yes
              </Button>
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={toggleNoteDelete}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>


     
    </>
  );
};



export default TaskNoteDetails;





