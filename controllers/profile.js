var db = require('../models');
var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var flash = require('connect-flash');

router.route('/')
  .get(isLoggedIn, function(req, res) {
    db.flavor.findAll({order:['name']}).then(function(flavors) {
      db.profile.findAll({
        where: {userId: req.user.id}
      }).then(function(profile) {
        db.favorites_users_flavors.findAll({
          where: {userId: req.user.id}
        }).then(function(favorites) {
          db.users_flavors.findAll({
            where: {userId: req.user.id}
          }).then(function(likes) {
            db.user.findById(req.user.id).then(function(user){

                res.render('profile/show', {flavors: flavors, favorites: favorites, likes: likes, profile: profile, user: user});

            }); //END THEN


          });
        });
      })
    });
  }) // END GET
  .put(function(req, res) {

    db.favorites_users_flavors.findAll({
      where: {userId: req.user.id},
    }).then(function(favorites) {
      var topFlavors =[];
      var curFlavors = [];
      topFlavors.push(parseInt(req.body.topFlavor1));
      topFlavors.push(parseInt(req.body.topFlavor2));
      topFlavors.push(parseInt(req.body.topFlavor3));
      topFlavors.push(parseInt(req.body.topFlavor4));
      topFlavors.push(parseInt(req.body.topFlavor5));
      topFlavors.push(parseInt(req.body.topFlavor6));

      favorites.forEach(function(favorite){
        curFlavors.push(favorite.flavorId);
      });

      var needToRemove = [];
      var needToAdd = [];

      // First find ones to remove
      for (var i = 0; i < curFlavors.length; i++) {
        if(topFlavors.indexOf(curFlavors[i]) === -1) {
            needToRemove.push(curFlavors[i]);
        }
      }

      // Find the ones to add
      for (var i = 0; i < topFlavors.length; i++) {
        if(curFlavors.indexOf(topFlavors[i]) === -1) {
            needToAdd.push(topFlavors[i]);
        }
      }

      needToRemove.forEach(function(flavorId) {
        db.favorites_users_flavors.destroy({
          where: {userId: req.user.id, flavorId: flavorId}
        }).then(function(data) {

        });
      });

      needToAdd.forEach(function(flavorId) {
        db.favorites_users_flavors.create({
          userId: req.user.id,
          flavorId: flavorId
        }).then(function(data) {

        });
      });

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

      // Grab all of the currently "liked" flavors out of req.body
      // Then add them to the array checkedFlavs
      var checkedFlavs = [];
      for (var x in req.body) {
        if (req.body[x] === 'on') {
          checkedFlavs.push(x);
        }
      }

      // Remove all of the users old "liked" flavors
      // Then Add all of the currently "liked" flavors
      db.users_flavors.destroy({
        where: {userId: req.user.id}
      }).then(function() {
        checkedFlavs.forEach(function(flavorId, id){
          db.users_flavors.findOrCreate({
            where: {flavorId: parseInt(flavorId), userId: req.user.id},
            defaults: {flavorId: parseInt(flavorId), userId: req.user.id}
          }).spread(function(newFlavor, wasCreated) {

          });
        }); // END forEach
      });
      req.flash('success', 'Your favorites have been updated!');
      res.send('');
    }); // Ending of the .then of db.favorites_users_flavors
  }); // END PUT

// END '/' Route



module.exports = router;
