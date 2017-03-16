'use strict';

const { DB, errHandler } = require('../db.js');
const { determineIfUnpaidOrder } = require('./createOrder');

process.env.CURRENT_USER_ID = 1;
process.env.CURRENT_ORDER_ID;

const getAllProducts = () => {

  console.log('\nSelect a poduct(s) to add to your order.\n');

  DB.all(`select * from products`, (err, result) => {
    errHandler(err);
    // Retrieve all products from DB
    result.forEach(({name, price}, i) => {
      console.log(`${++i} DOMAIN: ${name}, PRICE: ${price} `);
    });
  })
  .run(``, determineIfUnpaidOrder);

};

module.exports = { getAllProducts }

// getAllProducts();
