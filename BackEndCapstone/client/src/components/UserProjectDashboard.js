import React, { useContext, useEffect } from "react"
import { Button } from "reactstrap";
import styles from "./Styles";
import { ProjectContext } from "../providers/ProjectProvider";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const { projects, getProjectsByUser } = useContext(ProjectContext);

    useEffect(() => {
        getProjectsByUser();
    }, [])

    return (
        <>
            <section className="container">
                <div className="existingProjectsContainer">
                    {(projects.length > 0) &&
                        projects.map((project) => (
                            <div className="existingProject">
                                <Link to={`/project/${project.id}`}>
                                    <button class="btn btn-primary"
                                        key={project.id} >
                                        {project.name}
                                    </button>
                                </Link>
                            </div>
                        ))
                    }

                </div>
                <div class="">
                    <Link to={"/newProjectForm"}>
                    <button class="btn btn-block" size="md">Add New Project</button>
                    </Link>
                </div>

            </section>
        </>
    )

}

export default UserDashboard