import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const commentSlice = createSlice({
    name: "comment",
    initialState: [],
    reducers: {
        setComments: (state, action) => {
            return action.payload;
        },
        createComments: (state, action) => {
            return [...state, action.payload];
          },
    }
})

export const { setComments, createComments } = commentSlice.actions;
export default commentSlice.reducer;
export const initializeComments = (id) => {
    return async (dispatch) => {
      const comments = await blogService.getComments(id)
      dispatch(setComments(comments))
    }
  }

export const createComment = (id, comment) => {
    return async (dispatch) => {
      const newComment = await blogService.createComment(id, comment)
      console.log(newComment)
      dispatch(createComments(newComment.comments[newComment.comments.length -1]))
    }
}