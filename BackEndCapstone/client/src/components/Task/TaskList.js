import React, { useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../../providers/TaskProvider"

const TaskList = () => {
    const { tasks, getTasksByUserProfileId } = useContext(TaskContext);

    useEffect(() => {
        getTasksByUserProfileId()
    }, []);

    return (
        <div className="container">
            <h4>Task List</h4>
            <div class="row wrap text-center">
                {(tasks.length > 0) &&
                    tasks.map((task) => (
                        <div className="card well col-md-4">
                            <p>{task.taskTitle}</p>
                            <div class="row">
                                <div class="col-sm-3">
                                    <Link to={`/project/${task.projectId}`}>
                                        <button class="btn" key={task.id} size="md">Project</button>
                                    </Link>
                                </div>
                                <div class="col-sm-3">
                                    <Link to={`/taskDetails/${task.id}`}>
                                        <button class="btn" key={task.id} size="sm">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );

};

export default TaskList