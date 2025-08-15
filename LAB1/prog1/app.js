//Q- 1: Exporting an object from a module using exports Object. 

// Importing  object from details.js and storing it in a new constant
const student = require('./personal.js');

console.log(`Student Name: ${student.name}`);
console.log(`Course: ${student.course}`);
console.log(`Year: ${student.year}`);

