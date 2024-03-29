const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const redisRouter = require('./routes/statistics'); // Assuming you named the file statistics.js

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/statistics', redisRouter);
app.use('/todos', todosRouter);

module.exports = app;
