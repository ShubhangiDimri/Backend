//Q-3: Writing to the server using request-response statements as a callback in createServer() function.
//http -modeule which is inbuilt in nodejs
//and package is need to be installed using npm(node package manager)

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' }); //The Content-Type header is an instruction for the browser. 'text/html' means treat this as a webpage and render the tags. 'text/plain' means treat this as a simple text file and show everything exactly as it is


  res.write('<h1>Hello from the server</h1>');
  res.write('<p>You made a request and I am responding</p>');


  res.end();// The browser received  words but is stuck on the line, waiting indefinitely because it thinks we might have more to say.This waiting is what the loading icon represents
  //basically it offically tells the browser that the communictn is complete
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});