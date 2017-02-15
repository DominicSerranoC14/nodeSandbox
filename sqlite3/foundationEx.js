'use strict';

const employeeArray = [
  { id: 3, firstName: 'Dwight', lastName: 'Schrute' },
  { id: 4, firstName: 'Andy', lastName: 'Bernard' },
  { id: 5, firstName: 'Pam', lastName: 'Beesly' }
];

const errHandler = (err) => (err) ? console.log(`ERROR: ${err}`) : false;

const { Database } = require('sqlite3').verbose();
const db = new Database('./data/example.sqlite', (err) => {
  errHandler(err);
  console.log('Connected')
});


// Can pass in errHandler function to log sqlite3 errors
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT)", errHandler);

// Insert basic text to table
// db.run("INSERT into employees values (0, 'Dominic', 'Serrano')", errHandler);
// db.run("INSERT INTO employees values (1, 'Risha', 'Ittycheriah')", errHandler);

// Dynamically insert multiple records
// employeeArray.forEach((obj) => {
//
//   db.run(`INSERT INTO employees VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}')`);
//
// });


// Get all from table
// db.all("SELECT * FROM employees", (err, row) => {
//   errHandler(err);
//
//   row.forEach(each => console.log(each));
//
// });

// db.all("SELECT * FROM employees", (err, allRows) => {
//   allRows.forEach(each => {
//     console.log(each.id, each.first + ' ' + each.last);
//   });
// });



// Handle close of db
db.close((err) => {
  errHandler(err);
  console.log('Disconnected')
});
