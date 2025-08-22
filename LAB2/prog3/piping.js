//Piping feature in Node.js tconnects a Readable stream directly to a Writable stream

//Q3-	Write a program that demonstrates stream piping. Use a Readable stream to read data from a file (input.txt), and pipe it to a Writable stream that writes to another file (output.txt).
const fs = require('fs');

//const readStream = fs.createReadStream('input.txt');
const readStream = fs.createReadStream('data.txt');


const writeStream = fs.createWriteStream('output.txt');

//It automatically takes the data chunks  from readStream and sends them to writeStream
readStream.pipe(writeStream);
 

// This confirms that the data has been fully written to the destination file
writeStream.on('finish', () => {
  console.log('Piping complete. Data has been written to output.txt.');
});

// An error on either stream ( like input.txt not found) will be caught here
readStream.on('error', (err) => {
  console.error(' An error occurred in the readable stream:', err.message);
});
writeStream.on('error', (err) => {
  console.error(' An error occurred in the writable stream:', err.message);
});