'use strict';

const { DB, errHandler } = require('../db.js');
const { getAllProducts } = require('./displayProducts');


const determineIfUnpaidOrder = () => {
  let userId = process.env.CURRENT_USER_ID;
  // Check to make sure there is an active user
  if (userId == 0) {
    console.log('\nPlease create or choose an active customer.\n');
    return setTimeout(require('./menuOptions.js').startMenu, 1500);
  };

  // Query to find unpaid orders for current customer
  DB.all(`select * from orders
    where customerId = ${userId}
    and paymentStatus = -1
  `, (err, resultArray) => {
    errHandler(err);

    // If there is an unpaid order, return that order obj
    if (resultArray.length > 0) {
      getAllProducts();
      return process.env.CURRENT_ORDER_ID = resultArray[0].orderId;
    };

    // If all orders are paid, create a new order for the customer
    createOrder();
    getAllProducts();
  });

};


// Creates a new order for the acitve customer
const createOrder = () => {
    let userId = process.env.CURRENT_USER_ID;

    // Insert a new order with the current users id
    // and a payment value of false (not paid)
    DB.run(`insert into orders values (
      null, ${process.env.CURRENT_USER_ID},
      null, -1
    )`, errHandler)
    // Query the order that was just inserted
    .get(`select * from orders
      where customerId = ${userId} and paymentStatus = -1
    `, (err, { orderId }) => {
      errHandler(err);
      // Set current order id
      process.env.CURRENT_ORDER_ID = orderId;
    });
};


module.exports = { determineIfUnpaidOrder };
