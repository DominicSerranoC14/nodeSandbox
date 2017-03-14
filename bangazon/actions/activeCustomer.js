'use strict';

const { DB, errHandler } = require('../db.js');
const prompt = require('prompt');

// Query the database and display all users
const showActiveCustomers = () => {
  console.log('Which customer will be active?');
  DB.each(`select customer_id, name from customers`, (err, {customer_id, name}) => {
    errHandler(err);
    console.log(`${customer_id}. ${name}`);
  }, captureActiveListener);
};

// Creates the prompt to capture the active listener
const captureActiveListener = () => {
  // Capture input from user and query the db to get the user
  prompt.get('$', (err, { $ }) => {
    DB.get(`select name from customers where customer_id = ${parseInt($)}`, (err, { name }) => {
      console.log(`\nWelcome ${name}!\n`);
      // Require in startMenu method here to avoid circular dep
      setTimeout(require('./menuOptions.js').startMenu, 2000);
    });
  });
};

module.exports = { showActiveCustomers };
