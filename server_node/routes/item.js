var express = require('express');
var router = express.Router();

/* GET meal listing. */
router.get('/:category', function(req, res, next) {
    var category = req.params.category;
    var db = require("../db");
    var Drink = db.Mongoose.model('itemcollection', db.ItemSchema);
    Drink.find({'category': category}, function(err, result){
      if (err) throw err;
      console.log(result)
      res.send(result)
    })
});



module.exports = router;
