'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');

// Connect to the database
const environment = process.env.NODE_ENV || 'development';
// Select development config setting
const configuration = require('./db/config.js')[environment];
const db = require('knex')(configuration);

app.set('view engine', 'pug');
app.use(express.static('public'));
// A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.urlencoded({extended: false}));

// Login routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', ({ body: {username, password} }, res) => {
  // Check for existing user
  db('users').where({ 'username': username })
  .first('username')
  .then((user) => {

    if (user) {
      //If user compare hashes
      console.log(user);
    } else {
      // If no user, throw error
      res.send({ err: 'No user found. Please sign in.' });
    };

  })
  .catch((err) => console.log(err.toString()));

  console.log('LOGIN', username, password);
  res.render('index');
});

// Register routes
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', ({body: {username, password}}, res) => {
  // Check users table to see if there is already a user saved with the same username
  db('users').where({ 'username': username })
  .first('username')
  .then((user) => {

    if (user) {
      // Send error message if user already exists
      res.render('register', {err: 'This user already exists.'})
    } else {
      // Hash password and create user
      // First function generates salt
      // **: passing it a rounds param will determine how many are generated before the final salt
      // Default rounds will be 10
      bcrypt.genSalt(10, (err, salt) => {
        // Now pass in the plaintext password and salt and generate a hash
        bcrypt.hash(password, salt, (err, hash) => {
          // Save user to database with hash as password
          db('users').insert({ username, password: hash })
          .then((result) => {
            // Send success msg if registered
            res.send('Successfully registered. Please log in.');
          })
          .catch((err) => {
            console.log(err.toString());
            res.send({ err: 'Oops, try again.' });
          });
        })
      })
    };


  })
  .catch((err) => console.log(err.toString()))

});

app.listen(3000, () => console.log('Listening on port 3000'));
