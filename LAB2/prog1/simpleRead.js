
//Q1	Write a program that uses a Readable stream to read data from a file (data.txt). Output the file content to the console. Ensure the file exists before reading, and handle any errors if the file is missing.

const fs = require('fs');

const fileName = 'data.txt';

console.log(`Checking file: ${fileName}`);


if (fs.existsSync(fileName)) { //this is the synchronous way to check the  existence of the file that return true or false

  console.log('File found.Creating a stream to read it');

//create stream
  const readStream = fs.createReadStream(fileName);

  //when a chunk of data is ready to read
  readStream.on('data', (chunk) => {
    console.log('Received a piece of data');
    console.log(chunk.toString());//raw data to text
  });

  //when the entire file has been read
  readStream.on('end', () => {
    console.log('Finished reading the file');
  });

  //errors while reading the file like permission denied
  readStream.on('error', (err) => {
    console.error(' An error occurred while reading the file:', err.message);
  });

} else {
  //handles missing file case
  //if fs.existsSync() returned false
  console.error(` Error: The file named '${fileName}' could not be found.`);
}