const Restaurant = require('../models/restaurantModel');

exports.getAll = (req, res) => {
  res.end('get all restaurants');
};

exports.createRestaurant = async (req, res, next) => {
  console.log(req.body);
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({
    status: 'success',
    data: restaurant,
  });
  next();
};
