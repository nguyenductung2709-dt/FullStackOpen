const _ = require('lodash')
const Blog = require('../models/blog')
const blogs = Blog.find({})

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumOfAllLikes = blogs.reduce((total, blog) => total + blog.likes, 0)
  return sumOfAllLikes
}
  
const mostLikes = (blogs) => {
  const eachLike = blogs.map(blog => blog.likes)
  const maxLike = Math.max(...eachLike)
  const returnedBlog = blogs.find(blog => blog.likes === maxLike)
  const realReturnedBlog = {
    title: returnedBlog.title,
    author: returnedBlog.author,
    likes: returnedBlog.likes
  }
  return realReturnedBlog
}

const productiveAuthor = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const mostProductiveAuthor = _.maxBy(Object.keys(blogsByAuthor), author => blogsByAuthor[author].length)
  const realMostProductiveAuthor = {
    author: mostProductiveAuthor,
    blogs: blogsByAuthor[mostProductiveAuthor].length
  }
  
  return realMostProductiveAuthor
}

const favoriteAuthor = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const favoriteAuthor = _.maxBy(Object.keys(blogsByAuthor), author => _.sumBy(blogsByAuthor[author], 'likes'))
  const totalLikes = _.sumBy(blogsByAuthor[favoriteAuthor], 'likes')
  const realFavoriteAuthor = {
    author: favoriteAuthor,
    likes: totalLikes
  }
  return realFavoriteAuthor
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  productiveAuthor,
  favoriteAuthor
}

