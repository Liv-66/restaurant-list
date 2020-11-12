const passport = require('passport');
const User = require('../models/userModel');

exports.login = passport.authenticate('local', {
  successRedirect: '/reataurants',
  failureRedirect: '/users/login',
});

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
