const router = require('express').Router();
const middleware = require('../util/middleware');
const { Blog, User } = require('../models/index');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const where = {};

    if (req.query.search) {
      where[Op.or] = [
        {
          title: {
            [Op.substring]: req.query.search
          }
        },
        {
          author: {
            [Op.substring]: req.query.search
          }
        }
      ];
    }

    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: {
          exclude: ['userId'],
        },
      },
      order: [
        ['likes', 'DESC']
      ]
      ,
      where
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post('/', middleware.findUserSession, async (req, res, next) => {
  try {
    const user = req.user;
    const newBlog = await Blog.create({...req.body, userId: user.id, date: new Date()});
    res.json(newBlog);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', middleware.findUserSession, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    const user = req.user;
    console.log(user);
    console.log(blog);
    if (blog && (blog.userId == user.id)) {
      await blog.destroy();
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      blog.likes += 1;
      await blog.save();
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.use(middleware.errorHandler);

module.exports = router;
