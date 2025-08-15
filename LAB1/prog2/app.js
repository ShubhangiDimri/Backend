//Q-2: Exporting nested objects and function from Module using exports Object.

const myBox = require('./box.js');
//property from main object
console.log(`The box label is: ${myBox.label}`);

//property from nested object
console.log(`Its height is: ${myBox.dimensions.height}`);

//  function
myBox.describe();