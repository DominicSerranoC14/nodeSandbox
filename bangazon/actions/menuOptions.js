'use strict';

const { createCustomer } = require('./createCustomer.js');
const { showActiveCustomers } = require('./activeCustomer.js');
const { getPaymentOptions } = require('./paymentOption.js');
const { determineIfUnpaidOrder } = require('./createOrder');
const { determineIfUnpaidOrderForCompletion } = require('./completeOrder');
// prompt.start() is not needed, require seems to activate it
const prompt = require('prompt');
const { red } = require('colors/safe');
// Add custom message and delimiter
prompt.message = red('BANGAZON');
prompt.delimiter = ' ';
// Set to 0 to avoid querying for undefined
process.env.CURRENT_ORDER_ID = 0;
process.env.CURRENT_USER_ID = 0;


// Display startMenu and activates prompt and main switch statement
const startMenu = () => {
  let user = process.env.CURRENT_USER;
console.log(`
${(user) ? `Welcome ${user}! What would you like to do?\n` : '' }
1. Create a customer account
2. Choose active customer
3. Create a payment option
4. Add product to shopping cart
5. Complete an order
6. See product popularity
7. Leave Bangazon!

Please enter your selection (numbers only).
`);

  prompt.get('$', (err, { $ }) => {
    switch(parseInt($)) {
      case 1:
        // 1. Create new customer
        createCustomer();
        break;
      case 2:
        // 2. Choose active customer
        showActiveCustomers();
        break;
      case 3:
        // 3. Create a payment option
        getPaymentOptions();
        break;
      case 4:
        // 4. Add product to shopping cart
        determineIfUnpaidOrder();
        break;
      case 5:
        // 5. Complete an order
        determineIfUnpaidOrderForCompletion();
        break;
      case 6:
        // 6. See product popularity
        console.log('6');
        break;
      case 7:
        // 7. Leave Bangazon!
        console.log('\nGoodbye!');
        process.exit();
        break;
      default:
        console.log(`\nEnter numbers only please!\n`);
        setTimeout(startMenu, 1000);
        break;
    };
  });

};

module.exports = { startMenu };
