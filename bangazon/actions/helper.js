'use strict';

// If the user input is not a number, execute showActiveCustomers again
// if (isNaN($)) {
//   console.log('\nPlease enter an number.\n');
//   return setTimeout(showActiveCustomers, 1500);
// };


// Check if there is currently an active customer
const checkForActiveCustomer = (customerId) => {
  if (customerId == 0) {
    console.log(`\nPlease create or choose a customer.`);
    setTimeout(require('./menuOptions.js').startMenu, 1500);
    return false;
  };
  return true;
};


module.exports = { checkForActiveCustomer };
