// const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
require('./config/mongoose')
const app = require('./app')

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
