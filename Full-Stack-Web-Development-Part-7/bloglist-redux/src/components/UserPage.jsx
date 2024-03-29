import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch]);

    const { id } = useParams();
    const users = useSelector(state => state.users);
    const singleUser = users.find(user => user.id === id);

    if (!singleUser) {
        return <p>User not found</p>;
    }

    return (
        <>
            <h1>{singleUser.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {singleUser.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </>
    );
};

export default UserPage;
