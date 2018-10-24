const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');

// Register route
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user.'})
        } else {
            res.json({success: true, msg: 'Added successfully..'})
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err || !user) {
            return res.json({success: 0, msg: 'Failed authentication'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.json({success: 0, msg: 'Wrong password'});
            }

            const token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 604800 // 1 week
            });

            return res.json({
                success: 1,
                msg: "Logged in successfully",
                token: 'JWT ' + token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
        });
    });
});

// Profile route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send({user: req.user})
});
 
module.exports = router;