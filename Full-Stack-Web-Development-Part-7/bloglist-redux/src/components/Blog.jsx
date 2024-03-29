import { useState } from "react";
import { useDispatch } from "react-redux";

const Blog = ({ blogs }) => {
  const [visibleBlogs, setVisibleBlogs] = useState({});
  const dispatch = useDispatch();

  const toggleVisibility = (blogId) => {
    setVisibleBlogs((prevVisibleBlogs) => ({
      ...prevVisibleBlogs,
      [blogId]: !prevVisibleBlogs[blogId],
    }));
  };

  const blogStyle = {
    display: "flex",
    alignItems: "center",
    paddingTop: 1,
    paddingLeft: 1,
    border: "solid",
    borderWidth: 1,
    marginBottom: 2,
  };

  return (
    <>
      {blogs.map((singleBlog, index) => (
        <div key={singleBlog.id} style={blogStyle} id="all_blogs">
          <div id="blog-post">
            <p>
              <a href={`/blogs/${singleBlog.id}`}>
                {singleBlog.title} by {singleBlog.author}
              </a>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
