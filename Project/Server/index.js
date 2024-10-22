const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('Client/public'));  // This serves files from the Client/public folder

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: './Client/views'});
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './Client/views' });
});

app.get('/home', (req, res) => {
    res.sendFile('home.html', { root: './Client/views' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
