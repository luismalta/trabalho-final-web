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
  user.save(function (err, result) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log(result);
          res.send(result);
      }
  });
});

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

router.post('/getUser', function(req, res) {
  console.log(req.body)
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({'_id': req.body.id}, function(err, result){
    if (err) throw err;
    console.log(result)
    res.send(result)
  })
});


router.post('/updateUser', function(req, res) {
  console.log(req.body)
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.update({'_id': req.body._id}, {$set: {'name': req.body.name, 'email': req.body.email, 'password': req.body.password, 'address':req.body.address, 'phone': req.body.phone}}, function(err, result){
    if (err) throw err;
    console.log(result)
    res.send(result)
  })
});

router.post('/createItem', function (req, res) {
  console.log(req);
  console.log('aaa');
  var db = require("../db");

  var Item = db.Mongoose.model('itemcollection', db.ItemSchema, 'itemcollection');
  var item = new Item({ name: req.body.name, category: req.body.category, price: req.body.price });
  item.save(function (err, result) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          res.send(result)
      }
  });
});

router.get('/getMeat', function(req, res) {
  console.log(req.body)
  var db = require("../db");
  var Item = db.Mongoose.model('itemcollection', db.ItemSchema, 'itemcollection');
  Item.find({'category': 'Carne'}, function(err, result){
    if (err) throw err;
    console.log(result)
    res.send(result)
  })
});

router.get('/getRice', function(req, res) {
  console.log(req.body)
  var db = require("../db");
  var Item = db.Mongoose.model('itemcollection', db.ItemSchema, 'itemcollection');
  Item.find({'category': 'Principal'}, function(err, result){
    if (err) throw err;
    console.log(result)
    res.send(result)
  })
});

router.get('/getPlus', function(req, res) {
  console.log(req.body)
  var db = require("../db");
  var Item = db.Mongoose.model('itemcollection', db.ItemSchema, 'itemcollection');
  Item.find({'category': 'Acompanhamentos'}, function(err, result){
    if (err) throw err;
    console.log(result)
    res.send(result)
  })
});

router.post('/createDaily', function (req, res) {
  console.log(req);
  console.log('aaa');
  var db = require("../db");

  var Daily = db.Mongoose.model('dailycollection', db.DailySchema, 'dailycollection');
  var daily = new Daily({ date: new Date(), meat: req.body.meat, rice: req.body.rice, plus: req.body.plus });
  daily.save(function (err, result) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          res.send(result)
      }
  });
});

router.post('/sale', function(req, res, next) {
  var db = require("../db");
  var Sale = db.Mongoose.model('salecollection', db.SaleSchema);
  var sale = new Sale({saleLines: req.body.saleLines, user: req.body.user, totalPrice: req.body.totalPrice, date: req.body.date, received: req.body.received})
  sale.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Sale saved");
          res.send({status: "Sale Saved"})
      }
  });
});

module.exports = router;
