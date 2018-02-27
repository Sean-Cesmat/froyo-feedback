require('dotenv').config();
var flash = require('connect-flash');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var isLoggedIn = require('./middleware/isLoggedIn');
//var rowdy = require('rowdy-logger');

var app = express();

// rowdy.begin(app);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  successFlash: 'You have loggin in!',
  failureRedirect: '/',
  failureFlash: "Invalid username and/or password"
}));

app.get('/logout', function(req, res) {
  req.logout();
  console.log('Logged Out');
  req.flash('success', 'You have logged out!');
  res.redirect('/');
});

app.use('/profile', require('./controllers/profile'));
app.use('/signup', require('./controllers/signup'));


var server = app.listen(process.env.PORT || 3000, function() {
  //rowdy.print();
});

module.exports = server;
