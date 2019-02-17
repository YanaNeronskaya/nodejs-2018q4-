const http = require('http');
const port = '8080';

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' },
    ],
};

http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(product));
    })
    .listen(port, () => console.log(`Listening port: ${port}`));
