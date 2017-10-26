'use strict';

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
module.exports = mongoose.model('User', new Schema({
  name: String,
  password: String,
  email: String
}))