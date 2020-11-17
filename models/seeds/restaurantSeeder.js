const fs = require('fs')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const Restaurant = require('../restaurantModel')
const User = require('../userModel')

const restaurants = JSON.parse(
  fs.readFileSync(`${__dirname}/restaurantSeed.json`, 'utf-8')
)
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/userSeed.json`, 'utf-8')
)

const importData = async () => {
  try {
    await Restaurant.create(restaurants, { validateBeforeSave: false })
    await User.create(users, { validateBeforeSave: false })
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

const deleteData = async () => {
  try {
    await Restaurant.deleteMany()
    await User.deleteMany()
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
