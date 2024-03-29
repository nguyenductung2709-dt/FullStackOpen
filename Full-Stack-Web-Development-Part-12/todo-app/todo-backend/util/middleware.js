const { getAsync, setAsync } = require('../redis/index');
const incrementTodoCounter = async (req, res, next) => {
    try {
        const currentCount = await getAsync('todo_counter') || 0;
        const newCount = parseInt(currentCount) + 1;
        await setAsync('todo_counter', newCount);
        next();
    } catch (error) {
        console.error('Error incrementing todo counter:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { incrementTodoCounter };
