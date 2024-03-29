import React, { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const initialNotificationState = {
  message: '',
  visible: false,
};

const actionTypes = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION',
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return {
        message: action.payload.message,
        visible: true,
      };
    case actionTypes.HIDE_NOTIFICATION:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notificationState, dispatch] = useReducer(notificationReducer, initialNotificationState);

  const showNotification = (message) => {
    dispatch({
      type: actionTypes.SHOW_NOTIFICATION,
      payload: {
        message,
      },
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.HIDE_NOTIFICATION });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notificationState, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
