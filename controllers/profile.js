var db = require('../models');
var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var flash = require('connect-flash');
var async = require('async');

router.route('/')
  .get(isLoggedIn, function(req, res) {

    async.parallel({
      flavors: function(callback) {
        db.flavor.findAll({order:['name']}).then(function(flavors) {
          callback(null, flavors);
        }).catch(function(error) {
          console.log(error);
        });
      },
      profile: function(callback) {
        db.profile.findAll({
          where: {userId: req.user.id}
        }).then(function(profile) {
          callback(null, profile);
        }).catch(function(error) {
          console.log(error);
        });
      },
      favorites: function(callback) {
        db.favorites_users_flavors.findAll({
          where: {userId: req.user.id}
        }).then(function(favorites) {
          callback(null, favorites);
        }).catch(function(error) {
          console.log(error);
        });
      },
      likes: function(callback) {
        db.users_flavors.findAll({
          where: {userId: req.user.id}
        }).then(function(likes) {
          callback(null, likes);
        }).catch(function(error) {
          console.log(error);
        });
      },
      user: function(callback) {
        db.user.findById(req.user.id).then(function(user){
          callback(null, user);
        }).catch(function(error) {
          console.log(error);
        });
      }
    }, function(err, results) {
      res.render('profile/show', results);
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

      // Remove all flavor id's from the join table in the needToRemove Array
      needToRemove.forEach(function(flavorId) {
        db.favorites_users_flavors.destroy({
          where: {userId: req.user.id, flavorId: flavorId}
        }).then(function(data) {

        });
      });

      // Add all flavor id's from the join table in the needToRemove Array
      // Adds to join table for counting
      needToAdd.forEach(function(flavorId) {
        db.favorites_users_flavors.create({
          userId: req.user.id,
          flavorId: flavorId
        }).then(function(data) {

        });
      });

      // Keep track of exactly flavor profile in profile table
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
