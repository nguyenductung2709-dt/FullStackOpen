import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getComments = (id) => {
  const updatedUrl = `${baseUrl}/${id}/comments`
  const request = axios.get(updatedUrl);
  return request.then((response) => response.data);
}

const createNew = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  };

  const newObject = {
    title: title,
    author: author,
    url: url,
    likes: 0,
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createComment = async (id, comment) => {
  const newComment = {
    comment: comment
  }
  const updatedUrl = `${baseUrl}/${id}/comments`
  const response = await axios.post(updatedUrl, newComment);
  return response.data;
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const updatedUrl = `/api/blogs/${newObject.id}`;
  const response = await axios.put(updatedUrl, newObject, config);
  return response.data;
};

const remove = async (idOfDeletedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const updatedUrl = `/api/blogs/${idOfDeletedBlog}`;
  const response = await axios.delete(updatedUrl, config);
  return response.data;
};

export default { setToken, getAll, createNew, update, remove, getComments, createComment };
