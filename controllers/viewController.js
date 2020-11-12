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

exports.getRestaurants = (req, res) => {
  res.status(200).render('restaurants');
};
exports.newRestaurant = (req, res) => {
  res.status(200).render('new');
};
