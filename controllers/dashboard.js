var db = require('../models');
var express = require('express');
var router = express.Router();
var isAdmin = require('../middleware/isAdmin');

router.route('/')
  .get(isAdmin, function(req, res) {
    res.render('dashboard')
  });

// END /dashboard '/' route

router.route('/flavors')
  .get(isAdmin, function(req, res) {
    db.flavor.findAll().then(function(flavors) {
      res.render('flavors', {flavors: flavors});
    });
  })
  .post(function(req, res) {

  });
// End /dashboard '/flavors'

module.exports = router;
