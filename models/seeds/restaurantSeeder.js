const fs = require('fs');
const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const Restaurant = require('../restaurantModel');
const User = require('../userModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('mongodb connected!'));

const restaurants_for_user_1 = JSON.parse(
  fs.readFileSync(`${__dirname}/restaurantSeed_for_user_1.json`, 'utf-8')
);
const restaurants_for_user_2 = JSON.parse(
  fs.readFileSync(`${__dirname}/restaurantSeed_for_user_2.json`, 'utf-8')
);
const restaurants = JSON.parse(
  fs.readFileSync(`${__dirname}/restaurantSeed.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/userSeed.json`, 'utf-8')
);

const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    const user_1 = await User.findOne({ email: 'user1@example.com' });
    const user_2 = await User.findOne({ email: 'user2@example.com' });
    restaurants_for_user_1.forEach((el) => {
      el.userId = mongoose.Types.ObjectId(user_1._id);
    });
    restaurants_for_user_2.forEach((el) => {
      el.userId = mongoose.Types.ObjectId(user_2._id);
    });
    await Restaurant.create(restaurants_for_user_1, {
      validateBeforeSave: false,
    });
    await Restaurant.create(restaurants_for_user_2, {
      validateBeforeSave: false,
    });
    await Restaurant.create(restaurants, {
      validateBeforeSave: false,
    });
    await console.log('import done');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    console.log('delete start');
    await Restaurant.deleteMany();
    await User.deleteMany();
    console.log('delete done');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
