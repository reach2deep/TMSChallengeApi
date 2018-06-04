var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/userModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());


// // GET route after registering
// router.post('/', function (req, res, next) {
//     console.log("login " + JSON.stringify(req.body));
//     if (req.body.login && req.body.password) {
//         console.log("login " + req.body.login);
//         console.log("password " + req.body.password);
        
//           User.find({ 'username': req.body.login , 'password': req.body.password })
//           .exec(function (error, user) {
//             if (error) {
//               console.log('error');
//               return next(error);
//             } else {
//                 if (isEmptyObject(user)) {
//                   // There are no queries.
//                   var err = new Error('Not authorized! Go back!');
//                   err.status = 400;
//                   return res.send(err);
//                 } else {
//                   // There is at least one query,
//                   // or at least the query object is not empty.
//                   console.log(user);
//                 console.log('result');
//                 return res.send(user);
//                 }
//             }
//           });
//       } else {
//         var err = new Error('All fields required.');
//         console.log('All fields required.');
//         err.status = 400;
//         return next(err);
//       }
// });

// // GET for logout logout
// router.get('/logout', function (req, res, next) {
//   if (req.session) {
//     // delete session object
//     req.session.destroy(function (err) {
//       if (err) {
//         return next(err);
//       } else {
//         return res.redirect('/');
//       }
//     });
//   }
// });

// function isEmptyObject(obj) {
//     for (var key in obj) {
//       if (Object.prototype.hasOwnProperty.call(obj, key)) {
//         return false;
//       }
//     }
//     return true;
//   }




module.exports.login = function(req, res) {

    console.log('Logging in User', req.body);

    var username = req.body.username;
    var password = req.body.password;


    User.findOne({
        username: username
    }).exec(function(err, user) {
        if (err) {
            console.log('aaa ' + err);
            res.status(400).json(err);
        } else {            
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log('User found ', user);
                var token = jwt.sign({
                        username: user.username
                    },
                    's3cr3t', {
                        expiresIn: 3600
                    }
                );
                res.status(201).json({
                    success: true,
                    token: token,
                    data : user._id
                });
            } else {
                console.log('Unauthorized');
                res.status(401).json('Unauthorized');
            }

        }
    });
};


//module.exports = router;