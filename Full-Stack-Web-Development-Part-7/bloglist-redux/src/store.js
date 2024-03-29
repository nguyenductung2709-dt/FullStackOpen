import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import commentReducer from "./reducers/commentReducer";


const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    comments: commentReducer,
  },
});

export default store;
