const passport = require('passport');
const jwt = require('jsonwebtoken');

function signToken(user) {
  return jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: 604800,
  });
}

module.exports = (function() {
  const auth = require('express').Router();

  // auth routes
  auth.get('/google', passport.authenticate('google'));

  // This is where Google sends users once they authenticate with Google
  // Make sure this endpoint matches the "callbackURL" from step 4.2 and the "authorized redirect URI" from Step 3
  auth.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      const token = signToken(req.user.userFromDb);
      console.log(req.user);
      let redirect = '/login?token=' + token;
      if (req.user.new) {
        redirect = '/register?token=' + token;
      }
      if (process.env.mode && process.env.mode === 'DEV') {
        if (req.user.new) {
          redirect ='http://localhost:5051/register?token=' + token;
        } else {
          redirect = 'http://localhost:5051/login?token=' + token;
        }
      }
      return res
        .status(200)
        .cookie('jwt', token, {
          httpOnly: true,
        })
        .redirect(redirect);
    },
  );

  auth.post('/jwt', passport.authenticate('jwt', { session: false }),
    function(req, res) {
      const token = signToken(req.user.userFromDb);
      console.log(req.user);
      return res
        .status(200)
        .cookie('jwt', token, {
          httpOnly: true,
        })
        .send({token});
    });

  auth.get('/logout', function(req, res) {
    req.logout();
    if (process.env.mode && process.env.mode === 'DEV') {
      res.redirect('http://localhost:5051');
    } else {
      res.redirect('/');
    }
  });

  return auth;
})();
