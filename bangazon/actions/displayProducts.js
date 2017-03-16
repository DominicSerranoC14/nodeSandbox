'use strict';

const { DB, errHandler } = require('../db.js');

const getAllProducts = () => {

  DB.all(`select * from products`, (err, result) => {
    errHandler(err);
    // Retrieve all products from DB
    result.forEach(({name, price}, i) => {
      console.log(`${++i} DOMAIN: ${name}, PRICE: ${price} `);
    });
  });

};


// getAllProducts();
