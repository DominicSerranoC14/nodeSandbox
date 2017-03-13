'use strict';

const { Database } = require('sqlite3').verbose();

const DB = new Database('bangazon.sqlite');

module.exports = { DB };
