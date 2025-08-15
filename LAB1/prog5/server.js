//Q-5: Reading a text file on the server using http and fs module.

const http = require('http'); // The server tool
const fs = require('fs');     // The file system tool

// Creating the http server
const server = http.createServer((req, res) => {
  //inside req, we are trying to read file 
  fs.readFile('data.txt', 'utf8', (err, data) => {

    if (err) {
      console.error('Could not find or read the file', err);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
      return; // Stop
    }

    // Send a 200 OK status back to the browser when file is there
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Send the file's content ('data') as the response and end it
    res.end(data);
  });
});

//  Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}`);
});

