const router = require('express').Router()

const { Note, User } = require('../models')

router.get('/', async (req, res) => {
  /* another implementation for query
    let important = {
      [Op.in]: [true, false]
    }

    if ( req.query.important ) {
      important = req.query.important === "true"
    }
  */
  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] }, // don't include userId
    include: {
      model: User,
      attributes: ['name'] // include name
      // we can also do this: attributes: { exclude: ['userId'] }
      /*
      where: {
        important: req.query.important === "true" query get by for example http://localhost:3001/api/notes?important=true
      }
      but this implementation only works if you have the last query
       */
    }
  })
  res.json(notes)
})

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const note = await Note.create({...req.body, userId: user.id, date: new Date()})
    res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    await note.destroy()
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
})

module.exports = router