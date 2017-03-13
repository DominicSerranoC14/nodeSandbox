'use strict';

const { DB, errHandler } = require('../db.js');

let p = require('prompt');

let list = [ 'Name', 'Address', 'City',
  'State', 'PostalCode', 'PhoneNumber' ];

const createCustomer = () => {
  p.get(list, (err, result) => {
    insertCustomer(result);
    console.log(`\nCustomer ${result.Name} created.\n`);
    // Require in startMenu method here to avoid circular dep
    setTimeout(require('./menuOptions.js').startMenu, 2000);
  })
};

const insertCustomer = ({ Name, Address, City, State, PostalCode, PhoneNumber }) => {
  DB.run(`insert into customers values (
    null, "${Name}", "${Address}",
    "${City}", "${State}",
    "${PostalCode}", "${PhoneNumber}"
  )`, errHandler)
};

module.exports = { createCustomer };
