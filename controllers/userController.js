const passport = require('passport');
const User = require('../models/userModel');
const catchAsync = require('../config/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword)
    errors.push({ message: '所以欄位都是必填。' });
  if (password !== confirmPassword) errors.push({ message: '密碼不相符。' });
  if (await User.findOne({ email }))
    errors.push({ message: '這個E-mail已經註冊過。' });
  if (errors.length) {
    return res.render('signup', {
      errors,
      name,
      email,
    });
  }
  await User.create({
    name,
    email,
    password,
    confirmPassword,
  });
  req.flash('success_msg', '註冊成功！請重新登入。');
  res.redirect('/login');
});

exports.checkLoginForm = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email || !password) {
    errors.push({ message: '請輸入E-mail與密碼。' });
    return res.render('login', {
      errors,
      email,
    });
  }
  if (!(await User.findOne({ email }))) {
    errors.push({ message: '此E-mail尚未註冊。' });
    return res.render('login', {
      errors,
      email,
    });
  }
  next();
};

exports.login = passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', '你已經成功登出。');
  res.redirect('/login');
};

exports.isLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash('warning_msg', '請先登入才能使用！');
  res.redirect('/login');
};
