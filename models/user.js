const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        "type": "string"
    },
    email: {
        "type": "string",
        "required": true
    },
    "username": {
        "type": "string",
        "required": true
    },
    "password": {
        "type": "string",
        "required": true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) {
            console.log(err);
        }
        
        callback(null, isMatch);
    });
};