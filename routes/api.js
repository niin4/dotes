const passport = require('passport');
const UserModel = require('../models/UserModel');

module.exports = (function() {
  const api = require('express').Router();

  api.put('/user', passport.authenticate('jwt', { session: false }),
    function(req, res) {
      console.log(req.body);
      if (!req.body || !req.body.name) return res.status(400).send('Missing update data');
      UserModel.findOneAndUpdate({googleId: req.user.userFromDb.googleId}, {name: req.body.name}, {new: true}, function(err, doc) {
        if (err) {
          return res.status(404).send('update failed');
        } else {
          return res.status(200).send(doc);
        }
      });
    });

  return api;
})();
