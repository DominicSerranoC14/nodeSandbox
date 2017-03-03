'use strict';

const { createReadStream } = require('fs');
const readStream = createReadStream('names.txt');

readStream.on('open', () => {
  process.stdout.write('Read stream open.\n');
})

readStream.on('data', (buffer) => {
  readStream.pause();
  process.stdout.write(buffer);
});

const timer = () => setTimeout(readStream.resume(), 2000);

readStream.on('end', () => {
  clearInterval(timer);
});
