const router = require('express').Router();
const { Session } = require('../models');
const middleware = require('../util/middleware');

router.delete('/', middleware.findUserSession, async (req, res, next) => {
    try {
      if (!req.user) {
        throw Error('No user found!')
      }
      const id = req.user.id
      await Session.destroy({ where: { userId: id } })
      return res.status(200).json({ message: 'Successfully logged out!' })
  
    } catch (error) {
      next(error)
    }
  })
  
router.use(middleware.errorHandler);

module.exports = router;
