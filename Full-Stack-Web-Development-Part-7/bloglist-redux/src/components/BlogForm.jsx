import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlogs } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form, Button } from 'react-bootstrap';

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    dispatch(createBlogs(title, author, url));
    dispatch(setNotification(`a blog ${title} by ${author} added`, 2000));
  };

  return (
    <Form onSubmit={addBlog}>
      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control id="title" type="text" name="title" placeholder="Title" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author:</Form.Label>
        <Form.Control id="author" type="text" name="author" placeholder="Author" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>URL:</Form.Label>
        <Form.Control id="url" type="text" name="url" placeholder="Url" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default BlogForm;
