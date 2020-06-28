var mongoose = require('mongoose');
const { Double } = require('mongodb');
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
    category: String,
    price: Number
}, { collection: 'itemcollection' }
);

var dailySchema = new mongoose.Schema({
    date: Date,
    meat: Array,
    rice: Array,
    plus: Array,
}, { collection: 'dailycollection' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema, ItemSchema: itemSchema, DailySchema: dailySchema }