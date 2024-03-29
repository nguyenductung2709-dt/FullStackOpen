import React, { useEffect } from "react";
import {
  handleLike,
  initializeBlogs,
  removeBlog,
} from "../reducers/blogReducer";
import { initializeComments, createComment } from "../reducers/commentReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';


const SingleBlogPage = ({ username }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogs = useSelector((state) => state.blog);
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeComments(id));
  }, [dispatch, id]);

  const blog = blogs.find((blog) => blog.id === id);

  const increaseLike = (id) => {
    const blogToLike = blogs.find((blog) => blog.id === id);
    if (blogToLike) {
      dispatch(handleLike(id));
      dispatch(
        setNotification(
          `Liked blog: ${blogToLike.title} by ${blogToLike.author}`,
          2000
        )
      );
      dispatch(initializeBlogs());
    }
  };

  console.log(comments)

  const deleteBlog = (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    if (blogToDelete) {
      dispatch(removeBlog(id));
      dispatch(
        setNotification(
          `Deleted blog: ${blogToDelete.title} by ${blogToDelete.author}`,
          2000
        )
      );
    }
  };

  const addComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(createComment(id, comment));
  };

  const buttonStyle = {
    borderRadius: 5,
    background: "skyblue",
    border: "0.5px solid black",
    color: "white",
    marginLeft: 10,
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div key={blog.id} id="single-blog">
        <div id="blog-post">
          <h1>
            {blog.title} by {blog.author}
          </h1>
          <a href={`${blog.url}`}> {blog.url} </a>
          <p>
            {blog.likes} likes
            <button style = {buttonStyle} onClick={() => increaseLike(blog.id)}>Like</button>
          </p>
          {blog.user && <p>added by {blog.user.name}</p>}
          {blog.user && username === blog.user.username && (
            <button style = {buttonStyle} onClick={() => deleteBlog(blog.id)}>Delete</button>
          )}
          <div>
            <h2>Comments</h2>
            <ul>
              {comments && comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Form onSubmit={addComment}>
        <Form.Group className="mb-3">
          <Form.Control id="title" type="text" name="comment" placeholder="Enter your comment" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Comment
        </Button>
      </Form>
    </>
  );
};

export default SingleBlogPage;
