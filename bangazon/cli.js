'use strict';

const readline = require('readline');
const { startMenu } = require('./menuOptions.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'BANGAZON > '
});


// Display menu and call prompt
startMenu();
rl.prompt();


rl.on('line', (line) => {
  switch(parseInt(line)) {
    case 1:
      console.log('1');
      break;
    case 2:
      console.log('2');
      break;
    case 3:
      console.log('3');
      break;
    case 4:
      console.log('4');
      break;
    case 5:
      console.log('5');
      break;
    case 6:
      console.log('6');
      break;
    case 7:
      console.log('\nGoodbye!');
      process.exit();
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }

  // Create new prompt after each
  rl.prompt();

});
