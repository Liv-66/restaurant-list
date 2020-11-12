const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const usePassport = require('./config/passport');

const userRouter = require('./routes/userRouter');
const restaurantRouter = require('./routes/restaurantRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);
usePassport(app);

app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);

module.exports = app;
