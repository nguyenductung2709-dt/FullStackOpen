const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })

  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.headers.authorization
  if (authorization && authorization.startsWith('bearer ')) {
    request.token = authorization.replace('bearer ', '')
  } else {
    request.token = null 
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

  if (!token) {
    request.user = null
    return next()
  }

  const decodedToken = jwt.decode(token, process.env.SECRET)

  if (!decodedToken || !decodedToken.id) {
    request.user = null
    return next()
  }

  try {
    const user = await User.findById(decodedToken.id.toString())

    if (!user) {
      request.user = null
    } else {
      request.user = user
    }
    next()
  } catch (error) {
    console.error('Error extracting user:', error.message)
    response.status(500).json({ error: 'Internal server error' })
  }
}



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}