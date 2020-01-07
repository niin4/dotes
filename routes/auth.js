var passport = require('passport');
const User = require('../models/UserModel');

async function createUser(username) {
  return new User({
    username,
    created: Date.now()
  }).save()
}

async function findUser(username) {
  return await User.findOne({ username })
}

module.exports = (function () {
  var auth = require('express').Router();

  //auth routes
  auth.get('/google', passport.authenticate('google'));

  // This is where Google sends users once they authenticate with Google
  // Make sure this endpoint matches the "callbackURL" from step 4.2 and the "authorized redirect URI" from Step 3
  auth.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      console.log(req.user);

      // get JWT, give JWT, save JWT. If JWT exists, use that to login, otherwise require google again

      res.redirect('/');
    }
  );

  auth.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  return auth;
})();