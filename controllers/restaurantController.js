const Restaurant = require('../models/restaurantModel');

exports.getAll = async (req, res, next) => {
  const restaurants = await Restaurant.find();
  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    data: restaurants,
  });
  next();
};

exports.getOne = async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: restaurant,
  });
  next();
};

exports.createRestaurant = async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({
    status: 'success',
    data: restaurant,
  });
  next();
};

exports.updataRestaurant = async (req, res, next) => {
  const newRestaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    status: 'success',
    data: newRestaurant,
  });
};
