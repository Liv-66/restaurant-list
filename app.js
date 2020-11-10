const express = require('express');
const path = require('path');
const morgan = require('morgan');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/users', userRouter);

module.exports = app;
