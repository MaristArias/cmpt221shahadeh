const fs = require('fs'); //fs module for being able to interact with files
fs.readFile ('sample.txt', 'utf8', (err , data) => {
if (err) {
console.error(err); //logs errors, such as missing file
return;
}
console.log(data); //says what is in sample.txt and prints line by line
}) ;


// i see the entire contents of sample.txt printed out