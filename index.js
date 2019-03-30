const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const Restaurant = require('./models/restaurants');

const server = http.createServer(async (req, res) => {
    console.log(req.url);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const allRestaurants = await Restaurant.getAll();
    const restaurantJSON = JSON.stringify(allRestaurants);

    res.end(restaurantJSON);
});

server.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
});