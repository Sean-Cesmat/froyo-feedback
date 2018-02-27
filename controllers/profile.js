var db = require('../models');
var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

router.route('/')
  .get(isLoggedIn, function(req, res) {
    res.render('profile/show');
  });

// END '/' Route



module.exports = router;
