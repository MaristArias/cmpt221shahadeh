const fs = require('fs');
fs.readFile('file1.txt', 'utf8', (err, data1) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data1);

  fs.readFile('file2.txt', 'utf8', (err, data2) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data2);

    fs.readFile('file3.txt', 'utf8', (err, data3) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data3);
    });
  });
});

/*
it printed like this, with minimal delay

A for apple
B for banana
C for coconut

*/