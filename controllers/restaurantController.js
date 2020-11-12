const Restaurant = require('../models/restaurantModel');
const catchAsync = require('../config/catchAsync');

exports.getAll = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find();
  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    data: restaurants,
  });
  next();
});

exports.getOne = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: restaurant,
  });
  next();
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({
    status: 'success',
    data: restaurant,
  });
  next();
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
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
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.status(204).json({
    statue: 'success',
  });
});
