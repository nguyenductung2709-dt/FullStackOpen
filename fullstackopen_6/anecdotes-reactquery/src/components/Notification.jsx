import React, { useEffect } from 'react';
import { useNotification } from '../NotificationContext';

const Notification = () => {
  const { notificationState, showNotification } = useNotification();

  useEffect(() => {
    if (notificationState.visible) {
      const timer = setTimeout(() => {
        showNotification('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notificationState.visible, showNotification]);

  return (
    <div className={`notification ${notificationState.visible ? 'show' : ''}`}>
      {notificationState.message}
    </div>
  );
};

export default Notification;
