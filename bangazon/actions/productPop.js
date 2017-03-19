'use strict';

const { DB, errHandler } = require('../db.js');
const Table = require('cli-table');
const prompt = require('prompt');

// Product           Orders     Customers  Revenue
// *******************************************************
// AA Batteries      100         20        $990.90
// Diapers           50          10        $640.95
// Case of Cracki... 40          30        $270.96
// *******************************************************
// Totals:           190         60        $1,902.81
// The product column must be 18 characters wide, and will display a maximum of 17 characters for the product name.
// The orders column must be 11 characters wide.
// The customers column must be 11 characters wide.
// The revenue column must be 15 characters wide.

const t = new Table({
    head: ['Products', 'Orders', 'Customers', 'Revenue']
  , colWidths: [18, 11, 11, 15]
});


// console.log(t.toString())

DB.each(`
  select p.productId, p.name,
  count(li.orderId) as orderTotal,
  count(distinct o.customerId) as customerTotal,
  sum(li.price) as revenue
  from products p
  left join orderLineItems li
  on p.productId = li.productId
  left join orders o
  on o.orderId = li.orderId
  group by p.productId
  order by orderTotal desc
`, (err, { productId, name, orderTotal, customerTotal, revenue }) => {
  errHandler(err);

  // Push each result to the pop table
  t.push(
    [name, orderTotal, customerTotal, `${(revenue)?`$${revenue}`:'$0.00'}`]
  );
// Completion callback
}, (err, result) => console.log(t.toString()));
