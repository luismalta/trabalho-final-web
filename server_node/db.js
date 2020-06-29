var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
    address: String,
    phone: String
}, { collection: 'usercollection' }
);

var itemSchema = new mongoose.Schema({
    name: String,
    categoty: String,
    price: Number,
}, { collection: 'item' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema, ItemSchema: itemSchema }