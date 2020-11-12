const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
// const catchAsync = require('../config/catchAsync');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ email });

        if (!user) return done(null, false, { message: 'E-mail錯誤。' });
        if (!password || !(await user.comparePassword(password, user.password)))
          return done(null, false, { message: '密碼錯誤。' });
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
