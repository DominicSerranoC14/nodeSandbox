'use strict';

const { DB, errHandler } = require('../db.js');
const prompt = require('prompt');

process.env.CURRENT_USER_ID = 1;
process.env.CURRENT_ORDER_ID = 1;

const determineIfUnpaidOrder = () => {
  let userId = process.env.CURRENT_USER_ID;
  // Check to make sure there is an active user
  if (!userId) {
    console.log('\nPlease create or choose an active customer.\n');
    return setTimeout(require('./menuOptions.js').startMenu, 1500);
  };

  // Query to find unpaid orders for current customer
  DB.all(`select * from orders o
    where o.customerId = ${userId} and o.paymentStatus = -1
  `, (err, resultArray) => {
    errHandler(err);

    // Check if there is an unpaid order
    if (resultArray.length < 0) {
      console.log('\nPlease add some products to your order first.\n');
      return setTimeout(require('./menuOptions.js').startMenu, 1500);
    };

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

    console.log("Let's complete it!");

  });

};





determineIfUnpaidOrder();
