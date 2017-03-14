'use strict';

const { DB, errHandler } = require('../db.js');
const prompt = require('prompt');

let list = [ 'Name', 'Address', 'City', 'State', 'PostalCode', 'PhoneNumber' ];

// Using prompt, ask the user the required fields
const createCustomer = () => {
  prompt.get(list, (err, resultObj) => {
    insertCustomer(resultObj);
    console.log(`\nCustomer ${resultObj.Name} created.\n`);
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
