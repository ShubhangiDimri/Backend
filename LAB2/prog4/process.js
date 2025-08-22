//Q4-	Write a program that uses process.stdin to read user input from the command line. Ask the user for their name and greet them by printing "Hello, [name]!" to the console.


process.stdout.write('What is your name?\n');
 
// .once() tells Node.js to listen for the data event only one time
process.stdin.once('data', (chunk) => {
  //The input chunk is raw data (a Buffer) 
  // .trim() to remove the newline character that is added when the user presses Enter
  const name = chunk.toString().trim();

  
  console.log(`hellooo, ${name}!`);

  process.exit();
});