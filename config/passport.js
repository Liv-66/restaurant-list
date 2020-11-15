const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
const User = require('../models/userModel');
// const catchAsync = require('../config/catchAsync');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        let user = await User.findOne({ email });

        if (!user) return done(null, false, { message: 'E-mail錯誤。' });
        if (!password || !(await user.comparePassword(password, user.password)))
          return done(null, false, { message: '密碼錯誤。' });
        return done(null, user);
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'],
      },
      async (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json;
        const user = await User.findOne({ email });
        console.log('passport', user);
        if (user) return done(null, user);
        const randomPassword = Math.random.toString(36).slice(-8);
        const newUser = await User.create({
          name,
          email,
          password: randomPassword,
          confirmPassword: randomPassword,
        });
        return done(null, newUser);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
      done(err, user.toJSON());
    });
  });
};
