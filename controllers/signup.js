var db = require('../models');
var express = require('express');
var passport = require('../config/ppConfig');
var router = express.Router();


router.post('/', function(req, res) {
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // userType: 'admin'
    }
  }).spread(function(user, created) {
    if (created) {
      db.profile.create({
        userId: user.id,
        emailNotify: 'no'
      }).then(function(data) {

      });

      // User was created
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // Email already exists in db
      req.flash('error', 'Email ready exists');
      res.redirect('/signup');
    }
  }).catch(function(error) {
    req.flash('error', error.message);
    res.redirect('/signup');
  });
});


module.exports = router;
