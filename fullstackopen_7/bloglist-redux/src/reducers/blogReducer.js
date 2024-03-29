import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    createBlog: (state, action) => {
      state.push(action.payload);
    },
    likeBlog: (state, action) => {
      const id = action.payload;
      const blogToLike = state.find((singleBlog) => singleBlog.id == id);
      if (blogToLike) {
        blogToLike.likes += 1;
      }
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      return state.filter((singleBlog) => singleBlog.id !== id);
    },
  },
});

export const { createBlog, setBlogs, likeBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const createBlogs = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(title, author, url);
    dispatch(createBlog(newBlog));
  };
};

export const handleLike = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blog;
    const blogToLike = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
    await blogService.update(updatedBlog);
    dispatch(likeBlog(id));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};
