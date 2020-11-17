const Restaurant = require('../models/restaurantModel');
const catchAsync = require('../config/catchAsync');

exports.getOverview = (req, res) => {
  res.status(200).render('home');
};

exports.login = (req, res) => {
  res.status(200).render('login');
};
exports.signup = (req, res) => {
  res.status(200).render('signup');
};

exports.getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find().lean();

  res.render('restaurants', { restaurants });
};
exports.getOne = async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findById(id).lean();

  res.render('detail', { restaurant });
};
exports.updateRestaurant = async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findById(id).lean();
  console.log(restaurant);
  res.render('edit', { restaurant });
};

exports.newRestaurant = (req, res) => {
  res.status(200).render('new');
};
