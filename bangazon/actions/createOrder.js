'use strict';

const { DB, errHandler } = require('../db.js');

let userId = process.env.CURRENT_USER_ID;


const determineIfUnpaidOrder = () => {
  // Check to make sure there is an active user
  if (!userId) {
    return console.log('\nPlease create or choose an active customer.\n');
  };

  // Query to find unpaid orders for current customer
  DB.get(`select * from orders o
    where
    o.customerId = ${userId}
    and
    o.paymentStatus = -1
  `, (err, resultObj) => {
    errHandler(err);

    // If there is an unpaid order, return that order obj
    if (resultObj) {
      return resultObj;
    };

    // If all orders are paid, create a new order for the customer
    createOrder();
  });

};


// Creates a new order for the acitve customer
const createOrder = () => {
    // Insert a new order with the current users id
    // and a payment value of false (not paid)
    DB.run(`insert into orders values (
      null, ${process.env.CURRENT_USER_ID},
      null, -1
    )`);
};


module.exports = determineIfUnpaidOrder;
