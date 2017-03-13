'use strict';

const startMenu = () => {
  console.log(`
    *********************************************************
    **  Welcome to Bangazon! Command Line Ordering System  **
    *********************************************************
    1. Create a customer account
    2. Choose active customer
    3. Create a payment option
    4. Add product to shopping cart
    5. Complete an order
    6. See product popularity
    7. Leave Bangazon!
  `)
};

module.exports = { startMenu };
