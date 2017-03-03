'use stream';

const { Readable, Writable, Transform } = require('stream');

const read = Readable();
const write = Writable();
const transform = Transform();

let i = 0;

read._read = () => {
  if (i > 100) {
    // Will end stream if null is pushed to stream
    read.push(null);
  } else {
    console.log('r', i);
    read.push(`${i++}`);
  };
};


transform._transform = (buffer, _, cb) => {
  // cb must be executed when the chunk has been processed
  if (typeof buffer !== 'object') {
    cb(new Error('Error, number is 20'));
  };
  console.log('t', Number(buffer));
  cb(null, `${Number(buffer) * 2}`);
};


write._write = (buffer, _, cb) => {
  process.stdout.write(`w ${buffer}\n`);
  // setTimeout(cb, 100);
  cb();
};

read.pipe(transform).pipe(write);
