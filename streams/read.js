'use strict';

const { createReadStream } = require('fs');
const readStream = createReadStream('names.txt');

readStream.on('open', () => {
  process.stdout.write('Read stream open.\n');
});

readStream.on('data', (buffer) => {
  process.stdout.write(buffer);
});

readStream.on('end', () => {
  console.log('Steam ended.');
});
