const express = require('express');
const app = express();
const port = 3000;

app.get('/add', (req, res) => {
    const { a, b } = req.query;
    const sum = parseInt(a) + parseInt(b);
    res.json({ result: sum });
});

app.get('/subtract', (req, res) => {
    const { a, b } = req.query;
    const difference = parseInt(a) - parseInt(b);
    res.json({ result: difference });
});

app.get('/multiply', (req, res) => {
    const { a, b } = req.query;
    const product = parseInt(a) * parseInt(b);
    res.json({ result: product });
});

app.get('/divide', (req, res) => {
    const { a, b } = req.query;
    if (parseInt(b) === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed' });
    }
    const quotient = parseInt(a) / parseInt(b);
    res.json({ result: quotient });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
