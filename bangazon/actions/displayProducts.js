'use strict';

const { DB, errHandler } = require('../db.js');
const prompt = require('prompt');


const getAllProducts = () => {
  let userId = process.env.CURRENT_USER_ID;
  // Check to see if there is a current user
  console.log("userId", typeof userId);
  if (userId == 0) {
    console.log('\nPlease create or choose an active customer.\n');
    return setTimeout(require('./menuOptions.js').startMenu, 1500);
  };

  // Select all products from database to display
  DB.all(`select * from products`, (err, result) => {
    errHandler(err);
    // Retrieve all products from DB
    console.log('\nSelect a poduct(s) to add to your order.\n');

    result.forEach(({name, price}, i) => {
      console.log(`${++i} DOMAIN: ${name}, PRICE: $${price} `);
    });
    console.log('');
    console.log('0 Back to main menu\n');
    addProductToOrder();
  })
  // Utilizing DB object to run functions async
  // .run(``, addProductToOrder)
};


const addProductToOrder = () => {
  let orderId = process.env.CURRENT_ORDER_ID;

  // Prompt user for product selection
  prompt.get('$', (err, { $ }) => {

    // Back to main menu option
    if (parseInt($) === 0) {
      return require('./menuOptions.js').startMenu();
    };

    DB.get(`select * from products where productId = ${$}`,
      (err, { productId, price }) => {
      errHandler(err);
      // Insert product to orderLineItems table with orderId
      DB.run(`insert into orderLineItems values (
        null, ${orderId}, ${productId}, ${price}
      )`, errHandler)
      .run(``, getAllProducts);

    });

  });

};

module.exports = { getAllProducts };
