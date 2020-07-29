import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { TaskContext } from "../providers/CommentProvider";
import { ProjectContext } from "../providers/ProjectProvider";
import { RoomContext } from "../providers/RoomProvider";
import { TaskCategoryContext } from "../providers/TaskCategoryProvider";


export default function NewTaskForm() {
  const history = useHistory();
  const { addTask } = useContext(TaskContext);

  const { id } = useParams();
  
  const taskTitle = useRef('taskTitle')
  const taskPriority = useRef('taskPriority')
  const taskComplete = useRef('taskComplete')
  const taskCategoryId = useRef('taskCategoryId')
  const projectId = useRef('projectId')
  const roomId = useRef('roomId')

  const submitTaskForm = (e) => {
    e.preventDefault();
    if (!content) {
      window.alert("You forgot to enter content!");
    } else if (!taskTitle) {
      window.alert("Please add a title");
    } else if (!taskPriority) {
        window.alert("Please add a priority");
    } else if (!taskComplete) {
        window.alert("Please ");
    } else if (!taskCategoryId) {
        window.alert("Please select a category");else {
      const NewTask = {
        taskTitle: taskTitle.current.value,
        taskPriority: taskPriority.current.value,
        taskComplete: taskPriority.current.value,
        taskCategoryId: parseInt(taskCategoryId.current.value),
        projectId: parseInt(projectId.current.value),
        roomId: parseInt(roomId.current.value),
        createdDate: new Date(),
      };
      addTask(NewTask)
        .then(() => history.push(`/task/${id}`))
        .catch((err) => alert(`An error ocurred: ${err.message}`));
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>

        <Label for="taskTitle">Title</Label>
        <Input
          placeholder="taskTitle"
          id="taskTitle"
          ref="taskTitle"
          type="text"
          required

        />
      </FormGroup>
      <FormGroup>
          <Label for="taskPriority">Priority</Label>
          <Selection 
              defaultValue=''
              name='taskPriority'
              ref={taskPriority}
              id='taskPriority'
              className='form-control'
              placeholder='taskPriority'
              required>
              <Option value="Critical">Critical</Option>
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
              <Option value="Minimal">Minimal</Option>
          </Selection>
      </FormGroup>
      <FormGroup>
        <Label for="new-post-content">Content</Label>
        <Input
          placeholder="Content"
          id="new-post-content"
          type="textarea"
          onChange={(e) => setContent(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}