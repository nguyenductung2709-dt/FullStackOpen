const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./api_test_helper')

let authToken

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlog)
  await User.deleteMany({})
  const newUser = {
    username: 'tung',
    password: '123456',
    name: 'Test User'
  }
  await api.post('/api/users').send(newUser)
  const response = await api.post('/api/login').send({
    username: 'tung',
    password: '123456'
  })
  authToken = response.body.token
})

describe('Test GET methods', () => {
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlog.length)
})

test('all blogs have id property instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
  
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeUndefined()
    })
  })
})

describe('Test POST methods', () => {
test('a blog which lacks title cannot be created', async () => {
  const newBlog = {
    author: "Tungdt",
    url: "https://cloudcomputing.com/",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('a blog which lacks url cannot be created', async () => {
  const newBlog = {
    title: "cloud computing",
    author: "Tungdt",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})
})


/*describe('Test DELETE methods', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${authToken}`) 
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})*/


describe('TEST UPDATE methods', () => {
test('a blog can be updated', async() => {
  const newBlog = {
    title: "cloud computing",
    author: "Tungdt",
    likes: 1000,
    __v: 0
  }

  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(r => r.likes)
  expect(likes).toContain(newBlog.likes)
})
})

describe('TEST Token Authentication', () => {
  test('a blog can be added after logging in', async() => {
    const newBlog = {
      title: "Cloud computing",
      author: "Tungdt",
      url: "https://cloudcomputing.com/",
      likes: 15,
      __v: 0
    }

  await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const blogsAfterAddition = await helper.blogsInDb()
  expect(blogsAfterAddition).toHaveLength(helper.initialBlog.length + 1)

  const titles = blogsAfterAddition.map(blog => blog.title)
  expect(titles).toContain('Cloud computing')
  })

test('a blog cannot be added without logging in', async() => {
  const newBlog = {
    title: "Cloud computing",
    author: "Tungdt",
    url: "https://cloudcomputing.com/",
    likes: 15,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})
})

afterAll(async () => {
  await mongoose.connection.close()
}) 

/* --------------------------------*/