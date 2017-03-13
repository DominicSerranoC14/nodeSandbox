'use strict';

const { DB } = require('../db.js');
const readline = require('readline');
let RL;
let counter = 0;

const createCustomer = () => {
  RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'BANGAZON > '
  });
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
    console.log(`Customer ${newCustomer.name.a} created.`);
    // Require in startMenu method here to avoid circular dep
    setTimeout(require('./menuOptions.js').startMenu, 2000);
  } else {
    const vals = Object.values(newCustomer);
    RL.question(vals[counter].q, (a) => {
      vals[counter].a = a;
      counter++;
      customerQuestions();
    });
  };

};

const insertCustomer = ({ name, address, city, state, postal, phone }) => {
  // console.log(name, address, city, state, postal, phone);
};

module.exports = { createCustomer };
