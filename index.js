const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const Restaurant = require('./models/restaurants');
const User = require('./models/user');

const server = http.createServer(async (req, res) => {
    console.log(req);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    // if req.url is /restaurants, send them all restaurants.
    // if its /users, send a list of users
    // else, if it doesnt match either, send a welcome "message".

    if (req.url.startsWith("/restaurants")) {
        const parts = req.url.split('/');
        const method = req.method;
        if (method === 'GET') {
            if (parts.length === 2) {
                const allRestaurants = await Restaurant.getAll();
                const restaurantJSON = JSON.stringify(allRestaurants);
                res.end(restaurantJSON);
            } else if (parts.length === 3) {
                const restId = parts[2];
                const theRestaurant = await Restaurant.getById(restId);
                const restaruantJSON = JSON.stringify(theRestaurant);
                res.end(restaruantJSON);
            } else {
                res.statusCode = 404;
                res.end('resource not found');
            }
        } else if (method === "POST") {
            res.end(`{"message": "Oh you a creater huh?"}`);
        } else if (method === "PUT") {
            res.end(`{"message": "It sounds like you wanna update"}`)
        } else if (method === "DELETE") {
            res.end(`{"message": "DONT GO!!!"}`)
        }
    } else if (req.url.startsWith("/users")) {

        
        const parts = req.url.split("/");
        console.log(parts);
        
        const method = req.method;
        if (method === "GET") {
            if (parts.length === 2) {
                const allUsers = await User.getAll();
                const userJSON = JSON.stringify(allUsers);
                res.end(userJSON);
            } else if (parts.length === 3) {
                const userId = parts[2];
                const theUser = await User.getById(userId);
                const userJSON = JSON.stringify(theUser);
                res.end(userJSON);
            } else {
                res.statusCode = 404;
                res.end('Resource not found.')
            }
        } else if (method === "POST") {
            res.end(`{"message": "Oh you a creater huh?"}`);
        } else if (method === "PUT") {
            res.end(`{"message": "It sounds like you wanna update"}`)
        } else if (method === "DELETE") {
            res.end(`{"message": "DONT GO!!!"}`)
        }


    } else {
        res.end(`{
            "message": "Thank you for your patronage. Please send diapers."
        }`);
    }
});

server.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
});