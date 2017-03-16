'use strict';

const { DB, errHandler } = require('../db.js');

process.env.CURRENT_USER_ID = 1;

const createOrder = () => {

  // Insert a new order with the current users id
  // and a payment value of false (not paid)
  DB.run(`insert into orders values (
    null, ${process.env.CURRENT_USER_ID},
    null, -1
  )`)

};

createOrder();
