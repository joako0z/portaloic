var express = require('express');
var router = express.Router();
var controllers = require ('.././controllers');
var passport = require('passport');
var AuthMiddleware = require('.././middleware/auth');

/* GET home page. */
router.get('/', controllers.HomeController.index);

//routes de usuario
router.get('/auth/signup', controllers.UserController.getSignUp);
router.post('/auth/signup', controllers.UserController.postSignUp);
router.get('/auth/signin', controllers.UserController.getSignIn);
router.post('/auth/signin', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect:'/auth/signin',
  failureFlash: true
}));
router.get('/auth/logout', controllers.UserController.logout);
router.get('/users/panel', AuthMiddleware.isLogged ,controllers.UserController.getUserPanel);

module.exports = router;
