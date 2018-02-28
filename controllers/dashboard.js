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
      // res.send(flavors);
      res.render('flavors', {flavors: flavors});
    });
  })
  .post(function(req, res) {
    console.log('hit the post flavor route');
    db.flavor.create({
      name: req.body.name,
      flavorType: req.body.flavorType,
      status: req.body.status
    }).then(function(data) {
      res.redirect('/dashboard/flavors')
    });
  });
// End /dashboard '/flavors'

module.exports = router;
