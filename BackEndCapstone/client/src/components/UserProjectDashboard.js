import React, { useContext, useEffect } from "react"
import { ProjectContext } from "../providers/ProjectProvider";
import { Link } from "react-router-dom";
import { Button} from "reactstrap";

const UserDashboard = () => {
    const { projects, getProjectsByUser} = useContext(ProjectContext);

    useEffect(() => {
        getProjectsByUser();
      }, []);

    return (
        <>
            <section className="dashboardContainer">
                <div className="addNewProjectLink">
                    <Button tag={Link} color="info" size="lg" to="/newProjectForm">Add New Project</Button>
                </div>
                <div className="existingProjectsContainer">
                   { (projects.length > 0 ) &&
                        projects.map((project) => (
                            <Button tag={Link} className="existingProjects" key={project.id} to={`/project/${project.id}`}><strong> {project.name}</strong></Button>
                        ))
                        }    
                    
                </div>
            </section>
        </>
    )
}

export default UserDashboard