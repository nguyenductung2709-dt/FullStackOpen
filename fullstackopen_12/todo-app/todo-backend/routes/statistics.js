const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis/index');

router.get('/', async (req, res) => {
    console.log(await getAsync('todo_counter'))
    try {
        const todoCount = await getAsync('todo_counter') || 0;

        const statistics = {
            todo_counter: todoCount
        };

        res.json(statistics);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
