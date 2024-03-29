import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";

const UsersPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector(state => state.users);

  return (
    <>
      <h2> Users </h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td><a href={`/users/${user.id}`}>{user.username}</a></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
