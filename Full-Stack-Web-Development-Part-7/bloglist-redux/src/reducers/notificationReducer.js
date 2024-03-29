import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    clearMessage(state) {
      state.message = "";
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setMessage(`${message}`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, time);
  };
};
