module.exports = function(req, res, next) {
  next();
  // if (!req.user || req.user.userType !== 'admin') {
  //   req.flash('error', 'You must be logged in to access that page!');
  //   res.redirect('/admin');
  //   // res.send(req.user.userType);
  // } else if (req.user.userType === 'admin') {
  //   next();
  //   console.log('this is an admin');
  // }
};
