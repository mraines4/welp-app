// first require 'pg-promise'
// call it immediately, which gives us a configured database connector
const pgp = require('pg-promise')();
const options = {
    host: 'localhost',
    database: 'restaurants-app'
};

const db = pgp(options);

db.any('select * from users where id =1;')
    .then(function(data) {
        // success;
    })
    .catch(function(error) {
        // error;
    });