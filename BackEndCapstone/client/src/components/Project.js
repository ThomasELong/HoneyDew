import React, { useState, useContext, useEffect } from "react";
import { Card, CardImg, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { ProjectContext } from "../providers/ProjectProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";
import { TaskContext } from "../providers/TaskProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Project = ({ post, setCategoryPostModal, categoryPostModal }) => {
  const history = useHistory();
  const { getTasksByProjectId } = useContext(TaskContext);
  const { userProfile } = useContext(UserProfileContext);
  const theUserProfile = JSON.parse(userProfile);
  const { updateProject, getProject } = useContext(ProjectContext);

  useEffect(() => {
    getTasksByProjectId();
  }, []);



  const [editModal, setEditModal] = useState(false);

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const updateProject = () => {

    const updatedProject = {
        id: project.id,
        name: name.current.value,
        projectNote: projectNote.current.value,
        createdDate: new Date(),
        userProfileId: userProfileId,

    }
    updateProject(updatedProject.id)
    .then(() => {
        getProject()
        .then(post => setProject(post));
    });
}

  const submitForm = () => {
    updatePost({
      id: project.id,
      name: name,
      content: content,
      categoryId: parseInt(categoryId),
      imageLocation: imageLocation,
      publishDateTime: publishDateTime,
      createDateTime: post.createDateTime,
    }).then(() => history.push(`/posts/${post.id}`));
  };

  const { deleteProject } = useContext(ProjectContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      <Card className="m-4">
        <CardBody>
          <h3>{project.name}</h3>
          <p>{project.projectNote}</p>
          <p>{project.createdDate}</p>
        </CardBody>
        
          <Button onClick={toggleEdit}>Edit</Button>
        
        
          <Button onClick={toggleDelete}>Delete</Button>
        
      </Card>

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={post.title}
            />

            <label htmlFor="content">Content: </label>
            <input
              type="text-area"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={post.content}
            />

            <label htmlFor="category">Category: </label>
            <select
              id="category"
              onChange={(e) => setCategoryId(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={post.category.id}
            >
              <option key="0" value="0">
                Select A Category
              </option>
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label htmlFor="imageLocation">Image URL: </label>
            <input
              type="text"
              id="imageLocation"
              onChange={(e) => setImageLocation(e.target.value)}
              autoFocus
              className="form-control mt-4"
              defaultValue={post.imageLocation}
            />

            <label htmlFor="publicationDate">Publication Date: </label>
            <input
              type="date"
              name="publishDateTime"
              id="new=post-publish-date-time"
              placeholder="Pick a Date"
              defaultValue={post.publishDateTime.substr(0, 10)}
              onChange={(e) => setPublishDateTime(e.target.value)}
            />

            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(evt) => {
                  evt.preventDefault();
                  if (!content) {
                    window.alert("You forgot to enter content!");
                  } else if (!title) {
                    window.alert("You forgot a title!");
                  } else if (categoryId === "0") {
                    window.alert("You forgot a category!");
                  } else {
                    submitForm(post);
                  }
                }}
                className="btn mt-4"
              >
                Save
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Do you want to delete the post "{post.title}"?</h3>
            <div className="">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  deletePost(post.id)
                    .then(() => {
                      toggleDelete();
                    })
                    .then(() => setCategoryPostModal(!categoryPostModal)); //setting the category post modal and toggling it
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

export default Project;