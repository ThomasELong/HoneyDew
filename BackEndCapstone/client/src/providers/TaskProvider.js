import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {

  const apiUrl = "/api/task";
  const [tasks, setTasks] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getTask = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const getTasksByProjectId = (id) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/getbyprojectid/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setTasks(res))
    );

  const getAllTasks = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setTasks));

  const addTask = (task) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      }));

  const updateTask = (task) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${task.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }).then(getTask(task.id))
    );

  const deleteTask = (task) => (
    getToken().then((token) =>
      fetch(`${apiUrl}/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then(resp => {
        if (resp.ok) {
          return;
        }
        throw new Error("Unauthorized");
      }))
  )

  return (
    <TaskContext.Provider value={{ tasks, getTask, addTask, getAllTasks, getTasksByProjectId, updateTask, deleteTask }}>
      {props.children}
    </TaskContext.Provider>
  );
};












// import React, { useEffect, useContext, useState, useRef } from "react";
// import { Button, Modal, ModalBody } from "reactstrap"
// import { useParams, Link } from "react-router-dom";
// import { PostContext } from "../providers/PostProvider";
// import { CategoryContext } from "../providers/CategoryProvider";
// import { useHistory } from "react-router-dom";
// import { CommentContext } from "../providers/CommentProvider";


// const PostDetail = () => {

//   const { id } = useParams();
//   const history = useHistory();

//   const { categories, getAllCategories } = useContext(CategoryContext);
//   const { getPostById, updatePost, deletePost } = useContext(PostContext);
//   const [post, setPost] = useState({ imageLocation: "", userProfile: {}, publishDateTime: "" });

//   const titleRef = useRef();
//   const contentRef = useRef();
//   const categoryIdRef = useRef();
//   const imageLocationRef = useRef();
//   const publishDateTimeRef = useRef();


//   const [editModal, setEditModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);


//   const toggleDelete = () => {
//     setDeleteModal(!deleteModal);
//   };

//   const toggleEdit = () => {
//     setEditModal(!editModal)
//   };

//   useEffect(() => {
//     getPostById(id).then((post) => {
//       setPost(post);
//       getAllCategories();
//     });
//   }, []);

//   const submitForm = () => {


//     const thePost = {
//       id: parseInt(id),
//       title: titleRef.current.value,
//       content: contentRef.current.value,
//       categoryId: parseInt(categoryIdRef.current.value),
//       imageLocation: imageLocationRef.current.value,
//       publishDateTime: publishDateTimeRef.current.value,
//       createDateTime: post.createDateTime,
//       isApproved: true

//     }
//     updatePost(thePost)
//       .then(() => getPostById(id))
//       .then((post) => {
//         setPost(post)
//       });
//   };

//   if (!post) {
//     return null;
//   }

//   return (
//     <>
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-sm-12 col-lg-6">
//             <div><img src={post.imageLocation} className="post-details-image" /></div>
//             <p className="post-details-title"><b>Post Title: </b> {post.title}</p>
//             <p className="post-details-postedBy"><b>Posted By: </b> {post.userProfile.displayName}</p>
//             <pre className="post-details-content">{post.content}</pre>
//             <p className="post-details-publishDate"><b>Publish Date: </b> {post.publishDateTime.substr(0, 10)}</p>
//           </div>
//         </div>
//         <Button onClick={() => history.push(`/newcomment/${post.id}`)} >Add Comment</Button>
//         <Button onClick={toggleEdit}>Edit</Button>
//         <Button onClick={toggleDelete}>Delete Post</Button>
//         <Link to={`/comments/${id}`} type="button" class="btn btn-info" value="View Comments" size="sm">
//           View Comments
//           </Link>
//       </div>

//       <Modal isOpen={deleteModal} toggle={toggleDelete}>
//         <ModalBody>
//           <div className="form-group">
//             <h3>Do you want to delete the post "{post.title}"?</h3>
//             <div className="">
//               <Button
//                 type="submit"
//                 size="sm"
//                 color="info"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   deletePost(post.id).then(() => history.push(`/`));
//                 }}
//                 className="btn mt-4"
//               >
//                 Yes
//               </Button>
//               <Button
//                 type="submit"
//                 size="sm"
//                 color="info"
//                 onClick={toggleDelete}
//               >
//                 No
//               </Button>
//             </div>
//           </div>
//         </ModalBody>
//       </Modal>

//       <Modal isOpen={editModal} toggle={toggleEdit}>
//         <ModalBody>
//           <div className="form-group">
//             <label htmlFor="title">Title: </label>
//             <input
//               type="text"
//               id="title"
//               ref={titleRef}
//               required
//               autoFocus
//               className="form-control mt-4"
//               defaultValue={post.title}
//             />

//             <label htmlFor="content">Content: </label>
//             <input
//               type="text-area"
//               id="content"
//               ref={contentRef}
//               autoFocus
//               className="form-control mt-4"
//               defaultValue={post.content}
//             />

//             <label htmlFor="category">Category: </label>
//             <select
//               id="category"
//               ref={categoryIdRef}
//               required
//               autoFocus
//               className="form-control mt-4"
//               defaultValue={post.categoryId}
//             >
//               <option key="0" value="0">Select A Category</option>
//               {categories.map(c => (
//                 <option value={c.id} key={c.id} >
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             <label htmlFor="imageLocation">Image URL: </label>
//             <input
//               type="text"
//               id="imageLocation"
//               ref={imageLocationRef}
//               autoFocus
//               className="form-control mt-4"
//               defaultValue={post.imageLocation}
//             />

//             <label htmlFor="publicationDate">Publication Date: </label>
//             <input
//               type="date"
//               name="publishDateTime"
//               id="new=post-publish-date-time"
//               placeholder="Pick a Date"
//               defaultValue={post.publishDateTime.substr(0, 10)}
//               ref={publishDateTimeRef}
//             />

//             <div className="">
//               <Button
//                 type="submit"
//                 size="sm"
//                 color="info"
//                 onClick={(evt) => {
//                   evt.preventDefault();
//                   if (!contentRef.current.value) {
//                     window.alert("You forgot to enter content!")
//                   }
//                   else if (!titleRef.current.value) {
//                     window.alert("You forgot a title!")
//                   }
//                   else if (!categoryIdRef.current.value) {
//                     window.alert("You forgot a category!")
//                   }
//                   else {
//                     submitForm(post);
//                     toggleEdit();
//                   }
//                 }}
//                 className="btn mt-4"
//               >
//                 Save
//                             </Button>
//             </div>
//           </div>
//         </ModalBody>
//       </Modal>


//     </>
//   );
// };
// export default PostDetail;