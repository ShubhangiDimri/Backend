//Q- 4: Reading into a file asynchronously and writing code for handling error if file not found to read.

const fs = require('fs');
console.log('1. Before calling readFile');
fs.readFile('message.txt', 'utf8', (err, data) => {
  //// This callback runs LAST
  //without utf8(encoding), the data will look like this,
//Here is the file content:
//<Buffer 48 65 6c 6c 6f 20 66 72 6f 6d 20 61 20 66 69 6c 65 21>
//Node.js doesn't know what we want.It gives the raw, binary data from the file in an object called a Buffer. A Buffer is just a representation of raw data. Providing the 'utf8' encoding tells Node.js to interpret that raw data as human-readable text
  if (err) {
    console.error('an error occurred:', err); // [Error: ENOENT: no such file or directory, open 'message.txt']
    return; // Stop 
  }

  // If there was NO error,data holds the file's content.
  console.log('3:Here is the file content:');
  console.log(data);
});
//This line runs SECOND, without waiting for the file
console.log('2. After calling readFile');



//the code is asynchronous as it called readFile, continued on to the next task, and only executed the callback when the file was ready .( 2 prints before 3 )