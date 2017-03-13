'use strict';

const { DB, errHandler } = require('../db.js');
const newRL = require('../readline.js');
let RL;

// Query the database and display all users
const showActiveCustomers = () => {
  RL = newRL();
  activateRLListener();
  console.log('Which customer will be active?');
  DB.each(`select customer_id, name from customers`, (err, {customer_id, name}) => {
    errHandler(err);
    console.log(`${customer_id}. ${name}`);
  }, () => RL.prompt())
};

// Activate a line listener on the RL obj
const activateRLListener = () => {
  // Capture input from user and query the db to get the user
  RL.on('line', (line) => {
    DB.get(`select name from customers where customer_id = ${parseInt(line)}`, (err, { name }) => {
      console.log(`\nWelcome ${name}!\n`);
      RL.close();
      // Require in startMenu method here to avoid circular dep
      setTimeout(require('./menuOptions.js').startMenu, 2000);
    });
  });
};

module.exports = { showActiveCustomers };
