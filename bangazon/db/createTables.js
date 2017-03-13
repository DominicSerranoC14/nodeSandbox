'use strict';

const { DB } = require('../db.js');

const errHandler = (err) => (err) ? console.log(err.toString()) : false;

DB.run(`create table if not exists customers
  (customer_id INT PRIMARY KEY,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code INT,
  phone_number INT)
`, errHandler)
.run(`create table if not exists payment_options
  (payment_option_id INT PRIMARY KEY,
  name TEXT,
  account_number INT)
`, errHandler)
.run(`create table if not exists orders
  (order_id INT PRIMARY KEY,
  customer_id INT,
  payment_option_id INT,
  payment_status INT,
  FOREIGN KEY(customer_id) references customers(customer_id),
  FOREIGN KEY(payment_option_id) references payment_options(payment_option_id))
`, errHandler)
.run(`create table if not exists products
  (product_id INT PRIMARY KEY,
  name TEXT,
  price INT)
  `, errHandler)
.run(`create table if not exists order_line_items
  (order_line_items_id INT PRIMARY KEY,
  order_id INT,
  product_id INT,
  FOREIGN KEY(order_id) references orders(order_id),
  FOREIGN KEY(product_id) references products(product_id))
`, errHandler);
