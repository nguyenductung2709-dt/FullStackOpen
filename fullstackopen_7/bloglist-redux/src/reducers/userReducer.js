import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const storedUser = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
const initialState = storedUser || null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    logOutUser: () => null,
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export const setUsers = (username, password) => {
  return async (dispatch) => {
    const userObject = {
      username,
      password,
    };
    const user = await loginService.login(userObject);
    dispatch(setUser(user));
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
  };
};
