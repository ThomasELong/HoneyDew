import React, { useContext, useEffect } from "react"
import { ProjectContext } from "../providers/ProjectProvider";
import Project from "./ProjectOption";
import {CardColumns, Button} from "reactstrap"
import { useHistory, Route, Link } from "react-router-dom";

const UserDashboard = () => {
    const { projects, getAllProjects, getProjectsByUser} = useContext(ProjectContext);
    const history = useHistory();

    useEffect(() => {
        getProjectsByUser();
      }, []);

    const handleClick = () => {
        history.push(`/addProject`);
    }

    return (
        <>
            <section>
                <div className="nothingrightnow">
                    <Link color="info" size="lg" to="/newProjectForm">Add New Project</Link>
                </div>
                    {
                        projects.map((project) => (
                            <Link key={project.id} to={`/project/${project.id}`}><strong> {project.name}</strong></Link>
                        ))
                        
                    }
            </section>
        </>
    )
}

export default UserDashboard