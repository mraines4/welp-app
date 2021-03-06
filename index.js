require('dotenv').config();

const express = require('express');
const app = express();
// const http = require('http');
const es6Renderer = require('express-es6-template-engine');
const querystring = require('querystring');

// lets express track users as they go page to page
const session = require('express-session');

// import the session storage module, and wire it up to the session module
const FileStore = require('session-file-store')(session);

// tell express to use the session modules
app.use(session({
    store: new FileStore(), //no options for now
    secret: process.env.SESSION_SECRET
}));

// const hostname = '127.0.0.1';
const port = process.env.PORT;

const helmet = require('helmet');
app.use(helmet());

const Restaurant = require('./models/restaurants');
const User = require('./models/user');
app.use(express.urlencoded({ extended: true }));

app.engine('html', es6Renderer); // hey app. meet es6Renderer, they speak html
app.set('views', 'views'); // tell express where to find the view files (the second argument is the name of the directory where my template files will live)
app.set('view engine', 'html'); // tell express to use as its view engine the thing that speaks html

app.get('/login', (req,res) => {
    // send them the form!
    // res.send('this is the login form');
    res.render('login-form', {
        locals: {
            email: '',
            message: ''
        }
    });
});

const escapeHtml = require('./utils');

// when they submit the form, process the form data
app.post('/login', async (req,res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    // res.send('woot woot');
    // todo: check password for real
    const theEmail = escapeHtml(req.body.email);
    const thePassword = escapeHtml(req.body.password);
    const theUser = await User.getByEmail(theEmail);
    if (theUser.checkPassword(thePassword)) {
        // save the users id to the session
        req.session.user = theUser.id;
        // make sure the session is saved before we redirect
        req.session.save(() => {
            res.redirect('/dashboard');
        })
    } else {
        // send the form back, but with the email already filled out
        res.render('login-form', {
            locals: {
                email: `${req.body.email}`,
                message: `${'incorrect password'}`
            }
        })
    }
});

app.get('/dashboard', (req,res) => {
    console.log(`the users id is: ${req.session.user}`);
    res.send('welcome to your welp dashboard');
})

app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.getAll();
    // const restaurantJSON = JSON.stringify(allRestaurants);
    // res.json will do 2 things
    // 1. it converts your javascript object or array to a json string
    // 2. it puts the correct content type header on the response
    res.json(allRestaurants);
});

app.get('/restaurants/:id', async (req, res) => {
    const theRestaurant = await Restaurant.getById(req.params.id);
    res.json(theRestaurant);
});

app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    res.json(allUsers);
});
app.get('/users/:id', async (req, res) => {
    const theUser = await User.getById(req.params.id);
    res.json(theUser);
});

app.post('/users', async (req,res) => {
    let body =  '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    
    req.on('end', async () => {
        const parsedBody = querystring.parse(body);
        console.log('========')
        console.log(parsedBody);
        console.log('^^^^^^^^^^^^^^')
        const newUserId = await User.add(parsedBody);
        res.json({id: `${newUserId}`});
    })
});

app.put('/users', async (req, res) => {
    res.json('sounds like you wanna update');
});

app.delete('/users/:id/delete', async(req, res) => {
    const {id} = req.params
    await User.delete(id);
    res.json({message: `Deleted user with id ${id}`});
});

// app.all('*', (req, res) => {
//     res.json({message: "Thank you for your patronage. Please send diapers."});
// });

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});