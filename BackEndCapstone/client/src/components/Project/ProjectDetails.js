import React, { useEffect, useContext, useState, useRef } from "react";
import { Button, Modal, ModalHeader, FormGroup, Label, Input, ModalBody, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { ProjectContext } from "../../providers/ProjectProvider";
import { TaskContext } from "../../providers/TaskProvider"
import { TaskCategoryContext } from "../../providers/TaskCategoryProvider";


const ProjectDetails = () => {
    const { getProjectById, deleteProject, updateProject } = useContext(ProjectContext);
    const { tasks, getTasksByProjectId, addTask } = useContext(TaskContext);
    const { taskCategories, getAllTaskCategories } = useContext(TaskCategoryContext);
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const { id } = useParams();
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [taskCategoryDropdown, setTaskCategoryDropdown] = useState(false);
    const [project, setProject] = useState({});
    const [taskCategory, setTaskCategory] = useState({});
    const [taskPriority, setTaskPriority] = useState();
    const [taskTitle, setTaskTitle] = useState();
    const history = useHistory();
    const projectName = useRef();
    const projectNote = useRef();

    useEffect(() => {
        getProjectById(id)
            .then(setProject)
    }, []);

    useEffect(() => {
        getAllTaskCategories()
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

    const submitEditProjectForm = () => {
        updateProject({
            id: project.id,
            name: projectName.current.value,
            projectNote: projectNote.current.value,
            createdDate: project.createdDate,
            userProfileId: userProfileId
        }).then(() => getProjectById(id)
        .then(setProject))
    };

    const submitNewTaskForm = () => {
        if (!taskTitle) {
            window.alert("Please add the name of this task");
        } else if (!taskPriority) {
            window.alert("Please add a priority level to this task")
        } else {
            const NewTask = {
                taskTitle: taskTitle,
                taskPriority: taskPriority,
                taskComplete: 0,
                taskCategoryId: taskCategory,
                projectId: id,
                createdDate: new Date(),
            };
            addTask(NewTask)
                .then(() =>
                    (getTasksByProjectId(id)),
                    toggleAddTask());
        }
    }
    return (
        <>
            <section className="m-4">
                <div>
                    <h3>{project.name}</h3>
                    <div>{project.projectNote}</div>
                    <div>{project.createdDate}</div>
                    <div>
                        {(tasks.length > 0) &&
                            tasks.map((task) => (
                                <div>
                                    <Button color="info" tag={Link} to={`/taskDetails/${task.id}`} key={task.id} size="md">{task.taskTitle}</Button>
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
                                            value="CRITICAL"
                                            key="CRITICAL"
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
                                            value="High"
                                            key="High"

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
                                            value="Medium"
                                            key="Medium"

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
                                            value="Low"
                                            key="Low"

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
                                            value="Minimal"
                                            key="Minimal"

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
                                    submitNewTaskForm()

                                    history.push(`/project/${id}`)
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
                            ref={projectName}
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={project.name}
                        />

                        <label htmlFor="projectNote">Project Notes </label>
                        <input
                            type="text-area"
                            id="projectNote"
                            ref={projectNote}
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
                                    submitEditProjectForm(project)
                                    toggleEdit()
                                }}
                                className="btn mt-4"
                            >Save</Button>
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








