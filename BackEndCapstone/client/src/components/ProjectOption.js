import React, { useContext } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { useHistory, Link } from 'react-router-dom';

const Project = ({project}) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(`api/project/${project.id}`);
    }
    
    
    
    return (
        <>
            <Card>
                <CardBody>
                    <Link>
                    <h4>{project.name}</h4>
                    {project.createdDate}
                    </Link>
                </CardBody>
            </Card>
        </>

    )
}

export default Project