const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected at: ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();
const users = require('./routes/users');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Port number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Users routes
app.use('/users', users);

// Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint.');
});

// Redirect everything else to main page
app.get('*', (req, res) => {
    res.redirect('/');
})

// Start server
app.listen(port, () => {
    console.log("Node started at " + port);
});