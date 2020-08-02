import React, { useEffect, useContext, useState } from "react";
import { Button, CardBody, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, CardImg, Toast, ToastBody, ToastHeader, Modal, ModalHeader, ModalBody, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { ProjectContext } from "../../providers/ProjectProvider";
import { TaskContext } from "../../providers/TaskProvider"
import { TaskCategoryProvider, TaskCategoryContext } from "../../providers/TaskCategoryProvider";


const ProjectDetails = () => {
    const { getProjectById, deleteProject, updateProject } = useContext(ProjectContext);
    const { tasks, getTasksByProjectId, deleteTask, updateTask, addTask } = useContext(TaskContext);
    const { taskCategories, getAllTaskCategories } = useContext(TaskCategoryContext);
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const { id } = useParams();
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [taskCategoryDropdown, setTaskCategoryDropdown] = useState(false);
    const [project, setProject] = useState({});
    const [name, setName] = useState();

    const [projectNote, setProjectNote] = useState()
    const [taskTitle, setTaskTitle] = useState();
    const history = useHistory();


    useEffect(() => {
        getAllTaskCategories()
    }, []);

    useEffect(() => {
        getProjectById(id)
            .then(setProject);
        getTasksByProjectId(id)
    }, []);

    const toggleEdit = () => {
        setEditModal(!editModal);
    };

    const toggleDelete = () => {
        setDeleteModal(!deleteModal);
    };

    const toggleAddTask = () => {
        setAddTaskModal(!addTaskModal);
    };

    const toggleTaskCategoryDropdown = () => {
        setTaskCategoryDropdown(!taskCategoryDropdown);
    }


    const submitForm = () => {
        updateProject({
            id: project.id,
            name: name,
            projectNote: projectNote,
            createdDate: project.createdDate,
            userProfileId: userProfileId
        }).then(() => history.push(`/`));
    };

    return (
        <>
            <section className="m-4">
                <div>
                    <h3>{project.name}</h3>
                    <div>{project.projectNote}</div>
                    <div>{project.createdDate}</div>
                    <div>
                        {tasks.map((task) => (
                            <div>
                                <Button tag={Link} to={`taskDetails/${task.id}`} key={task.id} color="info" size="md">{task.taskTitle}</Button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Button onClick={toggleAddTask}>Add A New Task</Button>
                    <Button onClick={toggleEdit}>Edit</Button>
                    <Button onClick={toggleDelete}>Delete</Button>
                </div>
            </section>

            <Modal isOpen={addTaskModal} toggle={toggleAddTask}>
                <ModalHeader>{project.name}</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <input
                            type="text-area"
                            id="taskTitle"
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={"Task Title"}
                        />
                        <ButtonDropdown isOpen={taskCategoryDropdown} toggle={toggleTaskCategoryDropdown}>
                            <DropdownToggle caret>Category</DropdownToggle>
                            <DropdownMenu>
                                {taskCategories.map(cat =>
                                    <DropdownItem>{cat.type}</DropdownItem>)}
                            </DropdownMenu>
                        </ButtonDropdown>

                        <input
                            type="text-area"
                            id="projectNote"
                            onChange={(e) => setProjectNote(e.target.value)}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={"Can't remember what this is..."}
                        />

                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (!projectNote) {
                                        window.alert("Please add notes for your project.");
                                    } else if (!name) {
                                        window.alert("Please add a name for your project");
                                    } else {
                                        submitForm(project);
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

            <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="name">Project Name </label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={project.name}
                        />

                        <label htmlFor="projectNote">Project Notes </label>
                        <input
                            type="text-area"
                            id="projectNote"
                            onChange={(e) => setProjectNote(e.target.value)}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={project.projectNote}
                        />

                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (!projectNote) {
                                        window.alert("Please add notes for your project.");
                                    } else if (!name) {
                                        window.alert("Please add a name for your project");
                                    } else {
                                        submitForm(project);
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

            <Modal isOpen={deleteModal} toggle={toggleDelete}>
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
            </Modal>
        </>
    );
};



export default ProjectDetails;








