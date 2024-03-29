import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers:{
        setUsers: (state, action) => {
            return action.payload;
        },
    }
})

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const initializeUsers = () => {
    return async (dispatch) => {
      const users = await usersService.getAll();
      const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length);
      dispatch(setUsers(sortedUsers));
    };
  };
