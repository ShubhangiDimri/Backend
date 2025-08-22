//Q2Write a program that creates a Writable stream to write a string ("Hello, Node.js!") to a file (output.txt). If the file already exists, overwrite it. Print a success message once the data is written.

const fs = require('fs');

//destination file and what to write 
//const fileName = 'output.txt';
const fileName='data.txt';
const fileContent = 'Hello, Node.js';

// By default this will create the file if it doesn't exist
// or Overwrite it if it already does
const writeStream = fs.createWriteStream(fileName);

//  Writing the content to the stream
writeStream.write(fileContent, 'utf8');

// it tells the stream that we are done writing which allows it to close the file and fires the finish event
writeStream.end();

//when data is written completely
writeStream.on('finish', () => {
  console.log(`Successfully wrote content to ${fileName}`);
});

///handles issues like not having permission to write to a folder
writeStream.on('error', (err) => {
  console.error('An error occurred:', err.message);
});



//why .end and .finish
//.end tell the stream that no more data is coming. Without this command, the stream would stay open forever waiting for more data, and the finish event would never happen
//.finish  to know for certain when the writing process is complete