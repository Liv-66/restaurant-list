const User = require('../models/userModel');

exports.login = (req, res) => {
  res.end('login');
};

exports.signup = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
  next();
};
