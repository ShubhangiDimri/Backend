//Q5-	Write a program that demonstrates error handling in streams. Create a Readable stream that tries to read from a non-existent file and handles the error by emitting an error event.

const fs = require('fs');


const nonExistentFile = 'shubhangi.txt';

console.log(`Attempting to create a stream from '${nonExistentFile}`);


const readStream = fs.createReadStream(nonExistentFile);

//without this event listener prog will crash
readStream.on('error', (err) => {
  console.error('An error occurred because the file could not be found.');
  console.error(`Error Details: ${err.message}`);
});


