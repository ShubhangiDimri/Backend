//Q- 1: Exporting an object from a module using exports Object. 

// Importing object from personal.js and storing it in a new constant
//import {studentDetails} from './personal.js'; //es6- import using named export
//import studentDetails from './personal.js' //import using default export
const student= require('./personal.js')

console.log(`Student Name: ${student.name}`);
console.log(`Course: ${student.course}`);
console.log(`Year: ${student.year}`);

