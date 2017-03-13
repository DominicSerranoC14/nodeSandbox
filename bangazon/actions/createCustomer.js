'use strict';

const { DB, errHandler } = require('../db.js');
const newRL = require('../readline.js');
let RL;
let counter = 0;

const createCustomer = () => {
  RL = newRL();
  customerQuestions();
};

const newCustomer = {
  name: { q: 'Enter customer name: ', a: null },
  address: { q: 'Enter street address: ', a: null },
  city: { q: 'Enter city: ', a: null },
  state: { q: 'Enter state: ', a: null },
  postal: { q: 'Enter postal code: ', a: null },
  phone: { q: 'Enter phone number: ', a: null }
};

const customerQuestions = () => {

  if (counter > 5) {
    insertCustomer(newCustomer);
    // Close prompt before executing startMenu
    RL.close();
    console.log(`\nCustomer ${newCustomer.name.a} created.\n`);
    // Require in startMenu method here to avoid circular dep
    setTimeout(require('./menuOptions.js').startMenu, 2000);
  } else {
    // Store the values of newCustomer
    const vals = Object.values(newCustomer);
    // Ask a question and assign the answer to the corresponding object
    RL.question(vals[counter].q, (a) => {
      vals[counter].a = a;
      counter++;
      customerQuestions();
    });
  };

};

const insertCustomer = ({ name, address, city, state, postal, phone }) => {
  DB.run(`insert into customers values (
    null, "${name.a}", "${address.a}",
    "${city.a}", "${state.a}",
    "${postal.a}", "${phone.a}"
  )`, errHandler)
};

module.exports = { createCustomer };
