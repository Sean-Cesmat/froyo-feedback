var db = require('../models');
var express = require('express');
var router = express.Router();
var isAdmin = require('../middleware/isAdmin');

router.route('/')
  .get(isAdmin, function(req, res) {
    db.profile.findAll({

    })
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
    var newStatus = 'out';
    if (req.body.status === 'on') {
      newStatus = 'in-rotation';
    }
    db.flavor.create({
      name: req.body.name,
      flavorType: req.body.flavorType,
      status: newStatus
    }).then(function(data) {
      req.flash('success', 'Your new flavor has been added!');
      res.redirect('/dashboard/flavors')
    });
  });
// End /dashboard '/flavors'

module.exports = router;
