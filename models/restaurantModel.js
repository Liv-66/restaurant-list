const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入餐廳名稱。'],
  },
  photo: {
    type: String,
    default: 'restaurant-default.jpg',
  },
  description: String,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: true,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
