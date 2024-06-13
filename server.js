const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint untuk mendapatkan semua data
app.get('/api/products', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data.json');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint untuk mendapatkan produk berdasarkan ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data.json');
            return;
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.id === productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
