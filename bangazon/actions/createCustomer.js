'use strict';

const { DB, errHandler } = require('../db.js');
const prompt = require('prompt');
const list = require('../promptSchema/createCustomer.js');

const createCustomer = () => {
  console.log(`\nPlease enter the following information to create a new customer account.\n`);

  // Using prompt, ask the user the required fields
  prompt.get(list, (err, resultObj) => {
    console.log(`\nCustomer account for ${resultObj.Name} created!\n`);
    // Insert the new customer into the db
    insertCustomer(resultObj);
    // Store the newly created customer as the currentUser
    process.env.CURRENT_USER = resultObj.Name;
    // Require in startMenu method here to avoid circular dep
    setTimeout(require('./menuOptions.js').startMenu, 2000);
  })
};


// Insert the customer object into the db
const insertCustomer = ({ Name, Address, City, State, PostalCode, PhoneNumber }) => {
  DB.run(`insert into customers values (
    null, "${Name}", "${Address}",
    "${City}", "${State}",
    "${PostalCode}", "${PhoneNumber}"
  )`, errHandler)
};

module.exports = { createCustomer };
