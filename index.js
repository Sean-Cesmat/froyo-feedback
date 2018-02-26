var db = require('./models');
var express = require('express');
var bodyParser = ('body-parser');
var rowdy = require('rowdy-logger');

var app = express();

rowdy.begin(app);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.send("Welcome to the homepage!");
});


var server = app.listen(process.env.PORT || 3000, function() {
  rowdy.print();
});

module.exports = server;
