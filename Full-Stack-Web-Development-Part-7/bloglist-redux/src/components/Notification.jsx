import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.message);

  if (notification && notification.trim() !== "") {
    return <div className="error">{notification}</div>;
  }
};

export default Notification;
