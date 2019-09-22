const mongoose = require("../connection");
const passportLocalMongoose = require("passport-local-mongoose");
//SCHEMA SETUP
var userSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  //The following line has to come after schema definition
  userSchema.plugin(passportLocalMongoose);
  // Export module
  module.exports = mongoose.model('User', userSchema);