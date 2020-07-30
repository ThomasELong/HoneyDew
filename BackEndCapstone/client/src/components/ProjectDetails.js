import React, { useContext, useEffect } from "react"
import { ProjectContext } from "../providers/ProjectProvider";
import Project from "./Project";
import {CardColumns, Button} from "reactstrap"
import { useHistory } from "react-router-dom";

const ProjectDetails = () => {
    const { projects, getAllProjects, getProjectById} = useContext(ProjectContext);
    const history = useHistory();

    useEffect(() => {
        getProjectById();
      }, []);

    const handleClick = () => {
        history.push(`/addProject`);
    }

    return (
        <>
            <section>
                <CardColumns>
                    {
                        projects.map(project => {
                            return <Project project={project} />
                        })
                    }
                </CardColumns>
            </section>
        </>
    )
}

export default ProjectDetails