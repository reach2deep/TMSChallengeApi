var express = require('express');
var router = express.Router();

var ctrlAuth = require('../controllers/authController');
var ctrlUser = require('../controllers/userController');

//Register Routes
router
    .route('/user/register')
    .post(ctrlUser.register); // to create new user

//Authentication Routes
router
    .route('/auth/login')
    .post(ctrlAuth.login); // to login

//User Routes
router
    .route('/user/:userId')
    .get(ctrlUser.getUserDetailById) // get user by Id
    .put(ctrlUser.updateUserDetailById); // to update user

module.exports = router;