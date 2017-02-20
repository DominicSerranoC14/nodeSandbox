'use strict';

const environment = process.env.NODE_ENV || 'development';
// Select development config setting
const configuration = require('./knexfile.js')[environment];
const db = require('knex')(configuration);

// db is the connected database
// can pass in string of table
// Returns promise
db('students').select()
.then(function(res) {
  console.log(res);
})
.catch(function(error) {
  // Convert error object to string
  console.log(error.toString())
});
