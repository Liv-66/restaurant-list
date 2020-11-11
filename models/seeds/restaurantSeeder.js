if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const Restaurant = require('../restaurantModel');
const User = require('../userModel');
const bcrypt = require('bcryptjs');

const SEED_USER = {
  name: 'Loulou',
  email: 'lou@example.com',
  password: 'aaa',
};

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      return Promise.all(
        Array.from({ length: 10 }, (_, i) =>
          Todo.create({ name: `name-${i}`, userId })
        )
      );
    })
    .then(() => {
      console.log('done');
      process.exit();
    });
});
