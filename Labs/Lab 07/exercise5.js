const fs = require('fs');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('fileRead', (fileContent) => {
  console.log("File content:", fileContent);
});

fs.readFile('file1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  eventEmitter.emit('fileRead', data);
});

//i see that the console printed File content: A for apple