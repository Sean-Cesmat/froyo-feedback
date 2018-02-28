var db = require('../models');
var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

router.route('/')
  .get(isLoggedIn, function(req, res) {
    db.flavor.findAll({order:['name']}).then(function(flavors) {
        db.profile.findOne({
          where: {userId: req.user.id}
        }).then(function(profile){
          res.render('profile/show', {flavors: flavors, profile: profile});

        })
    });

  })
  .put(function(req, res) {
    db.profile.update({
      topFlavor1: req.body.topFlavor1,
      topFlavor2: req.body.topFlavor2,
      topFlavor3: req.body.topFlavor3,
      topFlavor4: req.body.topFlavor4,
      topFlavor5: req.body.topFlavor5,
      topFlavor6: req.body.topFlavor6
    }, {
      where: {userId: req.user.id}
    }).then(function(data) {

    });
  });

// END '/' Route



module.exports = router;
