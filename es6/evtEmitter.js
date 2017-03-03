'use strict';

const { EventEmitter } = require('events');
const emitter = new EventEmitter();

// Create an evtHandler
let connectHandler = () => {
  console.log('Connected.');

  // Fire the data_received evt
  emitter.emit('data_received');
};

// On connection event fire connectHandler
emitter.on('connection', connectHandler);

// Bing an anon function with the data_received event
emitter.on('data_received', () => {
  console.log('Data received!');
});

// Emit a connection event
emitter.emit('connection');

// End the connection
console.log('Connection ended.');
