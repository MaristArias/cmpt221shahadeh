const http = require('http'); //imports http so that it can be an http server

//actually making the server
const server = http.createServer((req, res) => {
  setTimeout(() => {
    res.statusCode = 200; //set the status code to 200 (OK)
    res.setHeader('Content-Type', 'text/plain'); //set the content type
    res.end('Hi! I am working!\n'); //send and end responmse
  }, 2000);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


// i see a webpage with the "hi i am working" text printed