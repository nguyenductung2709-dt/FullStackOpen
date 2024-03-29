import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { setUsers } from "../reducers/userReducer";
import { useSelector } from "react-redux";
import { Form, Button } from 'react-bootstrap';


const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";

    try {
      await dispatch(setUsers(username, password));
    } catch (error) {
      dispatch(setNotification(`Error logging in: ${error.message}`, 2000));
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          id="username"
          type="text"
          name="username"
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button id="login-button" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
