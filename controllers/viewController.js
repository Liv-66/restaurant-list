const Restaurant = require('../models/restaurantModel');
const catchAsync = require('../config/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.find().lean();

  res.render('home', { restaurants });
});

exports.login = (req, res) => {
  res.status(200).render('login');
};
exports.signup = (req, res) => {
  res.status(200).render('signup');
};

exports.getRestaurants = catchAsync(async (req, res) => {
  console.log(req.user._id);
  const restaurants = await Restaurant.find({
    userId: req.user._id,
  }).lean();
  console.log(restaurants);

  res.render('restaurants', { restaurants });
});
exports.getOne = catchAsync(async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findById(id).lean();

  res.render('detail', { restaurant });
});
exports.updateRestaurant = catchAsync(async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findById(id).lean();
  res.render('edit', { restaurant });
});

exports.newRestaurant = (req, res) => res.status(200).render('new');
