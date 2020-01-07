const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(app, connector) {
  const module = {};

  // http://gregtrowbridge.com/node-authentication-with-google-oauth-part1-sessions/
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((userDataFromCookie, done) => {
    done(null, userDataFromCookie);
  });

  // Set up passport strategy
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['email'],
    },
    // This is a "verify" function required by all Passport strategies
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    },
  ));

  app.use(passport.initialize());
  app.use(passport.session());

  return module;
};
