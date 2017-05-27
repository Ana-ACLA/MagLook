var express = require('express');
var passport = require('passport');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

var env = {
  AUTH0_CLIENT_ID: "ZotAbX3ilerarKmqutF7w4QUdXGYFNL8",
  AUTH0_DOMAIN: "maglook.auth0.com",
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', ensureLoggedIn, function(req, res) {
  res.render('user', { user: req.user });
});
// Render the login template
router.get('/login',
  function(req, res){
    res.render('login', { env: process.env });
  });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { 
  	failureRedirect: '/logout'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });

module.exports = router;
