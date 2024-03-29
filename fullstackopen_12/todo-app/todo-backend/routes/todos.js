const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const middleware = require('../util/middleware');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', middleware.incrementTodoCounter, async (req, res) => {
  try {
      const todo = await Todo.create({
          text: req.body.text,
          done: false
      });
      res.send(todo);
  } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).send('Internal Server Error');
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { text, done }, { new: true });
  if (updatedTodo) {
    res.send(updatedTodo);
  } else {
    res.sendStatus(404);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
