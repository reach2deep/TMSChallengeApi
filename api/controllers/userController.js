var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/userModel');
var moment = require('moment');

// //POST route for updating data
// router.post('/', function (req, res, next) {
//   console.log(req.body);
//   //console.log(JSON.stringify(req.body.firstname));
//   //console.log(req.body.password);
//   if (req.body.username &&
//     req.body.password) {

//     var userData = {
//       username: req.body.username,
//       password: req.body.password,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       phoneNumber: req.body.phoneNumber
//     }

//     instance = User.create(userData, function (error, user) {
//       if (error) {
//         console.log("MANUAL " + error);
//         //return self.res.json(error);
//         return res.status(500).send(error);
//       //   return self.res.status(500).json({
//       //     status: 'error',
//       //     error: error.MongoError 
//       // });
//       } else {

//         User.find({ 'username': req.body.username })
//         .exec(function (error, user) {
//           if (error) {
//             return next(error);
//           } else {
//             if (user === null) {
//               var err = new Error('Not authorized! Go back!');
//               err.status = 400;
//               return next(err);
//             } else {
//               return res.send(user);
//             }
//           }
//         });
//         //req.session.userId = user._id;
//         //return res.redirect('/profile');
//       }
//     });

//   } 
// });

// router.get('/', function (req, res, next) {
//   console.log('body '+ req.body.userId);

//   if (req.body.userId) { {

//         User.find({ '_id': req.body.userId })
//         .exec(function (error, user) {
//           if (error) {
//             return next(error);
//           } else {
//             if (user === null) {
//               var err = new Error('Not authorized!!');
//               err.status = 400;
//               return next(err);
//             } else {
//               return res.send(user);
//             }
//           }
//         });       
//       } 
//   } 
// });

module.exports.register = function(req, res) {    
  console.log('Registering User');
  console.log(JSON.stringify(req.body));
  // var username = req.body.username;
  // var name = req.body.name || null;
   var password = req.body.password;
  if (req.body.username &&
    req.body.password) {

    var userData = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber
    };

  User.create({
      username: userData.username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber :userData.phoneNumber     
  }, function(err, user) {
      if (err) {
          console.log(err);
          res.status(400).json(err);
      } else {
          console.log('user created', user);
          res.status(201).json(user);
      }
  });
}
};

// GET User BY ID
module.exports.getUserDetailById = function(req, res) {
  var userId = req.params.userId;
  console.log('GET the User ID ' + userId);
  
  User
      .findById(userId)
      .exec(function(err, user) {
          var response = {
              status: 200,                           
              message: {
                success: true, 
                data:user
              }
          };
          if (err) {
              console.log("Error retreiving data");
              response.status = 500;
              response.message = {
                success: false,
                data : err
              }
          } else if (!user) {
              response.status = 400;
              response.message = {
                success: false,                
                  data: "User not found"
              };
          }
          res.status(response.status)
              .json( response.message);

      });
};

// TO UPDATE User
module.exports.updateUserDetailById = function(req, res) {
  var userId = req.params.userId;
  console.log('UPDATE the User ID ' + userId);
  User
      .findById(userId)
      .exec(function(err, user) {
          var response = {
              status: 200,
              message: user
          };
          if (err) {
              console.log("Error retreiving data");
              response.status = 500;
              response.message = err;
          } else if (!user) {
              response.status = 404;
              response.message = {
                  "message": "Item not found"
              };
          }
          if (response.status !== 200) {
              res.status(response.status)
                  .json(response.message);
          } else {
                  //user.password = req.body.password,
                  user.password = req.body.password,
                  user.firstName = req.body.firstName,
                  user.lastName = req.body.lastName,
                  user.phoneNumber = req.body.phoneNumber,
                  user.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss.000').toString() + 'Z',
                  user.modifiedBy = req.firstName,

                  user.save(function(err, updatedIncome) {
                      if (err) {
                          response.status = 500;
                          response.message = err;
                      } else {
                          response.status = 204;
                          response.message = 'Update success';
                          res.status(response.status)
                              .json(response.message);
                      }
                  });
          }
      });
};