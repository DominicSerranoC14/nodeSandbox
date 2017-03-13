'use strict';

const readline = require('readline');
const { createCustomer } = require('./createCustomer.js');

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
  `);

  const RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'BANGAZON > '
  });

  RL.prompt();

  RL.on('line', (line) => {
    switch(parseInt(line)) {
      case 1:
        // 1. Create a customer account
        RL.close();
        createCustomer();
        break;
      case 2:
        // 2. Choose active customer
        console.log('2');
        break;
      case 3:
        // 3. Create a payment option
        console.log('3');
        break;
      case 4:
        // 4. Add product to shopping cart
        console.log('4');
        break;
      case 5:
        // 5. Complete an order
        console.log('5');
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
        console.log(`Say what? I might have heard '${line.trim()}'`);
        break;
    }

    // Create new prompt after each
    // RL.prompt();

  });

};

module.exports = { startMenu };
