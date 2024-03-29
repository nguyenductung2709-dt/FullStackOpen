import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id = 'title'
          type="text"
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          placeholder = 'Title'
        />
      </div>
      <div>
        author:
        <input
          id = 'author'
          type="text"
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
          placeholder = "Author"
        />
      </div>
      <div>
        url:
        <input
          id = 'url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder = 'Url'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm
