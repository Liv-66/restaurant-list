const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const usePassport = require('./config/passport')

const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const restaurantRouter = require('./routes/restaurantRouter')
const viewRouter = require('./routes/viewRouter')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(express.json({ limit: '10kb' }))
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb'
  })
)
app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use('/', viewRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/restaurants', restaurantRouter)

module.exports = app
