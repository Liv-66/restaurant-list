const Restaurant = require('../models/restaurantModel');

exports.getAll = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    data: restaurants,
  });
};

exports.createRestaurant = async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({
    status: 'success',
    data: restaurant,
  });
  next();
};
