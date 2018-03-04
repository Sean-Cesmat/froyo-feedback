var db = require('../models');
var express = require('express');
var router = express.Router();
var isAdmin = require('../middleware/isAdmin');
var async = require('async');

router.route('/')
  .get(isAdmin, function(req, res) {
    async.parallel({
      favoritesCount: function(callback) {
        var query = 'SELECT "flavorId", COUNT(*) ' +
                    'FROM favorites_users_flavors ' +
                    'GROUP BY "flavorId" ' +
                    'ORDER by COUNT(*) DESC;';
        db.sequelize.query(query).then(function(favoritesCount){
          callback(null, favoritesCount[0]);
        }).catch(function(error) {
          console.log(error);
        });
      },
      likesCount: function(callback) {
        var query = 'SELECT "flavorId", COUNT(*) ' +
                    'FROM users_flavors ' +
                    'GROUP BY "flavorId" ' +
                    'ORDER by COUNT(*) DESC;';
        db.sequelize.query(query).then(function(likesCount) {
          callback(null, likesCount[0]);
        }).catch(function(error) {
          console.log(error);
        });
      },
      flavorIdNameObj: function(callback) {
        var flavorIdNameObj = {};
        db.flavor.findAll().then(function(flavors) {
          flavors.forEach(function(flavor) {
            flavorIdNameObj[flavor.id] = flavor.name;
          });
          callback(null, flavorIdNameObj);
        }).catch(function(error) {
          console.log(error);
        });
      },
      topNonFat: function(callback) {
        var query = 'SELECT "flavorId","flavorType","name", COUNT(*) ' +
                    'FROM flavors ' +
                    'JOIN favorites_users_flavors ON flavors.id = favorites_users_flavors."flavorId" ' +
                    'WHERE flavors."flavorType" = \'NonFat\' ' +
                    'GROUP BY "flavorId", "flavorType", "name" ' +
                    'ORDER by COUNT(*) DESC ' +
                    'LIMIT 10;';
        db.sequelize.query(query).then(function(topNonFat) {
          callback(null, topNonFat[0]);
        }).catch(function(error) {
          console.log(error);
        });
      },
      topLowFat: function(callback) {
        var query = 'SELECT "flavorId","flavorType","name", COUNT(*) ' +
                    'FROM flavors ' +
                    'JOIN favorites_users_flavors ON flavors.id = favorites_users_flavors."flavorId" ' +
                    'WHERE flavors."flavorType" = \'LowFat\' ' +
                    'GROUP BY "flavorId", "flavorType", "name" ' +
                    'ORDER by COUNT(*) DESC ' +
                    'LIMIT 10;';
        db.sequelize.query(query).then(function(topLowFat) {
          callback(null, topLowFat[0]);
        }).catch(function(error) {
          console.log(error);
        });
      },
      topNSA: function(callback) {
        var query = 'SELECT "flavorId","flavorType","name", COUNT(*) ' +
                    'FROM flavors ' +
                    'JOIN favorites_users_flavors ON flavors.id = favorites_users_flavors."flavorId" ' +
                    'WHERE flavors."flavorType" = \'No Sugar Added\' ' +
                    'GROUP BY "flavorId", "flavorType", "name" ' +
                    'ORDER by COUNT(*) DESC ' +
                    'LIMIT 10;';
        db.sequelize.query(query).then(function(topNSA) {
          callback(null, topNSA[0]);
        }).catch(function(error) {
          console.log(error);
        });
      },
      topSorbet: function(callback) {
        var query = 'SELECT "flavorId","flavorType","name", COUNT(*) ' +
                    'FROM flavors ' +
                    'JOIN favorites_users_flavors ON flavors.id = favorites_users_flavors."flavorId" ' +
                    'WHERE flavors."flavorType" = \'Non-Dairy Sorbet\' ' +
                    'GROUP BY "flavorId", "flavorType", "name" ' +
                    'ORDER by COUNT(*) DESC ' +
                    'LIMIT 2;';
        db.sequelize.query(query).then(function(topSorbet) {
          callback(null, topSorbet[0]);
        }).catch(function(error) {
          console.log(error);
        });
      },
      topAlmondMilk: function(callback) {
        var query = 'SELECT "flavorId","flavorType","name", COUNT(*) ' +
                    'FROM flavors ' +
                    'JOIN favorites_users_flavors ON flavors.id = favorites_users_flavors."flavorId" ' +
                    'WHERE flavors."flavorType" = \'Almond Milk\' ' +
                    'GROUP BY "flavorId", "flavorType", "name" ' +
                    'ORDER by COUNT(*) DESC ' +
                    'LIMIT 10;';
        db.sequelize.query(query).then(function(topAlmondMilk) {
          callback(null, topAlmondMilk[0]);
        }).catch(function(error) {
          console.log(error);
        });
      }
    }, function(err, results) {
      // res.send(results);
      res.render('dashboard', results);
    });
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

router.route('/flavors/:id/edit')
  .get(isAdmin, function(req, res) {
    db.flavor.findById(req.params.id).then(function(flavor) {
      // res.send(flavors);
      res.render('flavors/edit', {flavor: flavor});
    });
  });
// End /dashboard '/flavors/:id/edit'

router.route('/flavors/:id')
  .put(function(req, res) {
    var newStatus = 'out';
    if (req.body.status === 'on') {
      newStatus = 'in-rotation';
    }
    db.flavor.update({
      name: req.body.name,
      flavorType: req.body.flavorType,
      status: newStatus
    }, {
      where: {id: req.params.id}
    }).then(function(data) {
      req.flash('success', req.body.name + ' has been updated!');
      res.send('');
    });
  })
  .delete(function(req, res) {
    db.flavor.findById(req.params.id).then(function(flavor) {
      db.flavor.destroy({
        where: {id: req.params.id}
      }).then(function(data) {
        req.flash('success', flavor.name + ' has been removed.');
        res.send('')
      });
    });
  });
// END /dashboard '/flavors/:id'


module.exports = router;
