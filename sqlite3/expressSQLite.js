'use strict';

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demodb.sqlite');

// Display a index of possible routes
app.get('/', (req, res) => {
  res.json({
    indexOfRoutes: [
      '/department',
      '/employees',
      '/water',
      '/sewage',
      '/wildlife',
      '/parks',
      '/employees/:deptId'
    ]
  });
});

// Send all employees in one row
app.get('/employees', (req, res) => {
  db.all("SELECT * FROM employees", (err, row) => {
    if (err) {
      err.status = 500;
      res.json(err);
    }
    res.json(row);

    // Create html with db.each / stmt example
    // res.send('<p>Hello</p>')
  });
});

// Create a route that will list all employees departments,
// with no duplicate department names
app.get('/department', (req, res) => {
  // Distinct keyword will limit duplicates
  db.all("SELECT DISTINCT department FROM employees", (err, row) => {
    if (err) {
      err.status = 500;
      res.json(err);
    }

    res.json(row);
  });
});

// Water dept route
app.get('/water', (req, res) => {
  // Select all employees from water department
  db.all(`SELECT id, first, last FROM employees WHERE department LIKE "water"`, (err, row) => {
    if (err) {
      err.status = 500;
      res.json(err);
    };

    res.json(row);
  });
});

// Challenge 2: use route params to query depts
app.get('/employees/:deptId', ({params: { deptId }}, res) => {

  db.all(`SELECT * FROM employees WHERE department LIKE "${deptId}"`, (err, row) => {
    if (err) {
      err.status = 500;
      res.json(err);
    };
    res.json(row);
  });
});

//Add post to extra credit?
// app.post('/data', function(req, res){
//   db.run("UPDATE counts SET value = value + 1 WHERE key = ?", "counter", function(err, row){
//       if (err){
//           console.err(err);
//           res.status(500);
//       }
//       else {
//           res.status(202);
//       }
//       res.end();
//   });
// });

app.listen(3000, () => console.log('Listening on port 3000'));
