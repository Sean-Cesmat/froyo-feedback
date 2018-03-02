var db = require('../models');
var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

router.route('/')
  .get(isLoggedIn, function(req, res) {
    db.flavor.findAll({order:['name']}).then(function(flavors) {
      db.favorites_users_flavors.findAll({
        where: {userId: req.body.userId}
      }).then(function(favorites) {
        db.users_flavors.findAll({
          where: {userId: req.body.userId}
        }).then(function(likes) {
          res.render('profile/show', {flavors: flavors, favorites: favorites, likes: likes});
      });
      });
    });

  })
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

      var checkedFlavs = [];
      for (var x in req.body) {
        if (req.body[x] === 'on') {
          checkedFlavs.push(x);
        }
      }

      checkedFlavs.forEach(function(flavorId, id){
        db.users_flavors.findOrCreate({
          where: {flavorId: parseInt(flavorId), userId: req.user.id},
          defaults: {flavorId: parseInt(flavorId), userId: req.user.id}
        }).spread(function(newFlavor, wasCreated) {
          //Add the relationship between the post and tag in the posts_tags table

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


    });

  });

// END '/' Route



module.exports = router;
