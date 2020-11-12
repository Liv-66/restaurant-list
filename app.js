const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const usePassport = require('./config/passport');

const userRouter = require('./routes/userRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const viewRouter = require('./routes/viewRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

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

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use('/', viewRouter);
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);

app.use((req, res, next) => {
  // console.log('req: ', req.body);
  // console.log('res: ', res.locals.user);
  next();
});

module.exports = app;
