'use strict';

const { DB, errHandler } = require('../db.js');
const { checkForActiveCustomer } = require('./helper.js');
const prompt = require('prompt');


const checkForCurrentOrder = () => {
  let userId = process.env.CURRENT_USER_ID;
  let userName = process.env.CURRENT_USER;
  // Check to make sure there is an active user
  if (!checkForActiveCustomer(userId)) {
    return;
  };

  // List all orders for active customer
  console.log(`\nAll orders for ${userName}\n`);
  displayCustomersOrderList();
};


const displayCustomersOrderList = () => {
  let userId = process.env.CURRENT_USER_ID;
  // Get each customer order and display each
  DB.each(`select * from orders
    where customerId = ${userId}
  `, (err, { orderId, paymentStatus }) => {
    errHandler(err);

    // Display each order for the customer and its payment status
    console.log(`\nOrder Id # ${orderId} - ${(paymentStatus == 1)?'PAID':'UNPAID'}\n`);

  }, (err, result) => {
    // If there are no orders
    if (result === 0) {
      console.log('\nPlease add some products to your order first.\n');
      return setTimeout(require('./menuOptions.js').startMenu, 1500);
    };

    // Prompt user for order view selection
    promptForOrderSelection();
  });
};


const promptForOrderSelection = () => {
  let q = require('../promptSchema/simple.js');
  let counter = 0;

  // Prompt user for order selection
  prompt.get(q, (err, { $ }) => {
    // If 0 return to startMenu
    if ($ == 0) {
      return setTimeout(require('./menuOptions.js').startMenu, 1000)
    };

    console.log(`\nOrder ID # ${$}:\n`);

    // Get each line item associate with the order
    DB.each(`select li.orderId as orderId, p.name as name, p.price as price
      from orderLineItems li, products p
      where li.orderId = ${$}
      and li.productId = p.productId
    `, (err, { name, price }) => {
      // Display each order line item
      console.log(`${++counter}. ${name}  ${price}`);

    // Completion callback
    }, (err, result) => {
      // If there are no orders
      if (result === 0) {
        console.log('\nPlease add some products to your order first.\n');
        return setTimeout(require('./menuOptions.js').startMenu, 1500);
      };

      // Prompt user for next step
      console.log('');
      promptUserForNextDisplay();
    });
  });
};


const promptUserForNextDisplay = () => {
  let q = require('../promptSchema/currentOrder.js');

  // Prompt user for next choice
  prompt.get(q, (err, { $ }) => {
    // Return to main menu
    if ($ == 0) {
      setTimeout(require('./menuOptions.js').startMenu, 1000);
    } else if ($ == 1) {
      displayCustomersOrderList();
    } else {
      console.log('\nInvalid choice.');
      displayCustomersOrderList();
    }

  });

};


process.env.CURRENT_USER_ID = 2;
process.env.CURRENT_USER = 'Dominic Serrano';

checkForCurrentOrder();
