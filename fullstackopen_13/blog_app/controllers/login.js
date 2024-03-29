const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const { Session, User } = require('../models/index');


router.post('/', async(req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username }})
    const passwordCorrect = req.body.password === 'secret'
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: 'invalid username or password'
        })
      }
    const userForToken = {
        username: user.username,
        id: user.id,
    }
    const token = jwt.sign(userForToken, SECRET)
    await Session.destroy({
      where: {
        userId: user.id,
      }
    })
    if (user.disabled == false) {
      await Session.create({
        userId: user.id,
        token: token,
      })
    }
    else {
      throw Error('This user has been banned');
    }
    res.status(200).send({ token, username: user.username, name: user.name })
  } catch(err) {
      console.log(err)
      return res.status(401).json({
        error: 'Log in failed! Check username and password!'
      })
    }
  })

module.exports = router;