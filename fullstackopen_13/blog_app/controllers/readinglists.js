const router = require('express').Router();
const middleware = require('../util/middleware');
const { ReadingList, User } = require('../models/index');

router.post('/', async(req, res) => {
    try {
        const newList = await ReadingList.create(req.body);
        res.json(newList);
    } catch (err) {
        next(err);
    }
})

router.put('/:id', middleware.findUserSession, async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const changedList = await ReadingList.findByPk(id);
        console.log(user.id)
        if (!changedList || changedList.userId !== user.id) {
            return res.status(404).json({ error: 'Reading list not found or unauthorized' });
        }
        changedList.readingState = true;
        await changedList.save();
        res.json(changedList);
    } catch (err) {
        next(err); 
    }
});

router.use(middleware.errorHandler);

module.exports = router;
