import React, { useContext, useEffect } from "react"
import { Button } from "reactstrap";
import styles from "./Styles";
import { ProjectContext } from "../providers/ProjectProvider";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const { projects, getProjectsByUser} = useContext(ProjectContext);

    useEffect(() => {
        getProjectsByUser();
      }, [])
      
    return (
        <>
            <section className="container">
                <div className="addNewProjectLink">
                    <Button tag={Link} style={styles.addProjectButton} size="lg" to="/newProjectForm">Add New Project</Button>
                </div>
                <div className="existingProjectsContainer">
                   { (projects.length > 0 ) &&
                        projects.map((project) => (
                            <div className="existingProject">
                            <Button style={styles.existingProjectsButton} tag={Link}  
                            key={project.id} 
                            to={`/project/${project.id}`}> 
                            {project.name}
                            </Button>
                            </div>
                        ))
                        }    
                    
                </div>
                
            </section>
        </>
    )
    
}

export default UserDashboard