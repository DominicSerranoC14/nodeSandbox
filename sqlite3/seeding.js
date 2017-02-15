'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/demodb02.sqlite');

let employees = [
  { first: 'Dan', last: 'Day', address: '119 Somewhere Lane', state: 'TN', salary: 55000, department: 'Water' },
  { first: 'Fred', last: 'Flinstone', address: '3000 Yabadaba Doo', state: 'TN', salary: 57000, department: 'Water' },
  { first: 'Eric', last: 'Foreman', address: '303 Overthere Rd', state: 'TN', salary: 75000, department: 'Sewage' },
  { first: 'Meg', last: 'Ryan', address: '2000 Here St', state: 'ME', salary: 50000, department: 'Wildlife' },
  { first: 'Kate', last: 'Williams', address: "2101 O'hare Ave", state: 'ME', salary: 50000, department: 'Wildlife' },
  { first: 'Trisha', last: 'Long', address: '148 Around Town Ct', state: 'TN', salary: 65000, department: 'Parks' }
];

db.serialize(function() {

  // Create a employees table
  // db.run(`CREATE TABLE employees
  //   (id INT, first TEXT, last TEXT, address TEXT, state TEXT, salary INT, department TEXT)
  // `);

  // Using javascript to built
  // const stmt = db.prepare("INSERT INTO employees VALUES (?,?,?)");
  // users.forEach((each, i) => {
  //
  //   stmt.run(i, each.first, each.last);
  //
  // });
  // stmt.finalize();

  // insert multiple values in one run statment
  // employees.forEach((each, i) => {
  //   db.run(`INSERT INTO employees VALUES
  //     (${i}, "${each.first}", "${each.last}",
  //     "${each.address}", "${each.state}", ${each.salary}, "${each.department}")
  //   `)
  // });

  // How to get each user row
  // db.each("SELECT * FROM user", function(err, row) {
  //   console.log(row.id, row.first, row.last);
  // });

  // Select all from user table
  // db.all("SELECT * FROM user", (err, row) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   };
  //   console.log(row);
  // })

  // How to drop tables
  // db.run("DROP TABLE user", (err, row) => {
  //   console.log(row);
  //   console.log(err);
  // })

});
