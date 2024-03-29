const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.comments)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blogId = request.params.id

  try {
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    const { comment } = body

    if (!comment) {
      return response.status(400).json({ error: 'Comment content is missing' })
    }

    blog.comments.push(comment)
    const updatedBlog = await blog.save()
    response.status(201).json(updatedBlog)
  } catch (error) {
    console.error('Error adding comment:', error.message)
    return response.status(500).json({ error: 'Internal server error' })
  }
})




blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token

  if (!token) {
    return response.status(401).json({ error: 'Missing token' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (decodedToken.id.toString() !== blogToDelete.user.toString()) {
    return response.status(403).json({ error: 'Unauthorized: You cannot delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({ error: 'Required fields are missing' });
  }

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    return response.status(201).json(savedBlog)
  } catch (error) {
    console.error('Error creating blog:', error.message)
    return response.status(500).json({ error: 'Internal server error' })
  }
})



blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    response.json(updatedBlog)
  }
  else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
