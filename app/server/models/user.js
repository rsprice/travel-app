var db = require('../../../db/db.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// db.userSchema.pre('init', function(next, data) {
//   User.populate(data, {
//     path: 'favorites groupIds'
//   }, function(err, user) {
//     data = user;
//     next();
//   });
// });
var User = mongoose.model('User', db.userSchema);

// User.deepPopulate(users, 'groupIds.members', function (err, _users){

// });

module.exports = User;
