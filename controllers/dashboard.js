var db = require('../models');
var express = require('express');
var router = express.Router();
var isAdmin = require('../middleware/isAdmin');

router.route('/')
  .get(isAdmin, function(req, res) {
    var query = 'SELECT "flavorId", COUNT(*) ' +
                'FROM favorites_users_flavors ' +
                'GROUP BY "flavorId" ' +
                'ORDER by COUNT(*) DESC;';
    db.sequelize.query(query).then(function(favoritesCount) {
      // res.send(favoritesCount)
      var flavorIdNameObj = {};

      var query = 'SELECT "flavorId", COUNT(*) ' +
                  'FROM users_flavors ' +
                  'GROUP BY "flavorId" ' +
                  'ORDER by COUNT(*) DESC;';
      db.sequelize.query(query).then(function(likesCount) {

        db.flavor.findAll().then(function(flavors) {

          flavors.forEach(function(flavor) {
            flavorIdNameObj[flavor.id] = flavor.name;
          });
          // res.send(favoritesCount[0]);
          res.render('dashboard', {
            favoritesCount: favoritesCount[0],
            likesCount: likesCount[0],
            flavors: flavors,
            flavorIdNameObj: flavorIdNameObj
          });
        }).catch(function(error) {
            console.log(error);
          });;
      }).catch(function(error) {
          console.log(error);
        });;
    }).catch(function(error) {
        console.log(error);;
      });;
  });

// END /dashboard '/' route

router.route('/flavors')
  .get(isAdmin, function(req, res) {
    var query = 'SELECT * ' +
                'FROM flavors ' +
                'ORDER by name;';
    db.sequelize.query(query).then(function(flavors) {
      // res.send(flavors);
      res.render('flavors/flavors', {flavors: flavors[0]});
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
