'use strict';

const { DB, errHandler } = require('../db.js');
const prompt = require('prompt');


const determineIfUnpaidOrderForCompletion = () => {
  let userId = process.env.CURRENT_USER_ID;
  // Check to make sure there is an active user
  if (userId == 0) {
    console.log('\nPlease create or choose an active customer.\n');
    return setTimeout(require('./menuOptions.js').startMenu, 1500);
  };

  // Query to find unpaid orders for current customer
  DB.all(`select * from orders
    where customerId = ${userId} and paymentStatus = -1
  `, (err, resultArray) => {
    errHandler(err);

    // Check if there is an unpaid order
    if (resultArray.length < 1) {
      console.log('\nPlease add some products to your order first.\n');
      return setTimeout(require('./menuOptions.js').startMenu, 1500);
    };

    // Set the unpaid order as CURRENT_ORDER_ID
    process.env.CURRENT_ORDER_ID = resultArray[0].orderId;

    // Check to see if unpaid order has any products yet
    determineIfOrderHasProducts();
  });
};


const determineIfOrderHasProducts = () => {
  let orderId = process.env.CURRENT_ORDER_ID;

  // Select all orderLineItems with CURRENT_ORDER_ID
  DB.all(`select * from orderLineItems
    where orderId = ${orderId}
  `, (err, resultArray) => {
    errHandler(err);

    // If there are products associated with orderId continue
    if (resultArray.length < 1) {
      console.log('\nPlease add some products to your order first.\n');
      return setTimeout(require('./menuOptions.js').startMenu, 1500);
    };

    // Prompt user to complete order
    completeOrder();
  });
};


const completeOrder = () => {
  let orderId = process.env.CURRENT_ORDER_ID;

  // Select the sum of all orderLineItems associated with order
  DB.get(`select li.orderId, sum(p.price) as price from
    orderLineItems li, products p
    where orderId = ${orderId}
    and li.productId = p.productId
  `, (err, { price }) => {

    console.log(`\nYour order total is $${price}. Ready to purchase?\n`);
    // Prompt user to complete order, y or n
    prompt.get({name: '$', description: 'Y/N'}, (err, { $ }) => {
      $ = $.toLowerCase();

      // Redirect to main menu on 'n'
      if ($ === 'n') {
        return setTimeout(require('./menuOptions.js').startMenu, 1000);
      };

      // Check to see if cusomter has entered paymentOptions
      determinePaymentOptions();

    });

  });

};


const determinePaymentOptions = () => {
  let userId = process.env.CURRENT_USER_ID;

  // Query DB to test if user has inserted Payment options
  DB.all(`select * from paymentOptions
    where customerId = ${userId}
  `, (err, resultArray) => {

    // If customer has no payment options
    if (resultArray.length < 1) {
      console.log('Please enter a payment option first to complete order.\n');
      return require('./paymentOption.js').getPaymentOptions();
    };

    // Display paymentOption for user
    displayPaymentOptionsForOrder();

  });
};


const displayPaymentOptionsForOrder = () => {
  let userId = process.env.CURRENT_USER_ID;

  // Select all paymentOptions for active user
  DB.each(`select * from paymentOptions
    where customerId = ${userId}
  `, (err, { paymentOptionId, name, accountNumber }) => {
    errHandler(err);
    // Display each paymentOption
    console.log(`${paymentOptionId} ${name} ${accountNumber}`);
    // Completion callback
  }, (err, result) => {
    errHandler(err);
    // Prompt user for paymentOption selection
    setPaymentOptionsForOrder();
  });
};


const setPaymentOptionsForOrder = () => {
  let orderId = process.env.CURRENT_ORDER_ID;

  // Prompt user for paymentOption selection
  prompt.get({ name: '$', description: 'Select payment option (numbers only)'}, (err, { $ }) => {

    // Update the active order with paymentOptionId and paid status
    DB.run(`update orders set
      paymentOptionId = ${$},
      paymentStatus = 1
      where orderId = ${orderId}
    `, errHandler);

    console.log('\nYour order is complete. Thanks for your payment.\n');
    setTimeout(require('./menuOptions.js').startMenu, 1500);
  });
};


module.exports = { determineIfUnpaidOrderForCompletion };
