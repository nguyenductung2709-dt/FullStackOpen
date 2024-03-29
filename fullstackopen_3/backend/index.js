const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('post-data', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use((req, res, next) => {
  if (req.method === 'POST') {
    morgan(':method :url :status :res[content-length] - :response-time ms :post-data')(req, res, next)
  } else {
    morgan('tiny')(req, res, next)
  }
})

/*let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]*/

app.get('/api/persons', (request, response) => {
  Person.find({}) .then(persons => {
    response.json(persons)
  })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})


app.get('/api/info', async (request, response) => {
  Person.find({})
    .then(persons => {
      const number = persons.length
      const currentDate = new Date().toUTCString()
      response.set('Date', currentDate)
      response.send(
        `<p>Phone book has info for ${number} people</p>` +
        `<p>Current Date: ${currentDate}</p>`
      )
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Name or number is missing' })
  }

  Person.findOne({ name: body.name })
    .then((person) => {
      if (person) {
        return response.status(400).json({ error: 'Name must be unique' })
      }

      const newPerson = new Person({
        name: body.name,
        number: body.number,
      })

      return newPerson.save()
    })
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  /*console.error(error.message)*/

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})