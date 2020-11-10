const express = require('express');
const morgan = require('morgan');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

module.exports = app;
