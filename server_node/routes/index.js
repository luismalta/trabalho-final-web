var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST to Add User Service */
router.post('/createUser', function (req, res) {
  console.log(req);
  console.log('aaa');
  var db = require("../db");
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var admin = req.body.admin;
  var address = req.body.address;
  var phone = req.body.phone;

  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var user = new Users({ name: name, email: email, password: password, admin: admin, address: address, phone: phone });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("User saved");
      }
  });
});

/* GET userlist page. */
router.post('/login', function(req, res) {
  console.log(req.body)
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({'email': req.body.email, 'password': req.body.password}, function(err, result){
    if (err) throw err;
    console.log(result)
    res.send(result)
  })
});

module.exports = router;
