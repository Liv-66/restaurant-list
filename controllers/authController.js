const User = require('../models/userModel');
const Restaurant = require('../models/restaurantModel');
const catchAsync = require('../config/catchAsync');
exports.restrictTo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findById(id);
  const userId = JSON.stringify(restaurant.userId);
  if (userId === JSON.stringify(req.user._id)) return next();
  req.flash('warning_msg', '你無法執行此動作。');
  res.redirect('/restaurants');
});
