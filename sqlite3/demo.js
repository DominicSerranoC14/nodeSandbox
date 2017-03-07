// create repo on C17 org
// create repo on C17 org
// Introduce use strict?
// 'use strict';
// myGlobal = 7;


// npm init --yes
// npm install sqlite3 --save
// Hopefully this doesn't break for anyone
// npm install sqlite --build-from-source=sqlite3
// Sorry Robert and Wesley


// Verbose mode will produce more efficient errors, condenses stack trace
const sqlite3 = require('sqlite3').verbose();
// Show file in tree
const db = new sqlite3.Database('example.sqlite');


// Maybe?
// Introduce db.serialize vs db.parrallelize
// serialize is sequential


// sqlite3 gives us a few functions to use such as db.run, db.get, db.each, db.all


// Create table
// USE CAPS AT FIRST!!
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT)");


// Open db in sql browser
// Static adding
// What happens if we run this twice?
// db.run("INSERT INTO students VALUES (0, 'Ashley','Irwin')");


// lets drop the table
// Move to seperate module to practice modularization after done
const dropEmployeeTable = () => {
  db.run("DROP TABLE employees");
};


// Challenge 1: Drop current employees table and create an additional column in the employees table for each employees salary


// Import json file with require
// using the repl print out global.require.extensions
const populateEmployees = () => {
  const { list } = require('./employees.json');

  // Insert json file dynamically
  list.forEach(each => {
    db.run(`INSERT INTO employees VALUES
      (${each.id},
      "${each.firstName}", "${each.lastName}",
      "${each.salary}")
    `);
  });
};


// Create some queries
// Boo, only returns the first row
// db.get("SELECT * FROM employees", (err, row) => {
//   console.log(row);
// });


// Use db.all method
// db methods return db objects for chaining
// db.all is better for smaller amout of records to retrieve
db.all("SELECT first, last, salary FROM employees", (err, allRows) => {
  // Use for each here
  // allRows.forEach(each => {
  //   console.log(each);
  // });


  // Challenge 2: Javascript sorting fun - ES6 is awesome!!
  // 1 - sort all records alphabetically by first name
  // 2 - create a new array of all the employees that make more than 50000
  // 3 - using this new array, create an array that says each persons first and last name, as well as their salary
  const result = allRows.sort((a, b) => {
    return (a.first > b.first) ? 1 : -1;
  })
  .filter(each => each.salary > 50000)
  .map(each => `${each.first} ${each.last}s salary: ${each.salary}`);

});


// db.each will execute the callback for each row it is receiving
// db.each("SELECT first FROM employees", (err, allRows) => {
//     console.log(new Date().getMilliseconds(), allRows.first);
// });


// Introduce sqlite3 CLI


// Error handling. Start with connection, db.run accepts callback function, listen for err in the callback for db.all
// don't forget err.toString()


// Use npm table module?
