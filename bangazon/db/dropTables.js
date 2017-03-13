'use strict';

const { DB } = require('./db.js');
const errHandler = (err) => (err) ? console.log(err.toString()) : false;

DB.run(`drop table customers`, errHandler)
.run(`drop table payment_options`, errHandler)
.run(`drop table orders`, errHandler)
.run(`drop table products`, errHandler)
.run(`drop table order_line_items`, errHandler)
