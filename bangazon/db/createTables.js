'use strict';

const { Database } = require('sqlite3').verbose();
const DB = new Database('bangazon.sqlite');

// Customers -> Orders
// Orders -> Order Line Items
// Order Line Items -> Products
//
// Need join table here?
// Orders -> Payment Options
//
// Orders table will need to be a join
// column1 datatype,
// column2 datatype,
// column3 datatype,
// .....
// columnN datatype,
// PRIMARY KEY( one or more columns )

DB.run(`create table if not exists customers
  (customer_id INT PRIMARY KEY,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code INT,
  phone_number INT)
`)
.run(`create table if not exists orders
  (order_id INT PRIMARY KEY,
  customer_id INT,
  payment_opt_id INT,
  payment_status INT,
  FOREIGN KEY(customer_id) references customers(customer_id))
`)
