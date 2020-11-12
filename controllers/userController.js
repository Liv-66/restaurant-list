const passport = require('passport');
const User = require('../models/userModel');

exports.signup = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  console.log(newUser);
  res.status(201).json({
    status: 'success',
    data: newUser,
  });
  next();
};

exports.login = passport.authenticate('local', {
  successRedirect: '/reataurants',
  failureRedirect: '/users/login',
});

exports.logout = (req, res) => {
  req.logout();
  // req.flash('success_msg', '你已經成功登出。');
  res.redirect('/users/login');
};
