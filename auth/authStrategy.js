const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/UserModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(app) {
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
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // check if user exists
      UserModel.findOne({googleId: profile.id}, function(err, user) {
        if (err) return (err, null);
        if (!user) {
          UserModel.create({
            googleId: profile.id,
            name: '',
            created: new Date(),
          }, function(err, newUser) {
            if (err) return (done(err, null));
            return done(null, {userFromDb: newUser, new: true});
          });
        } else {
          return done(null, {userFromDb: user, new: false});
        }
      });
    },
  ));

  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    UserModel.findOne({googleId: jwt_payload.user.googleId}, function(err, user) {
      if (err) {
        console.log('error')
        console.log(err)
        return done(err, null);
      }
      if (user) {
        done(null, {userFromDb: user, new: false});
      } else {
        return done(null, null);
      }
    });
  }));


  app.use(passport.initialize());
  app.use(passport.session());

  return module;
};
