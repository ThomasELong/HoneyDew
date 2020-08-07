import React, { useContext, useEffect } from "react"
import { Button, CardBody, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, CardImg, Toast, ToastBody, ToastHeader, Modal, ModalHeader, ModalBody, Card, CardTitle, CardText, CardGroup } from "reactstrap";

import { ProjectContext } from "../providers/ProjectProvider";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const { projects, getProjectsByUser} = useContext(ProjectContext);

    useEffect(() => {
        getProjectsByUser();
      }, []);

    return (
        <>
            <section className="container">
                <div className="addNewProjectLink">
                    <Button size="lg" block outline color="primary"tag={Link} className="button" size="lg" to="/newProjectForm">Add New Project</Button>
                </div>
                <div className="existingProjectsContainer">
                   { (projects.length > 0 ) &&
                        projects.map((project) => (
                            <Button color="info" tag={Link} 
                            className="existingProjects" 
                            key={project.id} 
                            to={`/project/${project.id}`}> 
                            {project.name}
                            </Button>
                        ))
                        }    
                    
                </div>
            </section>
        </>
    )
}

export default UserDashboard