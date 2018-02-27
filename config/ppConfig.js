var db = require('../models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// Passport serialize user
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

// Passport deserialize user
passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

// Setup local auth
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: {email: email}
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

module.exports = passport;
