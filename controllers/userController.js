const passport = require('passport');
const User = require('../models/userModel');
const catchAsync = require('../config/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
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
});

exports.login = passport.authenticate('local', {
  successRedirect: '/reataurants',
  failureRedirect: '/users/login',
});

exports.logout = (req, res) => {
  req.logout();
  // req.flash('success_msg', '你已經成功登出。');
  res.redirect('/users/login');
};

// exports.isLogedIn = async (req, res, next) => {
//   console.log(res.user);
//   try {
//     if (res.user) {
//       console.log('have user!');
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   // try {
//   //   if (req.cookies.jwt) {
//   //     const decoded = await promisify(jwt.verify)(
//   //       req.cookies.jwt,
//   //       process.env.JWT_SECRET
//   //     );
//   //     const currentUser = await User.findById(decoded.id);
//   //     if (!currentUser) return next();
//   //     if (currentUser.changePasswordAfter(decoded.iat)) return next();

//   //     // Pug => if user
//   //     res.locals.user = currentUser;
//   //     return next();
//   //   }
//   // } catch (err) {
//   //   return next();
//   // }
//   next();
// };
